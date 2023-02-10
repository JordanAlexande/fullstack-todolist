import { Note as NoteModel } from "../models/note"
import { Card } from 'react-bootstrap'
import React from "react"
import styles from '../styles/Note.module.css'
import stylesUtils from '../styles/utils.module.css'
import { formatDate } from '../utils/formatDate'
import { MdDelete } from 'react-icons/md'

interface NoteProps {
    note: NoteModel,
    className?: string,
    onNoteClicked: (note: NoteModel) => void,
    onDeleteNoteClick: (note: NoteModel) => void
}

const Note = ({ note, className, onDeleteNoteClick, onNoteClicked }: NoteProps) => {
    const { title, text, updatedAt, createdAt } = note

    let createdUpdateText: string;
    if (updatedAt > createdAt) {
        createdUpdateText = "Udpdated: " + formatDate(updatedAt)
    } else {
        createdUpdateText = "Created: " + formatDate(createdAt)
    }
    return (
        <Card onClick={() => onNoteClicked(note)} className={`${styles.noteCard} ${className}`}>
            <Card.Body className={styles.cardBody}>
                <Card.Title className={`${stylesUtils.flexCenter}`}>
                    {title}
                    <MdDelete
                        onClick={(e) => {
                            onDeleteNoteClick(note)
                            e.stopPropagation()
                        }}
                        className="text-muted ms-auto" />
                </Card.Title>
                <Card.Text className={styles.cardText}>
                    {text}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted" style={{ margin: "0 0 auto 0" }}>
                {createdUpdateText}
            </Card.Footer>
        </Card>
    )
}

export default Note