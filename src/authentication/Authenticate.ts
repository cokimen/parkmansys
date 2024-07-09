import { createHash } from "crypto"
import { User } from "../model/User"
import { AppDataSource as DataSrc } from "../config/Db"

export function sha256(content: string): string {  
    return createHash('sha256').update(content).digest('hex')
  }

export async function createUser(usr: User) {
    return await DataSrc.getRepository(User).save(usr)
}