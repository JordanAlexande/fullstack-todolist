import { getNotes, createNote, getNote } from '../controllers/note.controler'
import express from 'express'

const route = express.Router()
route.get('/', getNotes)
route.get('/:noteId', getNote)
route.post('/', createNote)

export default route