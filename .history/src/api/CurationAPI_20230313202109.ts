import HttpClient from "../services/HttpClient";

const CurationAPI = {
  postCreaterEditor: async (editorFormData: FormData) => {
    try {
      const path = "/editor/register";
      const response = await HttpClient.post(path, editorFormData, {
        "content-type": "multipart/form-data",
      });

      console.log(response);

      return response;
    } catch (e) {
      console.log(e);
    }
  },
};

export default CurationAPI;
