import { prisma } from "../bin/database";
import { RoleTypes } from "../types/db-schema/roles";

export const findRole = ({ id, name }: RoleTypes) => {
  return prisma.role.findFirst({
    where: {
      OR: [
        { id: id },
        { name: name },
      ],
    },
  });
};