import { Router } from 'express'
import { register, login, logout, getCurrentUser } from '../controllers/authController'

const router = Router()

// Auth routes
router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/me', getCurrentUser)

export default router