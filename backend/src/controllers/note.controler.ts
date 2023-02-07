import { NextFunction, Request, RequestHandler, Response } from "express"
import createHttpError from "http-errors"
import mongoose, { mongo } from "mongoose"
import noteModel from "../models/note.model"

interface CreateNoteBody {
    title?: string,
    text?: string
}
export const getNotes: RequestHandler = async (req, res, next) => {
    try {
        // throw Error('Bazinga')

        const notes = await noteModel.find().exec()
        res.status(200).json(notes)
    } catch (error) {
        next(error)
    }
}

export const createNote: RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async (req, res, next) => {
    const title = req.body.title
    const text = req.body.text
    try {
        if (!title) {
            throw createHttpError(400, "Title not found")
        }
        const newNote = await noteModel.create({ title, text })
        res.status(201).json(newNote)
    } catch (err) {
        next(err)
    }
}

export const getNote: RequestHandler = async (req, res, next) => {
    const noteId = req.params.noteId
    try {
        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(404, 'Invalid ID for MongoDB')
        }

        const note = await noteModel.findById(noteId).exec()
        if (!note) {
            throw createHttpError(404, "Note not FOund")
        }
        res.status(200).json(note)
    } catch (err) {
        next(err)
    }
}

interface UpdateNoteParams {
    noteId: string
}
interface UpdateNoteBody {
    title: string,
    text: string
}
export const updateNote: RequestHandler<UpdateNoteParams, unknown, UpdateNoteBody, unknown> = async (req, res, next) => {
    const noteId = req.params.noteId
    const newTitle = req.body.title
    const newText = req.body.text
    console.log(noteId)
    try {
        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(404, 'Invalid ID for MongoDB')
        }
        if (!newTitle) {
            throw createHttpError(400, "Title not found")
        }
        const note = await noteModel.findById(noteId).exec()
        if (!note) {
            throw createHttpError(404, 'Note not Found')
        }
        note.title = newTitle
        note.text = newText

        const updateNote = await note.save()
        res.status(200).json(updateNote)
    } catch (error) {
        next(error)
    }
}