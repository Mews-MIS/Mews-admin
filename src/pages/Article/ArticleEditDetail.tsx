import ArticlePageLayout from "./ArticlePageLayout";
import { useEffect, useState } from "react";
import ArticleAPI from "../../api/ArticleAPI";
import { useParams } from "react-router-dom";

const ArticleEditDetail = () => {
  const [articleSet, setArticleSet] = useState();
  const params = useParams();
  console.log(params.id);

  useEffect(() => {
    const getArticleInfo = async () => {
      const article = await ArticleAPI.getArticleInfo(params.id);
      setArticleSet(article);
    };

    getArticleInfo();
    console.log(articleSet);
  }, []);
  return (
    <ArticlePageLayout>
      <h1>article Detail</h1>
    </ArticlePageLayout>
  );
};

export default ArticleEditDetail;
