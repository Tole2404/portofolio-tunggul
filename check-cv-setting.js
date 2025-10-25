const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function checkCV() {
  const cvSetting = await prisma.settings.findUnique({
    where: { key: 'hero_cv' }
  })
  
  console.log('📄 Current CV Setting:')
  console.log('Value:', cvSetting?.value || 'Not set')
  
  await prisma.$disconnect()
}

checkCV()
