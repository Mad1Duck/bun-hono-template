import { PrismaClient } from '@prisma/client';
import { bcryptHash } from '../../src/utils/hashing';

const prisma = new PrismaClient();

export const seedUsers = async () => {

  const hashedPassword = await bcryptHash('password1');

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      username: 'admin',
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      password: hashedPassword,
    },
  });

  console.log({ adminUser });
};
