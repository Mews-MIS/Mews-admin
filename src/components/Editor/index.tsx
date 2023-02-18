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
    <Editor
      ref={editorRef}
      initialValue={content || " "}
      height={"100%"}
      previewStyle="vertical"
      initialEditType="wysiwyg"
      useCommandShortcut={false}
      hideModeSwitch={true}
      toolbarItems={toolbarItems}
      language={"ko-KR"}
      hooks={{
        addImageBlobHook: async (blob, callback) => {
          console.log(blob);

          const imgUrls = await ArticleAPI.postImageFile(blob);
          console.log(imgUrls);
        },
      }}
    />
  );
};

export default ContentEditor;
