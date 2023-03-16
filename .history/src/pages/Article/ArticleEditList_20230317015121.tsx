import ArticlePageLayout from "./ArticlePageLayout";
import { useEffect, useState } from "react";
import ArticleAPI from "../../api/ArticleAPI";
import { Article } from "../../type/Article";
import ArticleRow from "../../components/ArticleRow";
import { useNavigate } from "react-router-dom";

const ArticleEditList = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const getArticles = async () => {
      const response = await ArticleAPI.getPageArticles({ page });
      await setArticles(response!.articles);
    };
    getArticles();
  }, [page]);

  const onclickPageChange = (pageNumber: number) => {};

  return (
    <ArticlePageLayout>
      <div className={"border-b-2 h-full mt-3"}>
        <div className={"mb-3 border-2"}>
          <p>게시글 목록</p>
        </div>
        {articles.map((article: Article, index: number) => {
          return <ArticleRow key={article.id} id={article.id} title={article.title} />;
        })}
      </div>
    </ArticlePageLayout>
  );
};

export default ArticleEditList;
