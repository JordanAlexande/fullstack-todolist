import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import NoteModel from './models/note.model'
const app = express()
app.get('/', async (req, res) => {
    try {
        throw Error('Bazinga')
        const notes = await NoteModel.find().exec()
        res.status(200).json(notes)
    } catch (error) {
        console.error(error)
        let errorMessage = "An unknow error ocurred"
        if (error instanceof Error) errorMessage = error.message
        res.status(500).json({ error: errorMessage })
    }
})

export default app