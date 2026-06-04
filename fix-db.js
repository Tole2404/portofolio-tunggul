const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Fixing large images...");
  const projects = await prisma.project.findMany({ select: { id: true, title: true } });
  
  for (const p of projects) {
    if (p.title.includes("Pergimmikan") || p.title.includes("Bob Marley")) {
      await prisma.project.update({
        where: { id: p.id },
        data: { image: "" }
      });
      console.log(`Cleared image for ${p.title}`);
    }
  }
}

main().finally(() => prisma.$disconnect());
