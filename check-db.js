const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function checkDatabase() {
  console.log('\n📊 DATABASE OVERVIEW:\n')
  
  const users = await prisma.user.count()
  const projects = await prisma.project.count()
  const skills = await prisma.skill.count()
  const experience = await prisma.experience.count()
  const settings = await prisma.settings.count()
  
  console.log(`👤 Users: ${users}`)
  console.log(`📁 Projects: ${projects}`)
  console.log(`⭐ Skills: ${skills}`)
  console.log(`💼 Experience: ${experience}`)
  console.log(`⚙️  Settings: ${settings}`)
  
  console.log('\n📝 SAMPLE DATA:\n')
  
  const sampleProject = await prisma.project.findFirst()
  if (sampleProject) {
    console.log('First Project:', sampleProject.title)
  }
  
  const sampleSkill = await prisma.skill.findFirst()
  if (sampleSkill) {
    console.log('First Skill:', sampleSkill.name)
  }
  
  await prisma.$disconnect()
}

checkDatabase().catch(console.error)
