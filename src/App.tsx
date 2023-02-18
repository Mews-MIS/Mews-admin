import React from "react";
import { Route, Routes } from "react-router-dom";
import ArticleWrite from "./pages/Article/ArticleWrite";
import Home from "./pages/Home";
import CurationEdit from "./pages/CurationEdit";
import EditorEdit from "./pages/EditorEdit";
import ScheduleEdit from "./pages/ScheduleEdit";
import NotFound from "./pages/NotFound";
import DefaultLayout from "./layouts/DefaultLayout";
import Statics from "./pages/Statics";
import ArticleEdit from "./pages/Article/ArticleEdit";

function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path={"/"} element={<Home />} />
        <Route path={"/article/new"} element={<ArticleWrite />} />
        <Route path={"/article/edit"} element={<ArticleEdit />} />
        <Route path={"/curation"} element={<CurationEdit />} />
        <Route path={"/schedule"} element={<ScheduleEdit />} />
        <Route path={"/editor"} element={<EditorEdit />} />
        <Route path={"/statics"} element={<Statics />} />
        <Route path={"*"} element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
