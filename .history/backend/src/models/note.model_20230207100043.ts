import { Schema } from "mongoose";

const note = new Schema({
    title: { type: String, require: true }
})