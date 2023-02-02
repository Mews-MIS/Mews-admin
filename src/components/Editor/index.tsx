import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

const Editor = () => {
  return (
    <Editor
      height={"500px"}
      previewStyle="vertical"
      initialEditType="wysiwyg"
      useCommandShortcut={false}
      hideModeSwitch={true}
      language={"ko-KR"}
      theme={"dark"}
    />
  );
};

export default Editor;
