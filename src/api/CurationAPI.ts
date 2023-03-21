import HttpClient from "../services/HttpClient";

const CurationAPI = {
  postCuration: async (uploadCuration: any) => {
    try {
      const path = "curation/post";
      const response = await HttpClient.post(path, uploadCuration);
      console.log(response);
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  // 이것도 수정해야 함
  getCuraitonAll: async ({ page }: { page: number }) => {
    try {
      const path = "article/all";
      const response: { pageCount: number; articles: any } = await HttpClient.get(path, { page });

      return response;
    } catch (e) {
      console.log(e);
    }
  },
};

export default CurationAPI;
