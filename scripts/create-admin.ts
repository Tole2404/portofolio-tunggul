import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
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
        password: 'admin123', // Change this in production!
        name: 'Admin'
      }
    })

    console.log('✅ Admin user created successfully!')
    console.log('Email:', admin.email)
    console.log('Password: admin123')
    console.log('\n🔐 Login at: http://localhost:3000/admin/login')
  } catch (error) {
    console.error('❌ Error creating admin:', error)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
