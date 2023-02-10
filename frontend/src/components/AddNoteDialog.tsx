import { title } from 'process'
import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { Note } from '../models/note'
import { NoteInput, createNote, updateNote } from '../network/notes_api'

interface OnDismiss {
    noteToEdit?: Note
    onDismiss: () => void
    onNoteSaved: (note: Note) => void

}

const AddNoteDialog = ({ noteToEdit, onDismiss, onNoteSaved }: OnDismiss) => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<NoteInput>({
        defaultValues: {
            title: "",
            text: ""
        }
    })
    async function onSubmit(input: NoteInput) {
        try {
            let noteReponse: Note
            if (noteToEdit) {
                noteReponse = await updateNote(noteToEdit._id, input)
            } else {
                noteReponse = await createNote(input)
            }
            onNoteSaved(noteReponse)
        } catch (error) {
            console.error(error)
            alert(error)
        }
    }
    console.log(errors.title)
    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {noteToEdit ? "Edit note" : "Add note "}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id='addNoteForm' onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className='mb-3'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder='Title'
                            isInvalid={!!errors.title}
                            {...register('title', { required: "Required" })}
                        />
                        <Form.Control.Feedback type='invalid'>
                            Requires
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label>Text</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            placeholder="Text"
                            {...register('text')}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button type='submit' form='addNoteForm' disabled={isSubmitting}>Save</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddNoteDialog