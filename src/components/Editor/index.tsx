import { Editor } from "@toast-ui/react-editor";
import ArticleAPI from "../../api/ArticleAPI";

interface Props {
  content?: string;
  editorRef: React.MutableRefObject<any>;
}
const ContentEditor = ({ content = "", editorRef }: Props) => {
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
            const formData = new FormData();
            formData.append("file", blob);
            try {
              const response = await ArticleAPI.postImageFile(formData);
              // @ts-ignore
              callback(response);
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
