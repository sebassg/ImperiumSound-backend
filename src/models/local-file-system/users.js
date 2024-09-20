import { randomUUID } from 'node:crypto'
import { readJSON } from "../../utils.js"

const users = readJSON('./users.json')

export class userModel {
    static async getAll() {
        return users;
    }

    static async getId({ id }) {
        const user = users.find(user => user.id === id);
        return user || null; 
    }

    static async create({ input }) {
        const newUser = {
            id: randomUUID(),
            ...input,
        };

        users.push(newUser) // Guarda todos los usuarios
        return newUser;
    }

    static async delete({id}){
        const userIndex = users.findIndex(user => user.id === id);
        if(userIndex  === -1) return false

        users.splice(userIndex,1)
        return true

    }

    static async update({ id, input }){
        const userIndex = users.findIndex(user=> user.id === id)
        if(userIndex === -1) return false

        users[userIndex] ={
            ...userIndex,
            ...input
        }

        return users[userIndex]
    }
}