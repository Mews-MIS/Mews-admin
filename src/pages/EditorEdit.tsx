import RegisterEditor from "../components/RegisterEditor";
import UpdateEditor from "../components/UpdateEditor";
import { useState } from "react";

const EditorEdit = () => {
  const [currentPage, setCurrentPage] = useState("register");

  return (
    <>
      <div className={"w-full h-screen text-gray-900"}>
        <div className={"w-full h-full"}>
          <div className={"flex flex-col h-full"}>
            <div className="w-[90%] h-[10%] justify-start border-b border-orange-400 mx-auto pt-[10px] box-border">
              <div className="flex justify-items-start text-lg ml-[10px] mb-[8px] ">
                <span
                  className={`px-[5px] cursor-pointer ${
                    currentPage === "register"
                      ? "text-orange-400 font-[600]"
                      : ""
                  }`}
                  onClick={() => setCurrentPage("register")}
                >
                  등록
                </span>
                <span
                  className={`px-[5px] cursor-pointer ${
                    currentPage === "update" ? "text-orange-400 font-[600]" : ""
                  }`}
                  onClick={() => setCurrentPage("update")}
                >
                  수정
                </span>
              </div>
            </div>
            {currentPage == "register" && <RegisterEditor />}
            {currentPage == "update" && <UpdateEditor />}
          </div>
        </div>
      </div>
    </>

    //   <div className={"w-full h-screen text-gray-900"}>
    //     <div className={"w-full h-full"}>
    //       <div className={"flex flex-row"}>
    //         <div>

    //         </div>
    //         <div className={"w-1/2 h-screen px-16 mx-auto"}>
    //           <div className={"mt-[40px] h-1/6 text-center"}>
    //             <div className="w-[100px] h-[100px] rounded-full overflow-hidden bg-gray-300 border-solid border-2 border-gray-400 mx-auto mb-[10px]">
    //               <img src={imageURL?.toString()} />
    //             </div>
    //             <label
    //               htmlFor="file"
    //               className="text-blue-600 text-sm hover:cursor-pointer"
    //             >
    //               프로필 사진 수정
    //             </label>
    //             <input
    //               type="file"
    //               id="file"
    //               accept="image/*"
    //               onChange={handleChangedFile}
    //               ref={fileInputRef}
    //               className="hidden"
    //             ></input>
    //           </div>
    //           <div className="w-full h-1/6 mt-12 mb-0">
    //             <label
    //               htmlFor="name"
    //               className="text-md leading-loose text-gray-600"
    //             >
    //               필진 이름
    //             </label>
    //             <br />
    //             <input
    //               type="text"
    //               id="editorName"
    //               name="editorName"
    //               placeholder="이름을 입력하세요"
    //               ref={editorNameInputRef}
    //               className="w-full h-[40px] text-md px-4 py-2 border-2 border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 md:text-md"
    //             ></input>
    //           </div>
    //           <div className="w-full h-2/6">
    //             <label
    //               htmlFor="name"
    //               className="text-md leading-loose text-gray-600"
    //             >
    //               필진 소개
    //             </label>
    //             <br />
    //             <textarea
    //               id="editorIntro"
    //               name="editorIntro"
    //               placeholder="소개를 입력하세요"
    //               ref={editorIntroTextareaRef}
    //               className="w-full h-[200px] text-md px-4 py-2 border-2 border-gray-500 rounded-md shadow-sm resize-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 md:text-md"
    //             ></textarea>
    //           </div>
    //           <div className="w-full flex mt-12 justify-end">
    //             <div className="flex flex-row w-2/3 h-1/6 lg:h-[40px]">
    //               <button
    //                 className="flex-1 w-1/3 bg-gray-300 text-sm font-medium rounded-lg text-white hover:bg-gray-400 mr-8 md:text-base lg:text-base"
    //                 onClick={resetData}
    //               >
    //                 취소
    //               </button>
    //               <button
    //                 className="w-1/3 flex-1 text-sm font-medium rounded-lg text-white hover:bg-[#FFBD29] bg-[#FF9136] md:text-base lg:text-base"
    //                 onClick={registerEditor}
    //               >
    //                 등록
    //               </button>
    //             </div>
    //           </div>
    //         </div>
    //         {/* 목록 */}
    //         {/* <div className={"flex flex-col w-1/2 h-screen px-16"}>
    //           <div className={"block w-full h-4/6 mt-[40px]"}>
    //             <p className="text-md leading-loose text-gray-600">필진 목록</p>
    //             <div className="flex overflow-scroll border-solid border-gray-500 border-2 w-full h-[450px]">
    //               <div className="flex-col flex-nowrap w-full">
    //                 {editors.map((editor, index) => (
    //                   <div className="flex flex-row  border-solid border-[1px] w-full h-[40px] ">
    //                     <div className="flex flex-row my-auto">
    //                       <button
    //                         className="w-[20px] h-[20px] rounded-full text-center my-auto mx-3 text-sm bg-gray-500 text-white hover:bg-gray-600"
    //                         onClick={() => onDeleteEditor(index)}
    //                       >
    //                         X
    //                       </button>
    //                       <div className="my-auto text-lg">{editor.name}</div>
    //                     </div>
    //                   </div>
    //                 ))}
    //               </div>
    //             </div>
    //           </div>
    //           <div className="w-full flex mt-24 justify-end">
    //             <div className="flex flex-row w-2/3 h-1/6 lg:h-[40px]">
    //               <button
    //                 className="flex-1 w-1/3 bg-gray-300 text-sm rounded-lg text-white hover:bg-gray-400 mr-8 md:text-base lg:text-base"
    //                 onClick={resetList}
    //               >
    //                 취소
    //               </button>
    //               <button
    //                 className="w-1/3 flex-1 text-sm font-medium rounded-lg text-white hover:bg-[#FFBD29] bg-[#FF9136] md:text-base lg:text-base"
    //                 onClick={submitList}
    //               >
    //                 완료
    //               </button>
    //             </div>
    //           </div>
    //         </div> */}
    //       </div>
    //     </div>
    //   </div>
  );
};

export default EditorEdit;
