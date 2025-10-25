const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function checkProjects() {
  const projects = await prisma.project.findMany({
    orderBy: { order: 'asc' }
  })
  
  console.log('\n📁 PROJECTS IN DATABASE:\n')
  
  projects.forEach((project, index) => {
    console.log(`\n${index + 1}. ${project.title}`)
    console.log(`   Tech: ${project.tags}`)
    console.log(`   GitHub: ${project.github}`)
    console.log(`   Demo: ${project.demo}`)
    console.log(`   ---`)
  })
  
  await prisma.$disconnect()
}

checkProjects()
