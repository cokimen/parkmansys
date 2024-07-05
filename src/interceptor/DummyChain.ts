import { NextFunction, Response, Request } from "express";

/* 

*/
export function DummyChain(req: Request, resp: Response, next: NextFunction) : void {    
    if ( req.headers?.unknown === "yuhu") {
        next()
    }
    resp.send({"info": "Forbiddem"})
}