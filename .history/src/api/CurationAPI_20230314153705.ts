import HttpClient from "../services/HttpClient";

const CurationAPI = {
  postCreateCuration: async (editorFormData: FormData) => {
    try {
      const path = "/curation/post";
      const response = await HttpClient.post(path, editorFormData, {
        "content-type": "multipart/form-data",
      });

      console.log(response);

      return response;
    } catch (e) {
      console.log(e);
    }
  },
  // 모든 기사 불러오기
  getCurationAll: async () => {
    try {
      const path = "/curation/all";
      const response: { allCuration: []; checked: [] } = await HttpClient.get(path, {}, {});
      console.log(response);

      return response;
    } catch (e) {
      console.log(e);
    }
  },
};

export default CurationAPI;
