import { DataSource } from "typeorm";
import { Booking } from "../model/Booking";
import { Room } from "../model/Room";
import { User } from "../model/User";
import { RequestChange } from "../model/RequestChange";


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root01",
    database: "parkmansys",
    synchronize: true,
    logging: true,
    entities: [ Booking, Room, User, RequestChange],
    migrations: [],
    subscribers: [],
})
