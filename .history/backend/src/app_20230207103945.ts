import express, { NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
dotenv.config()
import noteRoute from './routes/note.route'

import NoteModel from './models/note.model'
const app = express()

app.use(noteRoute)
app.use((req, res, next) => {
    next(Error('Endpoint not found'))
})
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error)
    let errorMessage = "An unknow error ocurred"
    if (error instanceof Error) errorMessage = error.message
    res.status(500).json({ error: errorMessage })
})

export default app