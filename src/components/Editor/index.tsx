import { Editor } from "@toast-ui/react-editor";
import ArticleAPI from "../../api/ArticleAPI";
import { useForm, useFormContext } from "react-hook-form";

interface Props {
  content?: string;
  editorRef: React.MutableRefObject<any>;
  imageFiles: string[];
  setImageFiles: any;
}

const imgUrlToTag = (imgUrl: string) => {
  return `<img src="${imgUrl}" alt="이미지">`;
};
const ContentEditor = ({ content = "", editorRef, imageFiles, setImageFiles }: Props) => {
  const toolbarItems = [
    ["heading", "bold", "italic", "strike"],
    ["hr"],
    ["ul", "ol", "task"],
    ["table", "link"],
    ["image"],
    ["code"],
    ["scrollSync"],
  ];

  return (
    <>
      <label htmlFor="name" className="text-sm leading-7 text-gray-600">
        글쓰기
      </label>
      <Editor
        ref={editorRef}
        initialValue={content || " "}
        height="100%"
        previewStyle="vertical"
        initialEditType="wysiwyg"
        useCommandShortcut={false}
        hideModeSwitch={true}
        toolbarItems={toolbarItems}
        language="ko-KR"
        hooks={{
          addImageBlobHook: async (blob, callback) => {
            const imgFormData = new FormData();
            imgFormData.append("file", blob);
            try {
              const response = await ArticleAPI.postImageFile(imgFormData);
              const imgUrl = response[0].replace(/"/g, "");
              console.log(imgUrl);
              setImageFiles(...imageFiles, response);
              callback(imgUrl);
            } catch (error) {
              console.error(error);
            }
          },
        }}
      />
    </>
  );
};

export default ContentEditor;
