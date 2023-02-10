import mongoose from "mongoose";
import session from 'express-session';

export = session
declare module "express-session" {
    interface SessionData {
        idUser: mongoose.Types.ObjectId
    }

}