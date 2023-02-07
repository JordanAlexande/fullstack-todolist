import { getNotes, createNote, getNote, updateNote } from '../controllers/note.controler'
import express from 'express'

const route = express.Router()
route.get('/', getNotes)
route.get('/:noteId', getNote)
route.post('/', createNote)
route.patch('/:noteId', updateNote)

export default route