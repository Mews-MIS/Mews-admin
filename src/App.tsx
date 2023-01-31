import React from "react";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import ArticleEdit from "./pages/ArticleEdit";
import Home from "./pages/Home";
import CurationEdit from "./pages/CurationEdit";
import EditorEdit from "./pages/EditorEdit";
import ScheduleEdit from "./pages/ScheduleEdit";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path={"/"} element={<Home />} />
        <Route path={"/article"} element={<ArticleEdit />} />
        <Route path={"/curation"} element={<CurationEdit />} />
        <Route path={"/schedule"} element={<ScheduleEdit />} />
        <Route path={"/editor"} element={<EditorEdit />} />
        <Route path={"*"} element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
