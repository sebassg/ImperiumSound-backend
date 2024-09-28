import bcrypt from "bcrypt";
import { validateLogin } from "../schemas/login.js";
import { loginRepository } from "../repository/login.js";



export class LoginController {


    static async login(req,res){
       const  result = validateLogin(req.body)
       if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) });
      }

      const login = result.data
       const userRecords = await loginRepository.valitLogin({input: login})
        if (!userRecords) return res.status(404).json({ error: 'User does not exist' })
            const passw_hash = userRecords[0].passw
        const isValid = await bcrypt.compare(login.passw, passw_hash) 
        if (!isValid) return res.status(401).json({ error: 'Password is not valid' })
            
        return res.send("sesion iniciada")

    }
}