import ArticlePageLayout from "./ArticlePageLayout";
import { useEffect, useState } from "react";
import ArticleAPI from "../../api/ArticleAPI";
import { Article } from "../../type/Article";
import ArticleRow from "../../components/ArticleRow";
import { useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";

const ArticleEditList = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState<number>(1);
  const [totalItemsCount, setTotalItemsCount] = useState<number>(0);
  const itemsCountPerPage = 10;

  useEffect(() => {
    const getArticles = async () => {
      const response = await ArticleAPI.getPageArticles({ page });
      await setArticles(response!.articles);
      setTotalItemsCount(Math.ceil(response.totalItems / itemsCountPerPage));
    };

    getArticles();
  }, [page]);

  const onclickPageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <ArticlePageLayout>
      <div className={"border-b-2 h-full mt-3"}>
        <div className={"mb-3 border-2"}>
          <p>게시글 목록</p>
        </div>
        {articles.map((article: Article) => {
          return <ArticleRow key={article.id} id={article.id} title={article.title} />;
        })}
      </div>

      <Pagination
        activePage={page}
        itemsCountPerPage={10}
        totalItemsCount={articles.length}
        pageRangeDisplayed={5}
        onChange={onclickPageChange}
      />
    </ArticlePageLayout>
  );
};

export default ArticleEditList;
