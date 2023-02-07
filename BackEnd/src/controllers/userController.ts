import { Request, Response, NextFunction } from 'express'
import { signInUserService, signUpUser, handleRefreshToken, handleLogout } from '../services/authentication'
const { validateSignup, validateSignIn } = require('./validator')

export async function signUpNewUser(req: Request, res: Response, next: NextFunction) {
  const{error, value } = validateSignup(req.body)
    if(!error){
      try{
      const newUser = await signUpUser(value, next)
      if(newUser){
        return res.status(201).json('sign up success')  
      }else{
        return res.json('Email already exists!')
      }
      } catch( err ){
        next(err)
      }
    }else{
      console.error(error.details)
      return res.send(error.message)
    }
}

export async function signInUser(req: Request, res: Response, next: NextFunction){
 
    const{error, value} = validateSignIn(req.body)
    if(!error){
      try{
        const tokens = await signInUserService(req, res, next)
        // if(tokens){
        //   res.cookie('jwt', tokens.refreshToken, {httpOnly: true, maxAge: 24*60*60*1000})
        //   res.json(tokens.accessToken)
        //   res.send('success')
        // }else{
        //   return res.send('User does not exists!')
        // }
      } catch(err: any){
        next(err)
      }
    }else{
      console.error(error.details)
      return res.send(error.message)
    }
}

export function refreshTokenHandler(req: Request, res: Response, next: NextFunction){
    handleRefreshToken(req, res, next)
}

export function logoutUser(req: Request, res: Response, next: NextFunction){
    handleLogout(req, res, next)
}