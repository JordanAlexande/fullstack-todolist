import { getNotes } from '../controllers/note.controler'
import app from '../app'
import express from 'express'

const routeNotes = express.Router()
routeNotes.get('/', getNotes)
export default routeNotes