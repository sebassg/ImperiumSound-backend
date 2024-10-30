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
      
        if (!user) return res.status(404).json({ error: 'User does not exist' })
            
            const passw_hash = user.passw
        const isValid = await bcrypt.compare(login.passw, passw_hash) 
        if (!isValid) return res.status(401).json({ error: 'Password is not valid' })
        


            const token = jwt.sign(
                { idUser: user.id, userName: user.userName, nombre: user.nombre }, 
                SECRET_JWT_KEY, 
                { expiresIn: '1h' }
              );
              
              res.cookie('access_token', token, {
                httpOnly: true,             // Solo accesible desde el backend, no JavaScript en el cliente
                secure: process.env.NODE_ENV === 'production', // Solo HTTPS en producción
                sameSite: 'None',           // Permite compartir la cookie entre orígenes diferentes
                maxAge: 60 * 60 * 1000      // Opcional: tiempo de vida en milisegundos (1 hora)
              });
              
              console.log('Cookie set:', res.getHeader('Set-Cookie'));
              return res.json({ message: 'Login successful' });
        

      
       
    }

    static async logout(req,res){

        res.clearCookie('access_token')

        return res.json({ mesenjer: 'ok'})
        
    }
    static async validToken(req, res) {
        const valid = req.session.user;
        const accessToken = req.cookies.access_token;
        console.log(accessToken)
    
        if (valid) {
            return res.json(valid); 
        }
        
        // Devuelve un error claro si el token no es válido
        return res.status(401).json({ message: "Token no válido" });
    }
}