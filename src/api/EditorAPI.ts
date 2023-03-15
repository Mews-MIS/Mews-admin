import HttpClient from "../services/HttpClient";

const EditorAPI = {
  postRegisterEditor: async (editorFormData: FormData) => {
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
  getEditorAll: async () => {
    try {
      const path = "/editor/getall";
      const response = await HttpClient.get(path);
      console.log(response);

      return response;
    } catch (e) {
      console.log(e);
    }
  },
  getEditor: async (id: number) => {
    try {
      const path = `/editor/getone/${id}`;
      const response = await HttpClient.get(path, {});
      console.log(response);

      return response;
    } catch (e) {
      console.log(e);
    }
  },
  deleteEditor: async (editor_id: number) => {
    try {
      const path = `/editor/delete/${editor_id}`;
      const response = await HttpClient.fetch(path, {});
      console.log(response);

      return response;
    } catch (e) {
      console.log(e);
    }
  },
  updateEditor: async (newEditorFormData: FormData) => {
    try {
      const path = "/editor/update";
      const response = await HttpClient.fetch(path, newEditorFormData, {
        "content-type": "multipart/form-data",
      });
      console.log(response);

      return response;
    } catch (e) {
      console.log(e);
    }
  },
};

export default EditorAPI;
