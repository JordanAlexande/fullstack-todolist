import { getNotes } from '../controllers/note.controler'
import express from 'express'

const routeNotes = express.Router()
routeNotes.get('/', getNotes)
export default routeNotes