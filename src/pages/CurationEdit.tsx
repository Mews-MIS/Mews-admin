import { useState } from "react";
import CheckedCuration from "../components/CheckedCuration";
import CreateCuration from "../components/CreateCuration";
import UpdateCuration from "../components/UpdateCuration";

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
                <span
                  className={`px-[5px] cursor-pointer ${
                    curationPage === "update" ? "text-orange-400 font-[600]" : ""
                  }`}
                  onClick={() => setCurationPage("update")}
                >
                  수정
                </span>
                <span
                  className={`px-[5px] cursor-pointer ${
                    curationPage === "check" ? "text-orange-400 font-[600]" : ""
                  }`}
                  onClick={() => setCurationPage("check")}
                >
                  배치
                </span>
              </div>
            </div>
            {curationPage == "create" && <CreateCuration />}
            {curationPage == "update" && <UpdateCuration />}
            {curationPage == "check" && <CheckedCuration />}
          </div>
        </div>
      </div>
    </>
  );
};

export default CurationEdit;
