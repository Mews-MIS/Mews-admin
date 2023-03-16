import { useState } from "react";

const CurationEdit = () => {
  const [curationPage, setCurationPage] = useState("create");
  return (
    <>
      <div className="w-full h-screen text-gray-900">
        <div className="w-full h-full">
          <div className="flex flex-col h-full">
            <div className="w-[90%] h-[50px] justify-start border-b border-orange-400 mx-auto pt-[10px] box-border">
              <div className="flex justify-items-start text-lg ml-[10px] mb-[8px] ">
                <span
                  className={`px-[5px] cursor-pointer ${
                    curationPage === "create" ? "text-orange-400 font-[600]" : ""
                  }`}
                  onClick={() => setCurationPage("create")}
                >
                  생성
                </span>
                {/* <span
                  className={`px-[5px] cursor-pointer ${
                    currentPage === "update" ? "text-orange-400 font-[600]" : ""
                  }`}
                  onClick={() => setCurrentPage("update")}
                >
                  수정
                </span> */}
              </div>
            </div>
            {currentPage == "register" && <RegisterEditor />}
            {/* {currentPage == "update" && <UpdateEditor />} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default CurationEdit;
