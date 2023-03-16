import ArticlePageLayout from "./ArticlePageLayout";
import { useEffect, useState } from "react";
import ArticleAPI from "../../api/ArticleAPI";
import { Article } from "../../type/Article";
import ArticleRow from "../../components/ArticleRow";
import { useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";
import styled from "styled-components";

const ArticleEditList = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState<number>(1);
  const [totalItemsCount, setTotalItemsCount] = useState<number>(0);
  const itemsCountPerPage = 10;

  useEffect(() => {
    const getArticles = async () => {
      const response = await ArticleAPI.getPageArticles({ page });
      await setArticles(response!.articles);
      setTotalItemsCount(Math.ceil(response!.pageCount * itemsCountPerPage));
    };

    getArticles();
  }, [page]);

  const onclickPageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const PaginationBox = styled.div`
    .pagination {
      display: flex;
      justify-content: center;
      margin-top: 15px;
      margin-bottom: 15px;
      font-weight: ${theme.FONT_WEIGHT.BOLD};
      background-color: ${theme.COLORS.CONTAINER_WHITE};
    }
    ul {
      list-style: none;
      padding: 0;
    }
    ul.pagination li {
      display: inline-block;
      width: 30px;
      height: 30px;
      border: none;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: ${theme.FONT_SIZE.SMALL_SIZE};
    }
    ul.pagination li:first-child {
      border-radius: 5px 0 0 5px;
    }
    ul.pagination li:last-child {
      border-radius: 0 5px 5px 0;
    }
    ul.pagination li a {
      text-decoration: none;
    }
    ul.pagination li.active a {
      color: white;
    }
    ul.pagination li.active {
      background-color: #ffbd29;
    }
    ul.pagination li a:hover,
    ul.pagination li a.active {
      color: blue;
    }
  `;

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
      <PaginationBox>
        <Pagination
          activePage={page}
          itemsCountPerPage={itemsCountPerPage}
          totalItemsCount={totalItemsCount}
          pageRangeDisplayed={5}
          onChange={onclickPageChange}
        />
      </PaginationBox>
    </ArticlePageLayout>
  );
};

export default ArticleEditList;
