import { Editor } from "@toast-ui/react-editor";

const ArticleEdit = () => {
  return (
    <div className={"w-full h-screen text-gray-900"}>
      <div className={"w-full"}>
        <h1>게시글 관리 페이지</h1>
        <div className={"mt-20"}>
          <Editor
            height={"600px"}
            previewStyle="vertical"
            initialEditType="wysiwyg"
            useCommandShortcut={false}
            hideModeSwitch={true}
            language={"ko-KR"}
          ></Editor>
        </div>
      </div>
    </div>
  );
};

export default ArticleEdit;
