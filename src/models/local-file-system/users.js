import { randomUUID } from 'node:crypto'
import { readJSON } from "../../utils.js"
const users = readJSON('./users.json')


export class userModel {

    static async getAll(){
        return users
    }

    static async getId ({ id }){
        const user = users.find(user => user.id === id)
        return user
    }

    static async create ({ input }){
        const newUser = {
            id: randomUUID(),
            ...input
        }

        users.push(newUser)

        return newUser

    }


}