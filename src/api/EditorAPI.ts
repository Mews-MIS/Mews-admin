import HttpClient from "../services/HttpClient";

const EditorAPI = {
    getAllEditor: async () => {
        try {
            const path = "editor/getall"
            const response = await HttpClient.get(path);
            return response
        } catch (e){
            console.log(e)
        }
    }
}

export default EditorAPI;