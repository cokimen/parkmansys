import { User } from '../model/User'

import { AppDataSource as DataSource } from '../config/Db'


export class UserService {
    
    public static async getUser(): Promise<User[]>  {
        return await DataSource.getRepository(User).find()
    }

    public static async createUser(usr: User): Promise<User> {
        const conn = DataSource.getRepository(User);

       const result =  conn.createQueryBuilder("user").where("user.email = :email", { email: usr.email})
       const countRow = await result.getCount()
       console.log("Total User ", countRow)
       if ( countRow > 0) {
           throw Error("User Exist")
       }
        return conn.save(usr);
    }
}