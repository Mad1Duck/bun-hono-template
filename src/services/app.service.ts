import { prisma } from "../bin/database";
import { AppsTypes } from "../types/db-schema/apps";
import { generateAppKey } from "../utils/appKey";

export const createApp = (data: AppsTypes) => {
  return prisma.apps.create({
    data: {
      name: data.name?.toUpperCase()!,
      description: data.description,
      owner_id: data.owner_id!,
      app_key: generateAppKey(),
    }
  });
};

export const updateApp = (data: AppsTypes) => {
  return prisma.apps.update({
    where: {
      id: data?.id!,
      owner_id: data?.owner_id
    },
    data: {
      name: data.name?.toUpperCase()!,
      description: data.description,
    }
  });
};


export const getApps = () => {
  return prisma.apps.findMany();
};

export const findApps = ({ id, name, owner_id }: AppsTypes) => {
  return prisma.apps.findMany({
    where: {
      OR: [
        { id },
        { name: { equals: name?.toUpperCase() } },
        { owner_id }
      ]
    },
  });
};