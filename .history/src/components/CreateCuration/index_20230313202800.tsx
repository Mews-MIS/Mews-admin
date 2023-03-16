import { useState, useRef } from "react";
import CuraitonAPI from "../../api/CurationAPI";

interface Curation {
  list: [];
  title: string;
}

const CreateCuration = () => {
  const curationTitleInputRef = useRef<HTMLInputElement | null>(null);

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
  };
};
