import { InferSchemaType, Schema } from "mongoose";

const noteShema = new Schema({
    title: { type: String, require: true },
    text: { type: String }
}, { timestamps: true })

type Note = InferSchemaType<typeof noteShema>