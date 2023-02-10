import React, { useEffect, useState } from 'react';
import { Note as NoteModel } from './models/note';
import Note from './components/Note';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import styles from './styles/NotePage.module.css'
import stylesUtils from './styles/utils.module.css'

import { deleteNote, fechNotes } from './network/notes_api';
import AddNoteDialog from './components/AddNoteDialog';

const App = () => {
  const [notes, setNotes] = useState<NoteModel[]>([])
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false)
  const [noteToEdit, setnoteToEdit] = useState<NoteModel | null>(null)
  const [notesLoading, setNotesLoading] = useState(true)
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false)

  useEffect(() => {
    async function loadData() {
      try {
        setShowNotesLoadingError(false)
        setNotesLoading(true)
        const notes = await fechNotes()
        // console.log(notes)
        setNotes(notes)
      } catch (err) {
        alert('Error')
        console.error(err)
      } finally {
        setNotesLoading(false)
      }
    }
    loadData()
  }, [])

  async function deleteNotes(note: NoteModel) {
    try {
      await deleteNote(note._id)
      setNotes(notes.filter(existingNotes => existingNotes._id !== note._id))
    } catch (err) {
      console.error(err)
      setShowNotesLoadingError(true)
    }
  }
  const noteGrid = <Row xs={1} md={2} xl={3} className={`g-4 ${styles.noteGrid}`}>
    {notes.map((note) => (
      <Col key={note._id} >
        <Note
          note={note}
          className={styles.note}
          onNoteClicked={setnoteToEdit}
          onDeleteNoteClick={deleteNotes}
        />
      </Col>
    ))}
  </Row>
  return (
    <Container className={`${styles.NotesPage}`}>
      <Button
        className={`mb-4 ${stylesUtils.blockCenter}`}
        onClick={() => setShowAddNoteDialog(true)}>Add Note</Button>

      {notesLoading &&
        <Spinner animation='border' variant='primary' />
      }
      {showNotesLoadingError && <p>Something was wrong, Refresh The page</p>}
      {!notesLoading && !showNotesLoadingError &&
        <>
          {
            notes.length > 0
              ? noteGrid
              : <p>You dont notes</p>
          }
        </>
      }
      {showAddNoteDialog &&
        <AddNoteDialog
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote])
            setShowAddNoteDialog(false)
          }}
        />
      }
      {noteToEdit &&
        <AddNoteDialog
          noteToEdit={noteToEdit}
          onDismiss={() => setnoteToEdit(null)}
          onNoteSaved={(updateNote) => {
            setNotes(notes.map(existingNote => existingNote._id === updateNote._id ? updateNote : existingNote))
            setnoteToEdit(null)
          }}

        />
      }
    </Container>
  );
}

export default App;
