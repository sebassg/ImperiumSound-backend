import { LoginModel } from "../models/mysql/login.js"


export class loginRepository{

    static async valitLogin({input}){

        return await LoginModel.login({input})

    }


}