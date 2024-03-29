import { useState, useRef, useEffect } from "react";
import EditorAPI from "../../api/EditorAPI";

interface Editor {
  name: string;
  introduction: string;
  id?: number;
  file?: string;
}

const UpdateEditor = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const editorNameInputRef = useRef<HTMLInputElement | null>(null);
  const editorIntroTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [imageURL, setImageURL] = useState<string | ArrayBuffer | undefined | null>();
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [editors, setEditors] = useState<Editor[] | null>([]);
  const [isDeleted, setIsDeleted] = useState<Boolean>(false);
  const [editor, setEditor] = useState<Editor | null>(null);

  useEffect(() => {
    EditorAPI.getEditorAll().then((data) => {
      setEditors(data);
    });
  }, [isDeleted, editor]);

  const handleChangedFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (e.target.files) {
      reader.readAsDataURL(e.target.files[0]);
      setImageFile(e.target.files[0]);
    }
    reader.onloadend = () => {
      const resultImage = reader.result;
      setImageURL(resultImage);
    };
  };

  //delete api
  const deleteEditor = async (id: number) => {
    if (confirm("정말 해당 필진을 삭제하시겠습니까?")) {
      console.log(id);
      await EditorAPI.deleteEditor(id);
      setIsDeleted(!isDeleted);
      resetData();
    }
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

  //update api
  const updateEditor = async () => {
    if (
      fileInputRef.current == null ||
      editorIntroTextareaRef.current == null ||
      editorNameInputRef.current == null
    )
      return;
    editor ? console.log(editor.id) : console.log("");
    const newEditor: Editor = {
      id: editor?.id,
      name: editorNameInputRef.current.value,
      introduction: editorIntroTextareaRef.current.value,
    };

    if (!dataValidCheck(newEditor)) return;

    if (confirm("해당 필진을 수정하시겠습니까?")) {
      const newEditorString = JSON.stringify(newEditor);

      const formData = new FormData();
      imageFile !== null && formData.append("file", imageFile);
      formData.append("data", new Blob([newEditorString], { type: "application/json" }));
      await EditorAPI.updateEditor(formData).then((res) => {
        if (res) {
          alert("필진이 성공적으로 수정되었습니다.");
        } else alert("필진 수정을 실패했습니다.");
      });
      setEditor(newEditor);
      await EditorAPI.getEditorAll().then((data) => {
        setEditors(data);
      });
    }
  };

  const showEditor = async (id: number) => {
    await EditorAPI.getEditor(id).then((res) => {
      setEditor(res);
      if (
        fileInputRef.current == null ||
        editorIntroTextareaRef.current == null ||
        editorNameInputRef.current == null
      )
        return;
      setImageURL(res.imgUrl);
      editorNameInputRef.current.value = res.name;
      editorIntroTextareaRef.current.value = res.introduction;
    });
  };

  return (
    <div className={"w-full h-[90%] text-gray-900"}>
      <div className={"w-full h-full"}>
        <div className={"flex flex-row h-full"}>
          <div className={"flex flex-col w-1/2 h-full px-16"}>
            <div className={"w-full h-4/6 mt-[20px]"}>
              <p className="text-md leading-loose text-gray-600">필진 목록</p>
              <div className="flex overflow-scroll border-solid border-gray-500 border-2 w-full h-[550px]">
                <div className="flex-col flex-nowrap w-full">
                  {editors
                    ? editors.map((data, index) => (
                        <div
                          key={index}
                          className="flex flex-row  border-solid border-[1px] w-full h-[40px] cursor-pointer"
                          onClick={() => data.id != null && showEditor(data.id)}
                        >
                          <div className="flex flex-row my-auto">
                            <button
                              className="w-[20px] h-[20px] rounded-full text-center my-auto mx-3 text-sm bg-gray-500 text-white hover:bg-gray-600"
                              onClick={() => data.id != null && deleteEditor(data.id)}
                            >
                              X
                            </button>
                            <div className="my-auto text-lg">{data.name}</div>
                          </div>
                        </div>
                      ))
                    : ""}
                </div>
              </div>
            </div>
            <div className="w-full flex mt-24 justify-end">
              <div className="flex flex-row w-2/3 h-1/6 lg:h-[40px]">
                {/* <button className="flex-1 w-1/3 bg-gray-300 text-sm rounded-lg text-white hover:bg-gray-400 mr-8 md:text-base lg:text-base">
                  취소
                </button> */}
                {/* <button
                  className="w-1/3 flex-1 text-sm font-medium rounded-lg text-white hover:bg-[#FFBD29] bg-[#FF9136] md:text-base lg:text-base"
                  // onClick={submitList}
                >
                  완료
                </button> */}
              </div>
            </div>
          </div>
          {/* 수정 */}
          <div className={"flex flex-col w-1/2 h-full"}>
            <div className={"h-full px-16"}>
              <div className={"mt-[20px] h-[20%] text-center"}>
                <div className="w-[90px] h-[90px] rounded-full overflow-hidden bg-gray-300 border-solid border-2 border-gray-400 mx-auto mb-[10px] ">
                  <img className="w-full h-full" src={imageURL?.toString()} />
                </div>
                <label htmlFor="file" className="text-blue-600 text-sm hover:cursor-pointer">
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
              <div className="w-full h-[15%] mt-8 mb-0">
                <label htmlFor="name" className="text-md leading-loose text-gray-600">
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
              <div className="w-full h-[45%]">
                <label htmlFor="name" className="text-md leading-loose text-gray-600">
                  필진 소개
                </label>
                <br />
                <textarea
                  id="editorIntro"
                  name="editorIntro"
                  placeholder="소개를 입력하세요"
                  ref={editorIntroTextareaRef}
                  className="w-full h-[80%] text-md px-4 py-2 border-2 border-gray-500 rounded-md shadow-sm resize-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 md:text-md"
                ></textarea>
              </div>
              <div className="w-full flex mt-2 justify-end">
                <div className="flex flex-row w-2/3 h-1/6 lg:h-[40px]">
                  <button
                    className="flex-1 w-1/3 bg-gray-300 text-sm font-medium rounded-lg text-white hover:bg-gray-400 mr-8 md:text-base lg:text-base"
                    onClick={() => {
                      if (confirm("정말 입력한 정보를 초기화하시겠습니까?")) {
                        resetData();
                      }
                    }}
                  >
                    취소
                  </button>
                  <button
                    className="w-1/3 flex-1 text-sm font-medium rounded-lg text-white hover:bg-[#FFBD29] bg-[#FF9136] md:text-base lg:text-base"
                    onClick={updateEditor}
                  >
                    수정
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateEditor;
