import Axios from "../config/axios";

class DocumentService {

    fileUplaod(formData: FormData) {
        return Axios.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

}

export default new DocumentService();
