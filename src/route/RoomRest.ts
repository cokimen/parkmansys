/* 
  group api for room data
*/
import express,{ Express, Router, Request, Response, NextFunction } from 'express'
const pathApi =  Router()

import { AppDataSource as AppDb } from '../config/Db'

import { Room } from '../model/Room'


pathApi.get("/", async (req: Request, resp: Response) => {
    const rooms = await AppDb.manager.find(Room)
    resp.send({ room: rooms })
})

pathApi.post("/", async (req: Request, resp: Response) => {

    const roomRepo = AppDb.getRepository(Room)
    const {
        name,
        capacityPerson,
        reserveStatus } = req.body;
    let room = new Room();

    console.log(await req.body)

    room.capacityPerson = capacityPerson
    room.reserveStatus = reserveStatus
    room.name = name
    room.createBy = name
    room.updateBy = name

    room = await roomRepo.save(room)
    resp.send(room)
})

export default pathApi