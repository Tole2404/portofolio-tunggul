const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const seedData = require('./seed-data.json')

async function updateProjects() {
  console.log('🔄 Updating projects with new fields...\n')

  try {
    // Delete all existing projects
    await prisma.project.deleteMany({})
    console.log('✅ Deleted old projects\n')

    // Insert projects with all fields
    for (const project of seedData.projects) {
      await prisma.project.create({
        data: {
          title: project.title,
          description: project.description,
          image: project.image,
          tags: JSON.stringify(project.tags),
          github: project.github,
          demo: project.demo,
          gradient: project.gradient,
          featured: project.featured || false,
          order: project.order || 0,
          fullDescription: project.fullDescription || null,
          features: project.features ? JSON.stringify(project.features) : null,
          screenshots: project.screenshots ? JSON.stringify(project.screenshots) : null,
          challenges: project.challenges || null,
          solutions: project.solutions || null,
          role: project.role || null,
          timeline: project.timeline || null,
          teamSize: project.teamSize || null
        }
      })
      console.log(`  ✅ ${project.title}`)
    }

    console.log(`\n✅ Projects updated: ${seedData.projects.length} items`)
    console.log('\n🎉 Update completed successfully!')
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

updateProjects()
