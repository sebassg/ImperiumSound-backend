import { LoginModel } from "../models/sqlite/login.js"



export class loginRepository{

    static async valitLogin({input}){

        return await LoginModel.login({input})

    }


}