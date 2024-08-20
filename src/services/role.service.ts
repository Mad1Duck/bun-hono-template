import { prisma } from "../bin/database";
import { RolesTypes } from "../types/db-schema/roles";

export const findRole = ({ id, name }: RolesTypes) => {
  return prisma.role.findFirst({
    where: {
      OR: [
        { id: id },
        { name: name },
      ],
    },
  });
};