import { userModel } from "../models/local-file-system/users.js"

export class userController {

    static async getAll (req,res) {

        const users = await userModel.getAll()
        res.json(users)

    }


}