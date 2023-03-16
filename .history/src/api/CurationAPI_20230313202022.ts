import HttpClient from "../services/HttpClient";

const CurationAPI = {
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
};

export default ArticleAPI;
