/* 
  funtionality for jwt generator, validator
*/
import jtoken from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export function jwt(a: Object) : string {
    return jtoken.sign(a, process.env.SECRET_KEY, {expiresIn: process.env.EXPIRES})
}

export function validatorJwt(a: Object): boolean {
   return true
}