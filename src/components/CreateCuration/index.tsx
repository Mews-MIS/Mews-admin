import { useState } from "react";
import CurationAPI from "../../api/CurationAPI";
import * as s from "./styles";
import CurationArticleList from "../Curation/_fragment/ArticleList";

export interface CurationPostProps {
  id?: number;
  list: number[];
  title: string;
}

const CreateCuration = () => {
  const [checkedArticles, setCheckedArticles] = useState<number[]>([]);
  const [title, setTitle] = useState("");

  const addCuration = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newCuration: CurationPostProps = { list: checkedArticles, title: title };
    console.log({ newCuration });
    CurationAPI.postCuration(newCuration);
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setTitle(e.target.value);
  };

  return (
    <div className="w-full h-screen text-gray-900">
      <div className="w-full h-full pl-8 pt-8 flex justify-center flex-col">
        <p className="text-md font-bold">큐레이션 제목</p>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          placeholder="큐레이션 제목을 입력해주세요"
          className="w-1/2 p-4 text-md border-gray-500 focus:outline-none focus:ring-indigo-500"
          onChange={handleTitle}
        />

        <div className="flex h-4/5 justify-center mt-2">
          <div className="w-1/2">
            <div className="">
              <CurationArticleList
                setCheckedArticleList={setCheckedArticles}
                checkedArticleList={checkedArticles}
              />
            </div>
          </div>

          <div className="w-1/2"></div>
        </div>

        <div className="flex lg:h-[40px] justify-end w-2/5">
          <button
            className="bg-gray-300 p-6 flex items-center text-sm font-medium rounded-lg text-white hover:bg-gray-400 mr-6 md:text-base lg:text-base"
            onClick={() => {
              if (confirm("정말 입력한 정보를 초기화하시겠습니까?")) {
                // resetData();
              }
            }}
          >
            취소
          </button>
          <button
            className="text-sm font-medium flex items-center p-6 rounded-lg text-white hover:bg-[#FFBD29] bg-[#FF9136] md:text-base lg:text-base"
            type="submit"
            onClick={addCuration}
          >
            생성
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCuration;
