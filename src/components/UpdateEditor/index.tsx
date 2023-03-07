import { useState, useRef, useEffect } from "react";
import EditorAPI from "../../api/EditorAPI";

interface Editor {
  name: string;
  introduction?: string;
  id: number;
  file: string;
}
const UpdateEditor = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const editorNameInputRef = useRef<HTMLInputElement | null>(null);
  const editorIntroTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [imageURL, setImageURL] = useState<
    string | ArrayBuffer | undefined | null
  >();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editors, setEditors] = useState<Editor[] | null>([]);
  const [isDeleted, setIsDeleted] = useState<Boolean>(false);
  const [editor, setEditor] = useState<Editor | null>();

  useEffect(() => {
    EditorAPI.getEditorAll().then((data) => {
      setEditors(data);
    });
  }, [isDeleted]);

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
    }
  };

  const resetData = () => {
    if (confirm("정말 입력값을 초기화하겠습니까?")) {
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
    }
  };

  //update api
  const updateEditor = () => {};

  const showEditor = async (id: number) => {
    await EditorAPI.getEditor(id).then((res) => {
      console.log(res.imgUrl);
    });
  };

  return (
    <div className={"w-full h-[90%] text-gray-900"}>
      <div className={"w-full h-full"}>
        <div className={"flex flex-row h-full"}>
          <div className={"flex flex-col w-1/2 h-full px-16"}>
            <div className={"w-full h-4/6 mt-[20px]"}>
              <p className="text-md leading-loose text-gray-600">필진 목록</p>
              <div className="flex overflow-scroll border-solid border-gray-500 border-2 w-full h-[450px]">
                <div className="flex-col flex-nowrap w-full">
                  {editors
                    ? editors.map((data, index) => (
                        <div
                          className="flex flex-row  border-solid border-[1px] w-full h-[40px] cursor-pointer"
                          onClick={() => showEditor(data.id)}
                        >
                          <div className="flex flex-row my-auto">
                            <button
                              className="w-[20px] h-[20px] rounded-full text-center my-auto mx-3 text-sm bg-gray-500 text-white hover:bg-gray-600"
                              onClick={() => deleteEditor(data.id)}
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
                  <img
                    src={imageURL?.toString()}
                    onClick={() => {
                      console.log(imageURL?.toString());
                    }}
                  />
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
              <div className="w-full h-[15%] mt-8 mb-0">
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
              <div className="w-full h-[45%]">
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
                  className="w-full h-[80%] text-md px-4 py-2 border-2 border-gray-500 rounded-md shadow-sm resize-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 md:text-md"
                ></textarea>
              </div>
              <div className="w-full flex mt-2 justify-end">
                <div className="flex flex-row w-2/3 h-1/6 lg:h-[40px]">
                  <button
                    className="flex-1 w-1/3 bg-gray-300 text-sm font-medium rounded-lg text-white hover:bg-gray-400 mr-8 md:text-base lg:text-base"
                    onClick={resetData}
                  >
                    취소
                  </button>
                  <button
                    className="w-1/3 flex-1 text-sm font-medium rounded-lg text-white hover:bg-[#FFBD29] bg-[#FF9136] md:text-base lg:text-base"
                    onClick={updateEditor}
                  >
                    등록
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
