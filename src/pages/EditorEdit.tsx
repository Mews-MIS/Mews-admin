import { useState, useRef } from "react";
import {
  arrayMove,
  SortableContainer,
  SortableElement,
  SortableElementProps,
} from "react-sortable-hoc";
import { render } from "react-dom";
import { Component } from "react";

interface Editor {
  name: string;
  introduction: string;
  imgUrl: string;
  id?: number;
}

const EditorEdit = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const editorNameInputRef = useRef<HTMLInputElement | null>(null);
  const editorIntroTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [imageURL, setImageURL] = useState<
    string | ArrayBuffer | undefined | null
  >();
  const [editors, setEditors] = useState<Array<Editor>>([]);

  const handleChangedFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (e.target.files) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onloadend = () => {
      const resultImage = reader.result;
      setImageURL(resultImage);
    };
  };

  const resetData = () => {
    if (
      fileInputRef.current != null &&
      editorIntroTextareaRef.current != null &&
      editorNameInputRef.current != null
    ) {
      fileInputRef.current.value = "";
      editorNameInputRef.current.value = "";
      editorIntroTextareaRef.current.value = "";
      setImageURL("");
    }
  };

  const resetList = () => {
    if (editors.length > 0) {
      if (confirm("정말 필진 목록을 초기화하시겠습니까?")) {
        setEditors([]);
      }
    } else {
      alert("필진 목록에 필진이 없습니다.");
    }
  };

  //
  const registerEditor = () => {
    if (
      fileInputRef.current == null ||
      editorIntroTextareaRef.current == null ||
      editorNameInputRef.current == null
    )
      return;

    const newEditor: Editor = {
      name: editorNameInputRef.current.value,
      introduction: editorIntroTextareaRef.current.value,
      imgUrl: typeof imageURL !== "string" ? "" : imageURL,

      id: editors.length,
    };

    //유효성검사
    if (!dataValidCheck(newEditor)) return;

    setEditors([...editors, newEditor]);
    resetData();
  };

  const dataValidCheck = (data: Editor) => {
    if (data.name === "") {
      alert("이름을 입력해주세요.");
      return false;
    }
    if (data.introduction === "") {
      alert("소개를 입력해주세요.");
      return false;
    }
    //이미지 필수값 아니면 필요없음
    // if (data.imgUrl === "") {
    //   alert("이미지를 선택해주세요");
    //   return false;
    // }
    return true;
  };

  //delete api
  const onDeleteEditor = (i: number) => {
    alert("정말 해당 필진을 삭제하시겠습니까?");
    console.log(i);
  };

  //register api
  const submitList = () => {
    if (editors.length > 0) {
      if (confirm("해당 필진 목록을 등록하시겠습니까?")) {
      }
    } else {
      alert("필진 목록에 필진이 없습니다.");
    }
  };

  //drag&drop
  const SortableItem: React.ComponentClass<
    SortableElementProps & { name: string; order: number }
  > = SortableElement(({ name, order }: { name: string; order: number }) => (
    <div className="flex flex-row  border-solid border-[1px] w-full h-[40px] ">
      <div className="flex flex-row my-auto">
        <button
          className="w-[20px] h-[20px] rounded-full text-center my-auto mx-3 text-sm bg-gray-500 text-white hover:bg-gray-600"
          onClick={() => onDeleteEditor(order)}
        >
          X
        </button>
        <div className="my-auto text-lg">{name}</div>
      </div>
    </div>
  ));
  const SortableList = SortableContainer(() => {
    return (
      <div className="flex-col flex-nowrap w-full">
        {editors.map((editor, index) => (
          <SortableItem
            key={editor.name}
            index={index}
            name={editor.name}
            order={index}
          />
        ))}
      </div>
    );
  });
  class SortableComponent extends Component {
    onSortEnd = ({
      oldIndex,
      newIndex,
    }: {
      oldIndex: number;
      newIndex: number;
    }) => {
      setEditors(arrayMove(editors, oldIndex, newIndex));
    };
    render() {
      return <SortableList onSortEnd={this.onSortEnd} />;
    }
  }

  return (
    <div className={"w-full h-screen text-gray-900"}>
      <div className={"w-full h-full"}>
        <div className={"flex flex-row"}>
          <div className={"w-1/2 h-screen px-16"}>
            <div className={"mt-[40px] h-1/6 text-center"}>
              <div className="w-[100px] h-[100px] rounded-full overflow-hidden bg-gray-300 border-solid border-2 border-gray-400 mx-auto mb-[10px]">
                <img src={imageURL?.toString()} />
              </div>
              <label
                htmlFor="file"
                className="text-blue-600 text-sm hover:cursor-pointer"
              >
                프로필 사진 수정
              </label>
              <input
                type="file"
                id="file"
                accept="image/*"
                onChange={handleChangedFile}
                ref={fileInputRef}
                className="hidden"
              ></input>
            </div>
            <div className="w-full h-1/6 mt-12 mb-0">
              <label
                htmlFor="name"
                className="text-md leading-loose text-gray-600"
              >
                필진 이름
              </label>
              <br />
              <input
                type="text"
                id="editorName"
                name="editorName"
                placeholder="이름을 입력하세요"
                ref={editorNameInputRef}
                className="w-full h-[40px] text-md px-4 py-2 border-2 border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 md:text-md"
              ></input>
            </div>
            <div className="w-full h-2/6">
              <label
                htmlFor="name"
                className="text-md leading-loose text-gray-600"
              >
                필진 소개
              </label>
              <br />
              <textarea
                id="editorIntro"
                name="editorIntro"
                placeholder="소개를 입력하세요"
                ref={editorIntroTextareaRef}
                className="w-full h-[200px] text-md px-4 py-2 border-2 border-gray-500 rounded-md shadow-sm resize-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 md:text-md"
              ></textarea>
            </div>
            <div className="w-full flex mt-12 justify-end">
              <div className="flex flex-row w-2/3 h-1/6 lg:h-[40px]">
                <button
                  className="flex-1 w-1/3 bg-gray-300 text-sm font-medium rounded-lg text-white hover:bg-gray-400 mr-8 md:text-base lg:text-base"
                  onClick={resetData}
                >
                  취소
                </button>
                <button
                  className="w-1/3 flex-1 text-sm font-medium rounded-lg text-white hover:bg-[#FFBD29] bg-[#FF9136] md:text-base lg:text-base"
                  onClick={registerEditor}
                >
                  등록
                </button>
              </div>
            </div>
          </div>
          {/* 목록 */}
          <div className={"flex flex-col w-1/2 h-screen px-16"}>
            <div className={"block w-full h-4/6 mt-[40px]"}>
              <p className="text-md leading-loose text-gray-600">필진 목록</p>
              <div className="flex overflow-scroll border-solid border-gray-500 border-2 w-full h-[450px]">
                <SortableComponent />
              </div>
            </div>
            <div className="w-full flex mt-24 justify-end">
              <div className="flex flex-row w-2/3 h-1/6 lg:h-[40px]">
                <button
                  className="flex-1 w-1/3 bg-gray-300 text-sm rounded-lg text-white hover:bg-gray-400 mr-8 md:text-base lg:text-base"
                  onClick={resetList}
                >
                  취소
                </button>
                <button
                  className="w-1/3 flex-1 text-sm font-medium rounded-lg text-white hover:bg-[#FFBD29] bg-[#FF9136] md:text-base lg:text-base"
                  onClick={submitList}
                >
                  완료
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorEdit;
