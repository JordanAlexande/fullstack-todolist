import { getNotes, createNote, getNote, updateNote, deleteNote } from '../controllers/note.controler'
import express from 'express'

const route = express.Router()
route.get('/', getNotes)
route.get('/:noteId', getNote)
route.post('/', createNote)
route.patch('/:noteId', updateNote)
route.delete('/:noteId', deleteNote)

export default route