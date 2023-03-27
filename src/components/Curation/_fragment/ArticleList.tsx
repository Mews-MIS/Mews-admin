import { Dispatch, SetStateAction, useEffect, useState } from "react";
import CurationAPI from "../../../api/CurationAPI";
import usePostByPageNumber from "../../../hook/useNewAricle";
import Paging from "../../../components/Pagination";
import * as s from "./styles";

const CurationArticleList = ({
  checkedArticleList,
  setCheckedArticleList,
}: {
  checkedArticleList: number[];
  setCheckedArticleList: Dispatch<SetStateAction<number[]>>;
}) => {
  // 모든 기사들 불러오기
  const [article, setArticle] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalItemsCount, setTotalItemsCount] = useState<number>(0);
  const { data, isLoading } = usePostByPageNumber(pageNumber);
  const itemsCountPerPage = 10;

  useEffect(() => {
    CurationAPI.getPageArticles(1, {}).then((data: any) => {
      setArticle(data.articles);
      setTotalItemsCount(Math.ceil(data.pageCount * itemsCountPerPage));
    });
  }, []);

  if (isLoading) {
    return <h1>로딩중</h1>;
  }

  const setPage = (e: number) => {
    setPageNumber(e);
  };

  const handleCheckboxChange = (event: any) => {
    const target = event.target;
    const value = Number(target.value);

    if (target.checked) {
      // Add the checked article's title to the state array
      setCheckedArticleList((prevState: any) => [...prevState, value]);
    } else {
      // Remove the unchecked article's title from the state array
      setCheckedArticleList((prevState: any) => prevState.filter((id: number) => id !== value));
    }
  };

  return (
    <div className="flex w-full h-4/5 justify-center mt-2">
      <div className="w-full">
        <p className="font-bold">글 목록</p>
        <div className="h-4/5 overflow-auto border border-gray-500">
          <div className="flex-col flex-nowrap w-full">
            <div className="flex-col flex-nowrap w-full">
              {data?.articles &&
                data.articles.map((element: any, index: number) => {
                  const articleInfo = element.article;
                  return (
                    <div
                      key={index}
                      className="font-bold border border-gray-300 w-full h-12 flex items-center"
                    >
                      <input
                        type="checkbox"
                        value={articleInfo.id}
                        checked={checkedArticleList.includes(articleInfo.id)}
                        onChange={handleCheckboxChange}
                        className="w-8 h-8 mr-2 ml-2 text-orange-500 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      {articleInfo.title}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div>
          <Paging page={pageNumber} count={totalItemsCount} setPage={setPage} />
        </div>
      </div>
    </div>
  );
};

export default CurationArticleList;
