// src/index.ts
import express, { Express, Response, Request } from 'express';
import bodyParser from 'body-parser';

import { applyServerHardening } from './interceptor/Security';
import { MyUninion, Pagination } from "./service/Pagination"
import { AppDataSource as AppDb } from "./config/Db"

import { Room } from "./model/Room"
import { RoomDto } from './dto/RoomDto';
import { RequestChange } from './model/RequestChange';
import { DummyChain } from './interceptor/DummyChain';


const app: Express = express();
const port = 3000;


// AppDb.initialize().then(async () => {

// }).catch(error => console.log(error))



function logger(req: express.Request, res: express.Response, next: express.NextFunction): void {
  console.log("Logger is Running")
  next()
}


/* 
  interceptor / middleware
*/

// applyServerHardening(app)

app.use(bodyParser.json({ limit: "100mb" }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))
app.use(logger)




app.get("/", DummyChain, async (req: express.Request, res: express.Response) => {
  MyUninion.fnGolang()
  Pagination.fnRust()

  res.send('Ehlo ParkManSys');

});





/* 

group route endpoint for data authentication service

*/

app.get("/login", (req: express.Request, res: express.Response) => {
  res.send({
    "jwt": "8034444"
  });
});


// group route endpoint for data user service

app.get("/api/v1/user", async (req: Request, resp: Response) => {
  resp.send({
    info: "list user"
  })
})


app.post("/api/v1/user", async (req: Request, resp: Response) => {
  resp.send({
    info: "Create User"
  })
})


app.patch("/api/v1/user", async (req: Request, resp: Response) => {
  resp.send({
    info: "Enable Disable User"
  })
})



// group route endpoint for data room service

app.get("/api/v1/room", async (req: Request, resp: Response) => {
  const rooms = await AppDb.manager.find(Room)
  resp.send({ room: rooms })
})

app.post("/api/v1/room", async (req: Request, resp: Response) => {

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

  room = await roomRepo.save(room)
  resp.send( room)
})



// group route endpoint for data request change service

app.get("/api/v1/request_change", async (req: express.Request, res: express.Response) => {
  const tmp_result = await AppDb.getRepository(RequestChange).find()
  res.send({ request_change: tmp_result });
});


app.post("/api/v1/request_change", async (req: express.Request, res: express.Response) => {
  const request_change = await AppDb.getRepository(RequestChange).save(req.body)
  const result = await AppDb.getRepository(RequestChange).save(request_change)
  res.send(result);
});


// group route endpoint for data booking service
app.post("/api/v1/booking", async (req: express.Request, res: express.Response) => {
  res.send('List Of Planning Booking Room');
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});