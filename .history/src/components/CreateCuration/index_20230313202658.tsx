import { useState, useRef } from "react";
import CuraitonAPI from "../../api/CurationAPI";

interface Curation {
  list: [];
  title: string;
}

const CreateCuration = () => {
  const curationTitleInputRef = useRef<HTMLInputElement | null>(null);

  const dataValidCheck = (data: Curation) => {
    if (data.list === "") {
      alert("이름을 입력해주세요.");
      return false;
    }
    if (data.introduction === "") {
      alert("소개를 입력해주세요.");
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
