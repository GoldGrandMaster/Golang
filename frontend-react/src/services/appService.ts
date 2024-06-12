import Axios from "../config/axios";

class AppService {

    createApp(appName: string) {
        const appData = {
            app_number: appName
        };

        return Axios.post('/app/create', appData);
    }

    getAppList() {
        return Axios.get('/app/getlist');
    }

    getAppById(id: string) {
        return Axios.get('/app/get/' + id);
    }
}

export default new AppService();
