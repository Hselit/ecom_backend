import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const roles = ['USER', 'ADMIN', 'SUPERADMIN','SELLER'];

  for (const roleName of roles) {
    await prisma.role.upsert({
      where: { roleName },
      update: {}, // nothing to update, just prevent duplicates
      create: { roleName },
    });
    console.log(`✅ Role upserted: ${roleName}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
