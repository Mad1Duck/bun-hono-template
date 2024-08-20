import { prisma } from "../bin/database";
import { UserTypes } from "../types/db-schema/users";
import { transformPhoneNumber } from "../utils/formater";
import { bcryptHash } from "../utils/hashing";

export const getUsers = () => {
  return prisma.user.findMany({
    select: {
      id: true,
      createdAt: true,
      email: true,
      firstName: true,
      lastName: true,
      phone: true,
      birthDate: true,
      username: true,
    }
  });
};

export const getUser = async ({ email, phone }: { email: string, phone: string; }) => {
  return prisma.user.findFirst({
    where: {
      OR: [
        { email: { equals: email.toLowerCase() } },
        { phone: await transformPhoneNumber(phone) }
      ]
    },
    include: {
      roles: {
        select: {
          role: {
            select: {
              name: true
            }
          }
        }
      }
    }
  });
};

export const createUser = async (data: UserTypes) => {
  return prisma.$transaction(async (tx) => {

    const role = await tx.role.findFirst({
      where: {
        name: "USER"
      }
    });

    const user = await tx.user.create({
      data: {
        email: data.email!,
        firstName: data.firstName,
        lastName: data.lastName,
        password: await bcryptHash(data.password!),
        phone: await transformPhoneNumber(data.phone!),
        username: data.username!,
      }
    });

    await tx.trUserRole.create({
      data: {
        roleId: role?.id!,
        userId: user?.id
      }
    });


    return user;
  });
};

export const getUserById = async (data: UserTypes) => {
  return prisma.user.findFirst({
    where: {
      id: data.id!
    },
    include: {
      roles: {
        select: {
          role: {
            select: {
              name: true
            }
          }
        }
      }
    }
  });
};
