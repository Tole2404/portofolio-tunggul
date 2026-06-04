const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Connecting to database...");
  const projects = await prisma.project.findMany();
  console.log(`Found ${projects.length} projects.`);
  if (projects.length > 0) {
    console.log("First project:", projects[0].title);
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
