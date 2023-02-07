import { getNotes, createNote } from '../controllers/note.controler'
import express from 'express'

const route = express.Router()
route.get('/', getNotes)
route.post('/', createNote)

export default route