import dotenv from 'dotenv'
dotenv.config()

import noteRoute from './routes/note.route'
import userRoute from './routes/user.route'

import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan'
import createHttpError, { isHttpError } from 'http-errors'
import session from 'express-session'
import env from './utils/validateEnv'
import MongoStore from 'connect-mongo'

const app = express()

app.use(morgan('dev'))
app.use(express.json())

app.use(session({
    secret: env.SESSION_SECRECT,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: env.MONGO_CONECTION_STRING
    })
}))

app.use('/api/notes', noteRoute)
app.use('/api/users', userRoute)

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