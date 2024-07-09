import { Router, Request, Response, NextFunction } from 'express'
const pathApi = Router()
import { createUser, sha256 } from "../authentication/Authenticate"
import { User } from '../model/User'
import { UserService} from '../service/UserService'

pathApi.get("/", async (req: Request, resp: Response) => {
    const users : User[] = await UserService.getUser()
    return resp.send({
        info: users
    })
})


pathApi.post("/", async (req: Request, resp: Response) => {
    const {
        email,
        password
    } = req.body
    

    let usr: User = new User()
    usr.email = email
    usr.password = sha256(password+"-"+email)
    usr.createBy = "oncom"
    usr.updateBy = "cumi"
    try {
   
        usr = await UserService.createUser(usr)
        return resp.send({
            info: "Data User Created",
            user: usr
        })
    } catch (error) {
        return resp.status(400).send({
            Error: "Already Exist"
        })
    }
    
})


pathApi.patch("/", async (req: Request, resp: Response) => {
    resp.send({
        info: "Enable Disable User"
    })
})

export default pathApi
