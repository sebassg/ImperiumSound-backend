import jwt from 'jsonwebtoken'
import { SECRET_JWT_KEY } from '../config.js'


export const jwtMiddleware = ((req,res,next) =>{
    const token = req.cookies.access_token
    req.session = { user: null  }
    try{
      const data = jwt.verify(token, SECRET_JWT_KEY)
      req.session.user = data
    } catch (e) {
     req.session.user = null
    }
   
     next()
   })

    
  
    