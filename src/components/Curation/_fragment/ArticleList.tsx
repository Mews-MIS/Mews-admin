import { Dispatch, SetStateAction, useEffect, useState } from "react";
import CurationAPI from "../../../api/CurationAPI";
import Pagination from "react-js-pagination";
import * as s from "./styles";

export interface AllArticle {
  id: number;
  title: string;
  pageCount: number;
}

const CurationArticleList = ({
  checkedArticleList,
  setCheckedArticleList,
}: {
  checkedArticleList: number[];
  setCheckedArticleList: Dispatch<SetStateAction<number[]>>;
}) => {
  // 모든 기사들 불러오기
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState<number>(1);
  const [totalItemsCount, setTotalItemsCount] = useState<number>(0);
  const itemsCountPerPage = 10;

  useEffect(() => {
    const getArticles = async () => {
      const response = await CurationAPI.getCuraitonAll({ page });
      await setArticles(response!.articles);
      setTotalItemsCount(Math.ceil(response!.pageCount * itemsCountPerPage));
    };

    getArticles();
  }, [page]);

  const onclickPageChange = (pageNumber: number) => {
    setPage(pageNumber);
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
    <div className="flex h-4/5 justify-center mt-2">
      <div className="w-full">
        <p className="font-bold">전체 글</p>
        <div className="h-4/5 w-4/5 overflow-auto border border-gray-500">
          <div className="flex-col flex-nowrap w-full">
            <div className="flex-col flex-nowrap w-full">
              {articles &&
                articles.map((data: AllArticle) => {
                  return (
                    <div
                      key={data.id}
                      className="font-bold border border-gray-300 w-full h-12 flex items-center"
                    >
                      <input
                        type="checkbox"
                        value={data.id}
                        checked={checkedArticleList.includes(data.id)}
                        onChange={handleCheckboxChange}
                        className="w-8 h-8 mr-2 ml-2 text-orange-500 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      {data.title}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div>
          <s.PaginationBox>
            <Pagination
              activePage={page}
              itemsCountPerPage={itemsCountPerPage}
              totalItemsCount={totalItemsCount}
              pageRangeDisplayed={5}
              onChange={onclickPageChange}
            />
          </s.PaginationBox>
        </div>
      </div>
    </div>
  );
};

export default CurationArticleList;
