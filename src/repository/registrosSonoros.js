import { RegistroSonoroModel } from "../models/mysql/registrosSonoros.js";


export class RegistroSonoroRepository{
    static async createResgister({ input }){
        return await RegistroSonoroModel.createRegister({ input });
    }
    static async getAllRegister(){
        return await RegistroSonoroModel.getAll();
    }
    static async getMyRegister({ input }){
        return await RegistroSonoroModel.getMy({ input })
    }
}