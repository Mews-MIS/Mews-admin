import ArticlePageLayout from "./ArticlePageLayout";
import { useEffect, useState } from "react";
import ArticleAPI from "../../api/ArticleAPI";
import ArticleRow from "../../components/ArticleRow";
import { useNavigate } from "react-router-dom";
import Paging from "../../components/Pagination";
import usePostByPageNumber from "../../hook/useNewAricle";

const ArticleEditList = () => {
  const [article, setArticle] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalItemsCount, setTotalItemsCount] = useState<number>(0);
  const { data, isLoading } = usePostByPageNumber(pageNumber);
  const itemsCountPerPage = 10;

  useEffect(() => {
    ArticleAPI.getPageArticles(1, {}).then((data: any) => {
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

  return (
    <ArticlePageLayout>
      <div className="border-b-2 h-full mt-3">
        <div className="mb-3 border-2">
          <p>게시글 목록</p>
        </div>
        {data?.articles &&
          data.articles.map((element: any) => {
            const articleInfo = element.article;
            return (
              <ArticleRow key={articleInfo.id} id={articleInfo.id} title={articleInfo.title} />
            );
          })}
      </div>
      <div>
        <Paging page={pageNumber} count={totalItemsCount} setPage={setPage} />
      </div>
    </ArticlePageLayout>
  );
};

export default ArticleEditList;
