import jtoken from 'jsonwebtoken'
import dt from 'dotenv'

dt.config()
const trial:string = jtoken.sign({username: "cokimen", email: "124"}, 'random2323', {expiresIn: "1h"})

console.log(trial)

console.log(process.env.TRIAL_KEY)