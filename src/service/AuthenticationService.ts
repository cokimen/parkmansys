import { User } from "../model/User"
import { AppDataSource as DataSource} from '../config/Db'
import { sha256 } from "../authentication/Authenticate"

export class AuthenticationService {
    public static async checkUserPassword(usr: User): Promise<boolean>  {
        const rowCount: number = await DataSource.getRepository(User).createQueryBuilder().where(" email = :email ", {
            email: usr.email
        }).andWhere(
            "password = :password", {
            password: sha256(usr.password+"-"+usr.email)
        }).getCount()
        if (rowCount === 0) {
            return false
        }
        return true
    }

    public static checkJwt(jwt: string): boolean {
        return true
    }
}