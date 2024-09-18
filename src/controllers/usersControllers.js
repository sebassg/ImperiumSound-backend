import { userModel } from "../models/local-file-system/users.js"
import { validatePartialUser,validateUser } from "../schemas/users.js"

export class userController {

    static async getAll (req,res) {

        const users = await userModel.getAll()
        res.json(users)

    }

    static async getById (req,res) {
        const { id } = req.params
        const user = await userModel.getId({ id })
        res.json(user)
    }

    static async create (req,res) {
        const result = validateUser(req.body)
        if (!result.success){
            
            return res.status(400).json({error: JSON.parse(result.error.message)})
        }

            const newUser = userModel.create({input: result.data})
            res.status(201).json(newUser)


    }

    


}