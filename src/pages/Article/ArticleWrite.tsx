import ContentEditor from "../../components/Editor";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import ArticlePageLayout from "./ArticlePageLayout";
import ArticleAPI from "../../api/ArticleAPI";
import EditorList from "./_fragment/EditorList";

const ArticleWrite = () => {
  const editRef = useRef<any>(null);
  const [checkedEditors, setCheckedEditors] = useState<number[]>([]);
  const [imageFiles, setImageFiles] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <ArticlePageLayout>
      <div className="w-full h-screen text-gray-900">
        <div className="w-full h-full">
          <form
            className="w-full h-full"
            onSubmit={handleSubmit(async (data) => {
              try {
                const editor = editRef?.current?.getInstance();
                const contentMark = editor.getMarkdown();

                console.log(contentMark);

                if (contentMark?.length === 0) {
                  throw new Error("내용을 입력해주세요.");
                }

                const formData = new FormData();
                const form = {
                  title: data.title as string,
                  content: contentMark,
                  type: data.type,
                  fileUrls: imageFiles,
                  editors: checkedEditors,
                };

                formData.append(
                  "data",
                  new Blob([JSON.stringify(form)], { type: "application/json" })
                );
                console.log(JSON.stringify(form));
                const response = await ArticleAPI.postArticle(formData);
              } catch (e) {
                console.log(e);
              }
            })}
          >
            <div className="mx-2 my-4 p-2 md:mx-8 lg:mx-8">
              <div className="relative">
                <label htmlFor="name" className="text-sm leading-7 text-gray-600">
                  제목
                </label>
                <input
                  {...register("title", { required: "제목을 입력해주세요." })}
                  type="text"
                  id="title"
                  name="title"
                  placeholder="제목을 입력해주세요"
                  className="w-full rounded border border-gray-300 bg-gray-100 bg-opacity-50 py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out placeholder:text-sm focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div className="mt-5">
                <label htmlFor="type" className="text-sm leading-7 text-gray-600">
                  카테고리
                </label>
                <input
                  {...register("type", {
                    required: "카테고리를 입력해주세요.",
                  })}
                  type="text"
                  id="type"
                  name="type"
                  placeholder="카테코리를 입력해주세요."
                  className="w-full rounded border border-gray-300 bg-gray-100 bg-opacity-50 py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out placeholder:text-sm focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div>
                <EditorList
                  setCheckedEditorList={setCheckedEditors}
                  checkedEditorList={checkedEditors}
                />
              </div>
            </div>
            <div className="h-3/6 mx-2 p-2 md:mx-8 lg:mx-8">
              <ContentEditor
                editorRef={editRef}
                imageFiles={imageFiles}
                setImageFiles={setImageFiles}
              />
            </div>
            <div className="mt-10 flex h-12 w-full lg:h-14">
              <button className="flex-1 w-full bg-gray-500 text-sm font-medium text-white hover:bg-gray-700 md:text-base lg:text-base">
                뒤로가기
              </button>
              <button
                className="w-full flex-1 text-sm font-medium text-white hover:bg-[#FFBD29] bg-[#FF9136] md:text-base lg:text-base"
                type="submit"
              >
                작성하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </ArticlePageLayout>
  );
};

export default ArticleWrite;
