import { useEffect, useState } from "react";
import CurationAPI from "../../api/CurationAPI";
import DeleteScheduleItem from "../../assets/Icon/DeleteScheduleItem.svg";
import * as s from "./styles";
import CurationArticleList from "../Curation/_fragment/ArticleList";
import { CurationPostProps } from "../CreateCuration";

export interface CurationData {
  id: number;
  title: string;
}

export interface CurationAllProps {
  allCuration: CurationData[];
  checked: CurationData[];
}

const UpdateCuration = () => {
  const [curations, setCurations] = useState<CurationAllProps | undefined>();
  const [curation, setCuration] = useState<CurationPostProps>();
  const [checkedArticles, setCheckedArticles] = useState<number[]>([]);
  const [title, setTitle] = useState("");
  // const [isDeleted, setIsDeleted] = useState<boolean>(false);

  useEffect(() => {
    CurationAPI.getAllCuration(curations).then((data) => {
      setCurations(data);
    });
  }, []);

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setTitle(e.target.value);
  };

  const showCuration = async (id: number) => {
    try {
      const res = await CurationAPI.getCurationId(id);
      setCuration(res);
      console.log("ssssssssss", res);
      setTitle(res.title);

      const articleIds: number[] | ((prevState: number[]) => number[]) = [];
      res.list.forEach((obj) => {
        const article = obj.article;
        if (article) {
          articleIds.push(article.id);
        }
      });
      setCheckedArticles(articleIds);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteCuration = async (id: number) => {
    try {
      await CurationAPI.deleteCurationId(id);
      setCurations((prevState: any) => {
        return {
          ...prevState,
          allCuration: prevState.allCuration.filter((curation) => curation.id !== id),
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen text-gray-900">
      <div className="w-full h-full pl-8 pt-8 flex">
        <div className="w-1/2">
          <p className="text-md font-bold">생성된 큐레이션</p>
          <div className="flex flex-col justify-center mt-2">
            {curations?.allCuration &&
              curations.allCuration.length > 0 &&
              curations.allCuration.map((data, index) => (
                <div
                  key={data.id}
                  className="flex flex-row items-center border-solid border-[1px] w-5/6 h-[45px] cursor-pointer"
                  onClick={() => data.id != null && showCuration(data.id)}
                >
                  <s.DeleteBtn
                    src={DeleteScheduleItem}
                    alt="삭제버튼"
                    onClick={() => deleteCuration(data.id)}
                  />
                  <div className="text-lg ml-2 font-bold">{data.title}</div>
                </div>
              ))}
          </div>
        </div>
        <div className="w-1/2">
          <p className="text-md font-bold">큐레이션 제목</p>
          <div className=" w-5/6 flex flex-col justify-center mt-2">
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              placeholder="큐레이션 제목을 입력해주세요"
              className="p-4 w-full text-md border-gray-500 focus:outline-none focus:ring-indigo-500"
              onChange={handleTitle}
            />
            <div className="flex h-4/5 mt-2 w-full">
              <CurationArticleList
                setCheckedArticleList={setCheckedArticles}
                checkedArticleList={checkedArticles}
              />
            </div>
            <div className="flex lg:h-[40px] justify-end">
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
                // onClick={changeCuration}
              >
                수정
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCuration;
