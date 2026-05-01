import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Build roleName -> roleId map
  const roleMap = (await prisma.role.findMany()).reduce(
    (acc: { [x: string]: any; }, role: { roleName: string | number; id: any; }) => {
      acc[role.roleName] = role.id;
      return acc;
    },
    {} as Record<string, number>
  );

  const users = [
    {
      name: 'Normal User',
      phoneNumber: '9000000001',
      password: 'password123',
      profile: 'basic',
      gender: 'Male',
      roleName: 'USER',
      isActive: true,
    },
    {
      name: 'Admin User',
      phoneNumber: '9000000002',
      password: 'admin123',
      profile: 'admin',
      gender: 'Male',
      roleName: 'ADMIN',
      isActive: true,
    },
    {
      name: 'Super Admin',
      phoneNumber: '9000000003',
      password: 'superadmin123',
      profile: 'superadmin',
      gender: 'Male',
      roleName: 'SUPERADMIN',
      isActive: true,
    },
    {
      name: 'System Administrator',
      phoneNumber: '0000000000',
      password: 'root',
      profile: 'profile',
      gender: 'Male',
      roleName: 'SUPERADMIN',
      isActive: true,
    },
  ];

  for (const user of users) {
    const roleId = roleMap[user.roleName];

    if (!roleId) {
      console.warn(`⚠️ Role not found for user ${user.name}`);
      continue;
    }

    await prisma.user.upsert({
      where: { phoneNumber: user.phoneNumber },
      update: {
        name: user.name,
        password: user.password,
        profile: user.profile,
        gender: user.gender,
        isActive: user.isActive,
        roleId,
      },
      create: {
        name: user.name,
        phoneNumber: user.phoneNumber,
        password: user.password,
        profile: user.profile,
        gender: user.gender,
        isActive: user.isActive,
        roleId,
      },
    });

    console.log(`✅ User upserted: ${user.name}`);
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
