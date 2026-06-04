const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Fetching IDs...");
  const projects = await prisma.project.findMany({ select: { id: true, title: true } });
  
  for (const p of projects) {
    const full = await prisma.project.findUnique({ where: { id: p.id } });
    const imageSize = full.image ? full.image.length : 0;
    const screensSize = full.screenshots ? full.screenshots.length : 0;
    console.log(`- ${p.title}: Image=${(imageSize/1024).toFixed(1)}KB, Screenshots=${(screensSize/1024).toFixed(1)}KB`);
  }
}

main().finally(() => prisma.$disconnect());
