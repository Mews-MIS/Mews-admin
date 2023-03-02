import HttpClient from "../services/HttpClient";

const ArticleAPI = {
  postImageFile: async (uploadImages: any) => {
    try {
      const path = "file/upload";
      const response = await HttpClient.post(path, uploadImages, {
        "content-type": "multipart/form-data",
      });
      const { fileUrls } = response as {
        fileUrls: string[];
      };

      console.log(fileUrls);

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

      console.log(response);

      return response;
    } catch (e) {
      console.log(e);
    }
  },

  getPageArticles: async ({ page }: { page: number }) => {
    try {
      const path = "article/all";
      const response = await HttpClient.get(path, { page });

      return response;
    } catch (e) {
      console.log(e);
    }
  },
};

export default ArticleAPI;
