import { Request, Response, NextFunction } from 'express';
import { PostgresDataSource } from '../configs/db';
const bcrypt = require('bcrypt');
import { User } from '../models/UserModel';
const jwt = require('jsonwebtoken');
require('dotenv').config();

export async function signUpUser(value: User, next: NextFunction) {
    try{
        const email = value.email
        const userRepository = PostgresDataSource.getRepository(User)
        const existingUser = await userRepository.findOneBy({
            email: email
        })
        if(!existingUser){
            const hashedPassword = await bcrypt.hash(value.password, 10);
            const newUser = new User()
            newUser.email = value.email
            newUser.password = hashedPassword
            newUser.role = 'student'
            
            // await PostgresDataSource.manager.save(newUser)
            // const user = PostgresDataSource.getRepository(User).create(newUser)
            // return await PostgresDataSource.getRepository(User).save(user)
            return await PostgresDataSource.manager.save(newUser)
            // return newUser;
        }else{
            return null
        }
    } catch (err) {
        next(err)
    }
}

export async function signInUserService(req: Request, res: Response, next: NextFunction){
    try{
        const email = req.body.email
        const password = req.body.password
        const userRepository = PostgresDataSource.getRepository(User)
        const loggedUser = await userRepository.findOneBy({
            email: email
        })
        console.log('user logged 41',loggedUser)
        if(loggedUser){
            if(await bcrypt.compare(password, loggedUser.password)){
                return loggedUser.role             
            }else{
                return res.status(401).send('Password is incorrect!')
             } 
        }else{
            return res.status(400).send('Email does not exists!')
        }
    } catch(err) {
        next(err)
    }
}

export const handleRefreshToken = (req: Request, res: Response, next: NextFunction) => {
    const cookies = req.cookies
    if(!cookies.jwt) return res.status(401).send('No token provided')
    console.log('cookies in backend : ', cookies)
    const refreshToken = cookies.jwt
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err: any, decoded: any) => {
        if(err) return res.status(403).send('Invalid token')
        const accessToken = jwt.sign({email: decoded.email}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30s'})
        res.json(accessToken)
        return
    }) 
}

