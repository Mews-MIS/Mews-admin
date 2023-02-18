import ArticlePageLayout from "./ArticlePageLayout";
import { useEffect, useState } from "react";
import ArticleAPI from "../../api/ArticleAPI";

const ArticleEdit = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const getArticles = async () => {
      const nowArticles = await ArticleAPI.getPageArticles({ page });
      await setArticles(nowArticles);
    };
    getArticles();
  }, [page]);
  return (
    <ArticlePageLayout>
      <div></div>
    </ArticlePageLayout>
  );
};

export default ArticleEdit;
