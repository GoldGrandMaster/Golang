import Axios from "../config/axios";
import { ILoginData, IRegisterData } from "../interface/interface";

class AuthService {

    userLogin(loginBody: ILoginData) {
        return Axios.post('/auth/login', loginBody);
    }

    userRegister(registerBody: IRegisterData) {
        return Axios.post('/auth/register', registerBody);
    }
}

export default new AuthService();
