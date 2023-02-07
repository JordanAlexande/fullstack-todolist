import app from './app'
import mongoose from 'mongoose'
import env from './utils/validateEnv'


const port = process.env.PORT || 4000
mongoose.set('strictQuery', false)
mongoose.connect(env.MONGO_CONECTION_STRING)
    .then(() => {
        app.listen(env.PORT, () => {
            console.log(`Runnion on http://localhost:3000/`)
        })
    }).catch(e => console.log(e))