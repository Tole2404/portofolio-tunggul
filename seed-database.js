const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...\n')

  // Read JSON file
  const dataPath = path.join(__dirname, 'seed-data.json')
  const rawData = fs.readFileSync(dataPath, 'utf-8')
  const data = JSON.parse(rawData)

  try {
    // 1. Seed Settings
    console.log('📝 Seeding Settings...')
    for (const [key, value] of Object.entries(data.settings)) {
      await prisma.settings.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) }
      })
      console.log(`  ✅ ${key}: ${value}`)
    }
    console.log(`✅ Settings seeded: ${Object.keys(data.settings).length} items\n`)

    // 2. Seed Skills
    console.log('🎯 Seeding Skills...')
    // Delete existing skills
    await prisma.skill.deleteMany({})
    
    for (const skill of data.skills) {
      await prisma.skill.create({
        data: skill
      })
      console.log(`  ✅ ${skill.name} (${skill.category}) - ${skill.level}%`)
    }
    console.log(`✅ Skills seeded: ${data.skills.length} items\n`)

    // 3. Seed Projects
    console.log('🚀 Seeding Projects...')
    // Delete existing projects
    await prisma.project.deleteMany({})
    
    for (const project of data.projects) {
      await prisma.project.create({
        data: {
          ...project,
          tags: JSON.stringify(project.tags),
          features: project.features ? JSON.stringify(project.features) : null,
          screenshots: project.screenshots ? JSON.stringify(project.screenshots) : null
        }
      })
      console.log(`  ✅ ${project.title}`)
    }
    console.log(`✅ Projects seeded: ${data.projects.length} items\n`)

    // 4. Seed Experience
    console.log('💼 Seeding Experience...')
    // Delete existing experience
    await prisma.experience.deleteMany({})
    
    for (const exp of data.experience) {
      await prisma.experience.create({
        data: {
          ...exp,
          tags: JSON.stringify(exp.tags)
        }
      })
      console.log(`  ✅ ${exp.title} at ${exp.company}`)
    }
    console.log(`✅ Experience seeded: ${data.experience.length} items\n`)

    console.log('🎉 Database seeding completed successfully!')
    console.log('\n📊 Summary:')
    console.log(`  - Settings: ${Object.keys(data.settings).length}`)
    console.log(`  - Skills: ${data.skills.length}`)
    console.log(`  - Projects: ${data.projects.length}`)
    console.log(`  - Experience: ${data.experience.length}`)
    console.log('\n✨ You can now view your portfolio at http://localhost:3000')

  } catch (error) {
    console.error('❌ Error seeding database:', error)
    throw error
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
