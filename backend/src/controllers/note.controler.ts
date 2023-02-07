import { NextFunction, Request, Response } from "express"
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