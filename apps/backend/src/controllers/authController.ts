import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { db } from '../lib/db'
import { z } from 'zod'

// Validation schemas
const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
})

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

// Environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-change-in-production'
const SESSION_EXPIRY_DAYS = 7

// Helper function to generate session token
function generateSessionToken(): string {
  return jwt.sign({ timestamp: Date.now() }, JWT_SECRET, { expiresIn: `${SESSION_EXPIRY_DAYS}d` })
}

// Register endpoint
export const register = async (req: Request, res: Response) => {
  try {
    console.log('Register request received:', req.body)

    // Validate input
    const validatedData = registerSchema.parse(req.body)
    const { email, username, password, firstName, lastName } = validatedData

    // Check if user already exists
    const existingUser = await db.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    })

    if (existingUser) {
      return res.status(400).json({
        error: existingUser.email === email ? 'Email already exists' : 'Username already exists'
      })
    }

    // Hash password
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Create user
    const user = await db.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
      },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        firstName: true,
        lastName: true,
        avatar: true,
        role: true,
        isVerified: true,
        createdAt: true,
      }
    })

    // Create session
    const sessionToken = generateSessionToken()
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + SESSION_EXPIRY_DAYS)

    await db.session.create({
      data: {
        token: sessionToken,
        userId: user.id,
        expiresAt,
      }
    })

    console.log('User registered successfully:', user.id)

    res.status(201).json({
      user,
      token: sessionToken,
      expiresAt: expiresAt.toISOString(),
    })

  } catch (error) {
    console.error('Registration error:', error)
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Validation error',
        details: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      })
    }

    res.status(500).json({
      error: 'Internal server error'
    })
  }
}

// Login endpoint
export const login = async (req: Request, res: Response) => {
  try {
    console.log('Login request received for:', req.body.email)

    // Validate input
    const validatedData = loginSchema.parse(req.body)
    const { email, password } = validatedData

    // Find user by email
    const user = await db.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        username: true,
        password: true,
        name: true,
        firstName: true,
        lastName: true,
        avatar: true,
        role: true,
        isVerified: true,
        createdAt: true,
      }
    })

    if (!user) {
      return res.status(401).json({
        error: 'Invalid email or password'
      })
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return res.status(401).json({
        error: 'Invalid email or password'
      })
    }

    // Create new session (invalidate old ones first)
    await db.session.deleteMany({
      where: { userId: user.id }
    })

    const sessionToken = generateSessionToken()
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + SESSION_EXPIRY_DAYS)

    await db.session.create({
      data: {
        token: sessionToken,
        userId: user.id,
        expiresAt,
      }
    })

    console.log('User logged in successfully:', user.id)

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    res.json({
      user: userWithoutPassword,
      token: sessionToken,
      expiresAt: expiresAt.toISOString(),
    })

  } catch (error) {
    console.error('Login error:', error)
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Validation error',
        details: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      })
    }

    res.status(500).json({
      error: 'Internal server error'
    })
  }
}

// Logout endpoint
export const logout = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' })
    }

    // Delete session
    await db.session.delete({
      where: { token }
    })

    console.log('User logged out successfully')

    res.json({ message: 'Logged out successfully' })

  } catch (error) {
    console.error('Logout error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Get current user (verify session)
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' })
    }

    // Find valid session
    const session = await db.session.findUnique({
      where: { token },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            username: true,
            name: true,
            firstName: true,
            lastName: true,
            avatar: true,
            role: true,
            isVerified: true,
            createdAt: true,
          }
        }
      }
    })

    if (!session || session.expiresAt < new Date()) {
      // Clean up expired session
      if (session) {
        await db.session.delete({ where: { id: session.id } })
      }
      return res.status(401).json({ error: 'Invalid or expired token' })
    }

    res.json({ user: session.user })

  } catch (error) {
    console.error('Get current user error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}