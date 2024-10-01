import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import { SECRET_JWT_KEY } from "../config.js";
import { validateLogin } from "../schemas/login.js";
import { loginRepository } from "../repository/login.js";



export class LoginController {


    static async login(req,res){
       const  result = validateLogin(req.body)
       if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) });
      }

      const login = result.data
       const user = await loginRepository.valitLogin({input: login})

       console.log(user.passw);
        if (!user.passw) return res.status(404).json({ error: 'User does not exist' })
            const passw_hash = user.passw
        const isValid = await bcrypt.compare(login.passw, passw_hash) 
        if (!isValid) return res.status(401).json({ error: 'Password is not valid' })
        

        const token = jwt.sign(
            {id: user.id, userName: user.userMame, nombre: user.nombre}, 
            SECRET_JWT_KEY, {
                expiresIn: '1h'
            }
        )
        res.cookie('access_token', token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });


        return res.send('logeado')
    }

    static async logout(req,res){

        res.clearCookie('access_token')

        return res.json({ mesenjer: 'ok'})
        
    }
}