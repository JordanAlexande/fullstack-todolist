import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import env from './utils/validateEnv'


const app = express()
const port = process.env.PORT || 4000


app.get('/', (req, res) => {
    res.send('Hello Wordl')
})
mongoose.set('strictQuery', false)
mongoose.connect(env.MONGO_CONECTION_STRING)
    .then(() => {
        app.listen(env.PORT, () => {
            console.log(`Runnion on http://localhost:3000/`)
        })
    }).catch(e => console.log(e))
