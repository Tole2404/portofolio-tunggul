const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function createAdmin() {
  try {
    console.log('🔐 Creating admin user...\n')
    
    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@portfolio.com' }
    })
    
    if (existingAdmin) {
      console.log('✅ Admin user already exists!')
      console.log('Email:', existingAdmin.email)
      console.log('Name:', existingAdmin.name)
      return
    }
    
    // Create admin user
    const admin = await prisma.user.create({
      data: {
        email: 'admin@portfolio.com',
        password: 'admin123', // Plain text for simplicity
        name: 'Admin'
      }
    })
    
    console.log('✅ Admin user created successfully!')
    console.log('\n📋 Login Credentials:')
    console.log('Email:', admin.email)
    console.log('Password: admin123')
    console.log('Name:', admin.name)
    console.log('\n🔗 Login URL: https://portfolio-tunggul.vercel.app/admin/login')
    
  } catch (error) {
    console.error('❌ Error creating admin:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

createAdmin()
