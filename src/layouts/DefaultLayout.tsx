import { Link, Outlet } from "react-router-dom";
import WhiteLogo from "../assets/Icon/WhiteLogo.svg";

const DefaultLayout = () => {
  return (
    <div className="flex h-full">
      <aside className="w-64 bg-[#FF9136] text-white p-10 text-xl flex-0">
        <img src={WhiteLogo} alt="로고" />
        <div className="mt-10">
          <section>
            <Link to="/">홈</Link>
          </section>
          <section>
            <Link to="/article/new">게시글 관리</Link>
          </section>
          <section>
            <Link to="/curation">큐레이션 관리</Link>
          </section>
          <section>
            <Link to="/schedule">학사 일정 관리</Link>
          </section>
          <section>
            <Link to="/editor">필진 관리</Link>
          </section>
          <section>
            <Link to="/statics">통계</Link>
          </section>
        </div>
      </aside>
      <main className="flex-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DefaultLayout;
