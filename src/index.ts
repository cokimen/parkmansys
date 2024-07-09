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
import {jwt} from './authentication/JWT'
import { sha256 } from './authentication/Authenticate'
import { AuthenticationService } from './service/AuthenticationService'
import { JwtFilter } from './interceptor/AuthFilter'

import dt from 'dotenv'




dt.configDotenv({path : "./src/.env"})
const app: Express = express();
const port = 3000;


AppDb.initialize().then(async () => {

}).catch(error => console.log(error))


/* 
 path
*/

import roomRest from './route/RoomRest'
import userRest from './route/UserRest'
import requestChangeRest from './route/RequestChangeRest'
import { User } from './model/User';




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

app.post("/login", async (req: express.Request, res: express.Response, next: express.NextFunction) => { JwtFilter(req, res, next) }, async (req: express.Request, res: express.Response) => {


 
  const {
    username, password
  } = req.body

  const user = new User();
  user.email = username;
  user.password = password

  if ( await AuthenticationService.checkUserPassword(user)){
    return res.send({
      "jwt": jwt({email: username, password: password }),
        "dudu": sha256(password+"-"+username)
    });
    //  return res.send({info: 'user Valid'})
  } else {
    return res.send({info: 'User Not Valid'})
  }

  if ( username === 'user1' && password === 'pass1') {
    return res.send({
      "jwt": jwt({email: 'erhanburhanudin@gmail.com' }),
        "dudu": sha256(password+"-"+username)
    });
  }
  return res.status(201).send({info: 'User Not Found'})
  
});


/* 
 group route endpoint for data user service
*/

app.use('/api/v1/user', userRest)



// group route endpoint for data room service
app.use('/api/v1/room', roomRest)



// group route endpoint for data request change service

app.use('/api/v1/request_change', requestChangeRest)



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});