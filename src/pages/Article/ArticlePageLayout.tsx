import { NavLink } from "react-router-dom";

const ArticlePageLayout = ({ children }: { children: any }) => {
  return (
    <>
      <div className="tabs tabs-boxed">
        <NavLink
          to={`/article/new`}
          className={({ isActive }) =>
            isActive ? "tab rounded-[10px] text-[#FFFFFF] bg-[#FF9136]" : "tab"
          }
        >
          게시글 작성
        </NavLink>
        <NavLink
          to={`/article/edit`}
          className={({ isActive }) =>
            isActive ? "tab rounded-[10px] text-[#FFFFFF] bg-[#FF9136]" : "tab"
          }
        >
          게시글 수정
        </NavLink>
      </div>
      <div>{children}</div>
    </>
  );
};

export default ArticlePageLayout;
