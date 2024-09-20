import { userModel } from "../models/mysql/users.js"
//import { userModel } from "../models/local-file-system/users.js"
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

            const newUser = await userModel.create({input: result.data})
            res.status(201).json(newUser)


    }
    static async delete (req,res){

        const { id }= req.params
        const result = await userModel.delete({ id })
        if(result === false){

            return res.status(404).json({ message: 'Movie not found' })

        }
        return res.json({ message: 'Movie deleted' })

    }

    static async update (req,res){
        const { id } = req.params
        const result =  validatePartialUser(req.body)

        if (!result.success){
            
            return res.status(400).json({error: JSON.parse(result.error.message)})
        }

            const updateUser = await userModel.update({ id, input: result.data })
            res.json(updateUser)
    }

    


}