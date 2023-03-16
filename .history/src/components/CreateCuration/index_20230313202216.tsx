import { useState, useRef } from "react";
import EditorAPI from "../../api/EditorAPI";
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
