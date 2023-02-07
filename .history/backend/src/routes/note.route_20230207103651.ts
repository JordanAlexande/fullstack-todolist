import { getNotes } from '../controllers/note.controler'
import app from '../app'
app.get('/', getNotes)