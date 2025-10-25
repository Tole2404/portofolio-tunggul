const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function updateCV() {
  // Use the existing CV file
  const cvPath = '/cv/CV_1761406319709_Tunggul_Bayu_Kusuma__CV_.pdf'
  
  await prisma.settings.upsert({
    where: { key: 'hero_cv' },
    update: { value: cvPath },
    create: { key: 'hero_cv', value: cvPath }
  })
  
  console.log('✅ CV link updated!')
  console.log('New CV URL:', cvPath)
  console.log('Full URL: https://portfolio-tunggul.vercel.app' + cvPath)
  
  await prisma.$disconnect()
}

updateCV()
