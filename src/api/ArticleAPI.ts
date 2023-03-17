import HttpClient from "../services/HttpClient";

const ArticleAPI = {
  postImageFile: async (uploadImages: any) => {
    try {
      const path = "file/upload";
      const response = await HttpClient.post(path, uploadImages, {
        "content-type": "multipart/form-data",
      });
      const { fileUrls } = response.data;

      return fileUrls;
    } catch (e) {
      console.log(e);
    }
  },

  postArticle: async (articleFormData: any) => {
    try {
      const path = "article/post";
      const response = await HttpClient.post(path, articleFormData, {
        "content-type": "multipart/form-data",
      });

      console.log(response);

      return response;
    } catch (e) {
      console.log(e);
    }
  },

  getPageArticles: async ({ page }: { page: number }) => {
    try {
      const path = "article/all";
      const response: { pageCount: number; articles: any } = await HttpClient.get(path, { page });

      return response;
    } catch (e) {
      console.log(e);
    }
  },

  getArticleInfo: async (articleId: any) => {
    try {
      const path = `article/${articleId}`;
      const response = await HttpClient.get(path);

      return response;
    } catch (e) {
      console.log(e);
    }
  },
};

export default ArticleAPI;
