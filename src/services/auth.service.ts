import { prisma } from "../bin/database";
import { UserTypes } from "../types/db-schema/users";
import { transformPhoneNumber } from "../utils/formater";
import { bcryptHash } from "../utils/hashing";

export const getUsers = () => {
  return prisma.app_Users.findMany({
    select: {
      id: true,
      created_at: true,
      email: true,
      first_name: true,
      last_name: true,
      phone: true,
      birth_date: true,
      role_id: true,
      username: true,
    }
  });
};

export const getUser = async ({ email, phone }: { email: string, phone: string; }) => {
  return prisma.app_Users.findFirst({
    where: {
      OR: [
        { email: { equals: email.toLowerCase() } },
        { phone: await transformPhoneNumber(phone) }
      ]
    },
    include: {
      roles: {
        select: {
          name: true
        }
      },
    }
  });
};

export const createUser = async (data: UserTypes) => {
  return prisma.app_Users.create({
    data: {
      email: data.email!,
      first_name: data.first_name,
      last_name: data.last_name,
      password: await bcryptHash(data.password!),
      phone: await transformPhoneNumber(data.phone!),
      username: data.username!,
      role_id: data.role_id!
    }
  });
};

export const getUserById = async (data: UserTypes) => {
  return prisma.app_Users.findFirst({
    where: {
      id: data.id!
    }
  });
};
