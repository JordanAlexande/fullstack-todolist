import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()

const app = express()
const port = process.env.PORT || 4000


app.get('/', (req, res) => {
    res.send('Hello Wordl')
})
mongoose.connect(`${process.env.MONGO_CONECTION_STRING}`)
    .then(() => {
        console.log('succfull conection')
    }).catch(e => console.log(e))

app.listen(port, () => {
    console.log(`Runnion on http://localhost:3000/`)
})