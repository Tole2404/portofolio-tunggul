const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Restoring image for Bob Marley...");
  
  await prisma.project.updateMany({
    where: { title: { contains: "Bob Marley" } },
    data: { image: "/images/projects/bob-marley-tribute.jpg" }
  });
  
  console.log("Done!");
}

main().finally(() => prisma.$disconnect());
