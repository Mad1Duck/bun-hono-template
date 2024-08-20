import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const seedTrRoles = async () => {

  const adminRole = await prisma.role.findUnique({
    where: { name: 'ADMINISTRATOR' },
  });

  const user = await prisma.user.findFirst({
    where: {
      username: 'admin'
    }
  });

  if (!adminRole) {
    throw new Error('Administrator role not found');
  }

  if (!user) {
    throw new Error('user not found');
  }

  await prisma.trUserRole.create({
    data: {
      roleId: adminRole.id,
      userId: user?.id
    },
  });
};
