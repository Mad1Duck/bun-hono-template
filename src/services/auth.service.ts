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
  return prisma.user.create({
    data: {
      email: data.email!,
      firstName: data.first_name,
      lastName: data.last_name,
      password: await bcryptHash(data.password!),
      phone: await transformPhoneNumber(data.phone!),
      username: data.username!,
    }
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
