import { Router, Request, Response, NextFunction } from 'express'
const pathApi = Router()

pathApi.get("/", async (req: Request, resp: Response) => {
    resp.send({
        info: "list user"
    })
})


pathApi.post("/", async (req: Request, resp: Response) => {
    resp.send({
        info: "Create User"
    })
})


pathApi.patch("/", async (req: Request, resp: Response) => {
    resp.send({
        info: "Enable Disable User"
    })
})

export default pathApi
