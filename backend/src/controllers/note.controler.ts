import { NextFunction, Request, RequestHandler, Response } from "express"
import noteModel from "../models/note.model"

export const getNotes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // throw Error('Bazinga')
        const notes = await noteModel.find().exec()
        res.status(200).json(notes)
    } catch (error) {
        next(error)
    }
}

export const createNote: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const title = req.body.title
    const text = req.body.text
    try {
        const newNote = await noteModel.create({ title, text })
        res.status(201).json(newNote)
    } catch (err) {
        next(err)
    }
}