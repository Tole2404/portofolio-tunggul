const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function testLogin() {
  try {
    console.log('Testing login...\n')
    
    const email = 'admin@portfolio.com'
    const password = 'admin123'
    
    console.log('Looking for user:', email)
    const user = await prisma.user.findUnique({
      where: { email }
    })
    
    if (!user) {
      console.log('❌ User not found!')
      return
    }
    
    console.log('✅ User found!')
    console.log('Email:', user.email)
    console.log('Password in DB:', user.password)
    console.log('Password to check:', password)
    
    if (user.password === password) {
      console.log('\n✅ PASSWORD MATCH! Login should work!')
    } else {
      console.log('\n❌ PASSWORD MISMATCH!')
      console.log('Expected:', password)
      console.log('Got:', user.password)
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

testLogin()
