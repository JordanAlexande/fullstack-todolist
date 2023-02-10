import { RequestHandler } from "express";
import createHttpError from "http-errors";
import userModel from "../models/user.model";
import bcrypt from 'bcrypt'

interface SignUoBody {
    username?: string,
    email?: string,
    password?: string
}

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
    const authenticatedUserId = req.session.idUser

    try {
        if (!authenticatedUserId) {
            throw createHttpError(401, "User not authenticated ")
        }
        const user = await userModel.findById(authenticatedUserId).select('+email -password').exec()
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

export const signUp: RequestHandler<unknown, unknown, SignUoBody, unknown> = async (req, res, next) => {
    const { email, password, username } = req.body

    try {
        if (!username || !email || !password) {
            throw createHttpError(400, "Params missing")
        }
        const existingUserName = await userModel.findOne({ username: username }).exec()

        if (existingUserName) {
            throw createHttpError(409, "UserName already taken. Please choose another oné")
        }

        const existingEmail = await userModel.findOne({ email: email }).exec()

        if (existingEmail) {
            throw createHttpError(409, "UserName already taken. Please choose another oné")
        }

        const passwordHashed = await bcrypt.hash(password, 10)

        const newUser = await userModel.create({
            username: username,
            email: email,
            password: passwordHashed
        })

        req.session.idUser = newUser._id
        res.status(201).json(newUser)
    } catch (error) {
        next(error)
    }
}

interface LoginBody {
    username?: string,
    password?: string
}
export const login: RequestHandler<unknown, unknown, LoginBody, unknown> = async (req, res, next) => {
    const { username, password } = req.body

    try {
        if (!username || !password) {
            throw createHttpError(400, "Parameters are required")
        }
        const user = await userModel.findOne({ username: username }).select("+password +email").exec()

        if (!user) {
            throw createHttpError(401, "Invalid Credencials")
        }
        const passwordMath = await bcrypt.compare(password, user.password as string)

        if (!passwordMath) {
            throw createHttpError(401, "Invalid Credencials")
        }

        req.session.idUser = user._id
        res.status(201).json(user)

    } catch (error) {
        next(error)
    }
}

export const logout: RequestHandler = (req, res, next) => {
    req.session.destroy(error => {
        if (error) {
            next(error)
        } else {
            res.sendStatus(200)
        }
    })
}