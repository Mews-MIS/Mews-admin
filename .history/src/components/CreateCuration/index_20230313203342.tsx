import { useState, useRef } from "react";
import CurationAPI from "../../api/CurationAPI";
import CuraitonAPI from "../../api/CurationAPI";

interface Curation {
  list: [];
  title: string;
}

const CreateCuration = () => {
  const curationTitleInputRef = useRef<HTMLInputElement | null>(null);

  //빈칸 확인용
  const dataValidCheck = (data: Curation) => {
    if (data.list === null) {
      alert("큐레이션에 해당하는 기사를 체크해주세요");
      return false;
    }
    if (data.title === "") {
      alert("큐레이션을 입력해주세요.");
      return false;
    }

  //create api
  const createCuraion = async () => {
    if (curationTitleInputRef.current == null) return;

    const newCuration: Curation = {
      title: curationTitleInputRef.current.value,
    };

    if(!dataValidCheck(newCuration)) return;
    const newCurationString = JSON.stringify(newCuration);
    const formData = new FormData();

    formData.append(
        "data",
        new Blob([newCurationString], {type:"application/json"})
    );

    await CurationAPI.postCreateCuration(formData).then((res) => {
        if(res) {
            alert("큐레이션이 성공적으로 생성되었습니다.");
            
        }
        else alert("큐레이션 생성을 실패하였습니다.")
    });


  };
  return()
};


