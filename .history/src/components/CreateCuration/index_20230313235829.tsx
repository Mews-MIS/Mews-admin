import { useState, useRef } from "react";
import CurationAPI from "../../api/CurationAPI";

interface Curation {
  list: [];
  title: string;
}

const CreateCuration = () => {
  const curationTitleInputRef = useRef<HTMLInputElement | null>(null);

  const resetData = () => {
    if (curationTitleInputRef.current != null) {
      curationTitleInputRef.current.value = "";
    }
  };

  // 빈칸 확인용
  const dataValidCheck = (data: Curation) => {
    if (data.list === null) {
      alert("큐레이션에 해당하는 기사를 체크해주세요");
      return false;
    }
    if (data.title === "") {
      alert("큐레이션을 입력해주세요.");
      return false;
    }

    return true;
  };

  //create api
  const createCuration = async () => {
    if (curationTitleInputRef.current == null) return;

    const newCuration: Curation = {
      title: curationTitleInputRef.current.value,
    };

    if (!dataValidCheck(newCuration)) return;
    const newCurationString = JSON.stringify(newCuration);
    const formData = new FormData();

    formData.append("data", new Blob([newCurationString], { type: "application/json" }));

    await CurationAPI.postCreateCuration(formData).then((res) => {
      if (res) {
        alert("큐레이션이 성공적으로 생성되었습니다.");
        resetData();
      } else alert("큐레이션 생성을 실패하였습니다.");
    });
  };

  return (
    <div className="w-full h-screen text-gray-900">
      <div className="w-full pl-8 pt-8">
        <p className="text-md font-bold">큐레이션 제목</p>
        <input
          type="text"
          ref={curationTitleInputRef}
          placeholder="큐레이션 제목을 입력해주세요"
          className="w-1/2 p-4 text-md border-gray-500 focus:outline-none focus:ring-indigo-500"
        />

        <div className="flex justify-center mt-2">
          <div className="w-1/2">
            <p className="font-bold">선택된 글</p>
            <div className="h-96">글들..</div>
          </div>

          <div className="w-1/2">
            <p className="font-bold">전체 글</p>
            <div>글들..</div>
          </div>
        </div>

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
            onClick={createCuration}
          >
            생성
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCuration;
