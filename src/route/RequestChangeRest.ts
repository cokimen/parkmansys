import { Router, Request, Response, NextFunction } from 'express'

import { AppDataSource as AppDb} from '../config/Db'
import { RequestChange } from '../model/RequestChange'

const pathApi = Router()

pathApi.get("/api/v1/request_change", async (req: Request, res: Response) => {
    const tmp_result = await AppDb.getRepository(RequestChange).find()
    res.send({ request_change: tmp_result });
});


pathApi.post("/api/v1/request_change", async (req: Request, res: Response) => {
    const request_change = await AppDb.getRepository(RequestChange).save(req.body)
    const result = await AppDb.getRepository(RequestChange).save(request_change)
    res.send(result);
});


// group route endpoint for data booking service
pathApi.post("/api/v1/booking", async (req: Request, res: Response) => {
    res.send('List Of Planning Booking Room');
});

export default pathApi