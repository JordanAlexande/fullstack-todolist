import express from 'express'
import { getAuthenticatedUser, signUp as UserController } from '../controllers/user.controller'
import { login } from '../controllers/user.controller'
import { logout } from '../controllers/user.controller'

const route = express.Router()


route.get('/', getAuthenticatedUser)
route.post('/signup', UserController)
route.get('/', (req, res) => {
    res.send('Hello From user')
})
route.post('/login', login)
route.post('/logout', logout)

export default route