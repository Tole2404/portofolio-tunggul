import { prisma } from './prisma'

export async function verifyPassword(email: string, password: string) {
  try {
    console.log('Verifying password for:', email)
    
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      console.log('User not found:', email)
      return null
    }

    console.log('User found, checking password...')

    // Simple password check (in production, use bcrypt)
    if (user.password === password) {
      console.log('Password match!')
      return { id: user.id, email: user.email, name: user.name }
    }

    console.log('Password mismatch')
    return null
  } catch (error) {
    console.error('Error in verifyPassword:', error)
    throw error
  }
}

export async function createUser(email: string, password: string, name: string) {
  return await prisma.user.create({
    data: {
      email,
      password, // In production, hash this with bcrypt
      name
    }
  })
}
