import { Dispatch, SetStateAction, useState } from "react";
import useEditorList from "../../../hook/useEditorList";

const EditorList = ({
  checkedEditorList,
  setCheckedEditorList,
}: {
  checkedEditorList: number[];
  setCheckedEditorList: Dispatch<SetStateAction<number[]>>;
}) => {
  const data = useEditorList();
  const editorList = data.data;

  const handleCheckboxChange = (event: any) => {
    const target = event.target;
    const value = Number(target.value);

    if (target.checked) {
      // Add the checked person's id to the state array
      setCheckedEditorList((prevState: any) => [...prevState, value]);
    } else {
      // Remove the unchecked person's id from the state array
      setCheckedEditorList((prevState: any) => prevState.filter((id: number) => id !== value));
    }
  };

  return (
    <div className="my-4">
      <label htmlFor="name" className="text-sm leading-7 text-gray-600">
        에디터 목록
      </label>
      <div className="border-2 h-[150px] overflow-scroll">
        {editorList?.map((editor: any) => {
          return (
            <div key={editor.id} className="h-full h-8 items-center border-b-2">
              <label>
                <input
                  type="checkbox"
                  value={editor.id}
                  checked={checkedEditorList.includes(editor.id)}
                  onChange={handleCheckboxChange}
                />
                <label className="ml-3">{editor.name}</label>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EditorList;
