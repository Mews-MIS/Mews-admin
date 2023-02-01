import { Outlet } from "react-router-dom";
import WhiteLogo from "../assets/Icon/WhiteLogo.svg";

interface Props {}

const DefaultLayout = ({}: Props) => {
  return (
    <div className={"flex"}>
      <aside className={" w-1/4 h-screen bg-[#FF9136] text-white p-10 text-xl"}>
        <img src={WhiteLogo} alt={"로고"} />
        <div className={"mt-10"}>
          <section>메인</section>
          <section>게시글 관리</section>
          <section>큐레이션 관리</section>
          <section>학사 일정 관리</section>
          <section>필진 관리</section>
          <section>통계</section>
        </div>
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default DefaultLayout;
