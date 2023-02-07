import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()

const app = express()
const port = process.env.PORT || 4000


app.get('/', (req, res) => {
    res.send('Hello Wordl')
})
mongoose.set('strictQuery', false)
mongoose.connect(`${process.env.MONGO_CONECTION_STRING}`)
    .then(() => {
        app.listen(port, () => {
            console.log(`Runnion on http://localhost:3000/`)
        })
    }).catch(e => console.log(e))
