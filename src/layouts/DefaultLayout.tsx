import { Link, Outlet } from "react-router-dom";
import WhiteLogo from "../assets/Icon/WhiteLogo.svg";

interface Props {}

const DefaultLayout = ({}: Props) => {
  return (
    <div className={"flex"}>
      <aside className={" w-64 h-screen bg-[#FF9136] text-white p-10 text-xl"}>
        <img src={WhiteLogo} alt={"로고"} />
        <div className={"mt-10"}>
          <section>
            <Link to={"/"}>홈</Link>
          </section>
          <section>
            <Link to={"/article"}>게시글 관리</Link>
          </section>
          <section>
            <Link to={"/curation"}>큐레이션 관리</Link>
          </section>
          <section>
            <Link to={"/schedule"}>학사 일정 관리</Link>
          </section>
          <section>
            <Link to={"/editor"}>필진 관리</Link>
          </section>
          <section>
            <Link to={"/statics"}>통계</Link>
          </section>
        </div>
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default DefaultLayout;
