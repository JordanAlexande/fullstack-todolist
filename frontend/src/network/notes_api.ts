import { Primitive } from "react-hook-form";
import { Note } from "../models/note";
import { User } from "../models/user";

async function fecthData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init)
    if (response.ok) {
        return response
    } else {
        const errorBody = await response.json()
        const errorMessage = errorBody.error
        throw Error(errorMessage)
    }
}

export async function getLoggedInUser(): Promise<User> {
    const response = await fecthData("/api/users", { method: "GET" })
    return response.json()
}

export interface SignUpCredentials {
    username: string,
    email: string,
    password: string
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
    const response = await fecthData('/api/users/signup', { method: "POST", headers: { "Content-Type": "aplication/json" }, body: JSON.stringify(credentials) })
    return response.json()

}

export interface LoginCredentials {
    username: string,
    password: string
}

export async function login(credentials: LoginCredentials): Promise<User> {
    const response = await fecthData('/api/users/login', { method: "POST", headers: { "Content-Type": "aplication/json" }, body: JSON.stringify(credentials) })
    return response.json()
}

export async function logout(): Promise<User> {
    const response = await fecthData('/api/users/logout', { method: "POST" })
    return response.json()
}

export async function fechNotes(): Promise<Note[]> {
    const response = await fecthData("/api/notes", { method: "GET" })
    return response.json()
}
export interface NoteInput {
    title: string
    text: string
}

export async function createNote(note: NoteInput): Promise<Note> {
    const response = await fecthData('/api/notes', {
        method: "POST", headers: {
            "Content-Type": "application/json",
        }, body: JSON.stringify(note)
    })
    return response.json()
}
export async function deleteNote(noteId: string) {
    await fecthData("/api/notes/" + noteId, { method: "DELETE" });
}

export async function updateNote(noteId: string, note: NoteInput): Promise<Note> {
    const response = await fecthData("/api/notes/" + noteId, {
        method: "PATCH", headers: { "Content-Type": "application/json", }, body: JSON.stringify(note)
    })
    return response.json()
}