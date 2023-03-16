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
    <div className="w-full h-[90%] text-gray-900">
      <div className="w-[90%] h-full">
        <input placeholder="큐레이션 제목을 입력해주세요" className="p-16" />
      </div>
    </div>
  );
};

export default CreateCuration;
