import { useState, useRef } from "react";
import CuraitonAPI from "../../api/CurationAPI";

interface Curation {
  list: [];
  title: string;
}

const CreateCuration = () => {
  const curationTitleInputRef = useRef<HTMLInputElement | null>(null);

  //create api
  const createCuraion = async () => {
    if (curationTitleInputRef.current == null ||)
    return;

    const newCuration: Curation = {
        title : curationTitleInputRef.current.value,
    };
  }
};
