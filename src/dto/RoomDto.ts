import { Room } from "../model/Room";
import express, { Express } from 'express';

type conv = {
    capacityPerson: string
    name: string
    reserveStatus: boolean
    createBy: string
    updateBy: string
}

export function RoomDto(json: conv): Room {

    const result: Room = new Room()
    result.capacityPerson = json.capacityPerson;
    result.name = json.name
    result.reserveStatus = json.reserveStatus;
    result.createBy = json.createBy;
    result.updateBy = json.updateBy;
    return result;
} 