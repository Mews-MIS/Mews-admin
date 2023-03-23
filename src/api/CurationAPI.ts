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

  getArticleAll: async ({ page }: { page: number }) => {
    try {
      const path = "article/all";
      const response: { pageCount: number; articles: any } = await HttpClient.get(path, { page });

      return response;
    } catch (e) {
      console.log(e);
    }
  },
  getAllCuration: async (newCuration: any) => {
    try {
      const path = "/curation/all";
      const response = await HttpClient.get(path, newCuration);
      console.log(response);

      return response;
    } catch (e) {
      console.log(e);
    }
  },
  getCurationId: async (id: number) => {
    try {
      const path = "/curation/{id}";
      const response = await HttpClient.get(path, id);
      console.log(response);

      return response;
    } catch (e) {
      console.log(e);
    }
  },
  updateCuration: async (changeCuration: any) => {
    try {
      const path = `/curation/update`;
      const response = await HttpClient.fetch(path, changeCuration);
      console.log(response);

      return response;
    } catch (e) {
      console.log(e);
    }
  },
};

export default CurationAPI;
