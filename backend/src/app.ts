import dotenv from 'dotenv'
dotenv.config()

import noteRoute from './routes/note.route'

import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan'
import createHttpError, { isHttpError } from 'http-errors'


const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use('/api/notes', noteRoute)
app.use((req, res, next) => {
    next(createHttpError('Endpoint not found'))
})
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error)
    let errorMessage = "An unknow error ocurred"
    let statusCode = 500
    if (isHttpError(error)) {
        statusCode = error.status
        errorMessage = error.message
    }
    res.status(statusCode).json({ error: errorMessage })
})

export default app