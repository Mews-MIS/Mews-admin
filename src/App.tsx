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
import ArticleEditList from "./pages/Article/ArticleEditList";
import ArticleEditDetail from "./pages/Article/ArticleEditDetail";
import { QueryClient, QueryClientProvider } from "react-query";
import { Login } from "./pages/Login";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/article/new" element={<ArticleWrite />} />
          <Route path="/article/edit" element={<ArticleEditList />} />
          <Route path="/article/edit/:id" element={<ArticleEditDetail />} />
          <Route path="/curation" element={<CurationEdit />} />
          <Route path="/schedule" element={<ScheduleEdit />} />
          <Route path="/editor" element={<EditorEdit />} />
          <Route path="/statics" element={<Statics />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
