import {useState} from "react";
import useEditorList from "../../../hook/useEditorList";

const EditorList = () => {
    const editorList = useEditorList();
    const [checkedEditor, setCheckedEditor] = useState([]);

    console.log(editorList)

    return (
        <>
            <h1>에디터 리스트</h1>
        </>
    )


}

export default EditorList;