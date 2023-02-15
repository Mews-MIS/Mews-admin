import HttpClient from "../services/HttpClient";

const ArticleAPI = {
  postImageFile: async (uploadImages: any) => {
    try {
      const path = "file/upload";
      const response = await HttpClient.post(path, uploadImages);
      const { fileUrls } = response.response as {
        fileUrls: string[];
      };

      return fileUrls;
    } catch (e) {
      console.log(e);
    }
  },

  postArticle: async (articleFormData: any) => {
    try {
      console.log(articleFormData);
      const path = "article/post";
      const response = await HttpClient.post(path, articleFormData, {
        "content-type": "multipart/form-data",
        withCredentials: true,
      });

      console.log(response.response);

      return response.response;
    } catch (e) {
      console.log(e);
    }
  },

  getPageArticles: async ({ page }: { page: number }) => {
    try {
      const path = "article/all";
      const response = await HttpClient.get(
        path,
        { page },
        { withCredentials: true }
      );
      console.log(response);

      return response.response;
    } catch (e) {
      console.log(e);
    }
  },
};

export default ArticleAPI;
