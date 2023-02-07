import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import NoteModel from './models/note.model'
const app = express()
app.get('/', async (req, res) => {
    const notes = await NoteModel.find().exec()
    res.status(200).json(notes)
})

export default app