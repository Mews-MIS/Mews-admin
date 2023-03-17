import { useQuery } from "react-query";
import EditorAPI from "../api/EditorAPI";

const useEditorList = () => {
  const { data } = useQuery("editors", async () => {
    const editorList = await EditorAPI.getEditorAll();
    return editorList;
  });

  return { data };
};

export default useEditorList;
