import { readJSON } from "../../utils.js"
const users = readJSON('./users.json')


export class userModel {

    static async getAll(){
        return users
    }

    


}