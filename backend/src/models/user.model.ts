import { InferSchemaType, model, Schema } from "mongoose";

const userSchema = new Schema({
    username: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true }
})
type User = InferSchemaType<typeof userSchema>
export default model<User>("User", userSchema)