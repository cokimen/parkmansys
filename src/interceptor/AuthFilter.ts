/* 
  implementation of validation jwt
*/

import { Request, Response, NextFunction } from "express"

export async function JwtFilter(req: Request, res: Response, next: NextFunction) {
  const s = req.headers?.bkey
  console.log('req.headers?.bkey', s)
  //  const keyPair : string[] = s.split(" ")
  if (!s){
      return res.status(400).send({info: 'Bkey Must be set on Header'})
  }
  next()
}