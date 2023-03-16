import { useState, useRef } from "react";
import CuraitonAPI from "../../api/CurationAPI";

interface Curation {
  list: [];
  title: string;
}

const CreateCuration = () => {
  const curationTitleInoputRef = useRef<HTMLInputElement | null>(null);

  const createCuraion = async () => {
    if (curationTitleInoputRef.current == null ||)
    return;

    const newCuration: Curation = {
        title : curationTitleInoputRef.current.value,
    };
  }
};
