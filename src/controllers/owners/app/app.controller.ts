import { createApp, findApps, updateApp } from "../../../services/app.service";
import { catchAsync } from "../../../utils/catchAsync";
import { appSchemaType } from "../../../utils/validator/app.validator";

// owner
export const createAppController = catchAsync(async (c) => {
  const { description, name }: appSchemaType = await c.req.parseBody();
  const { id: ownerId } = c.get("jwtPayload");
  const app = await createApp({ name, description, owner_id: ownerId });

  return c.json({ result: app });
});

export const updateAppController = catchAsync(async (c) => {
  const { description, name }: appSchemaType = await c.req.parseBody();
  const { id } = await c.req.param();
  const { id: ownerId } = c.get("jwtPayload");
  const app = await updateApp({ id, name, description, owner_id: ownerId });

  return c.json({ result: app });
});


export const getAppsController = catchAsync(async (c) => {
  const { id: ownerId } = c.get("jwtPayload");
  const apps = await findApps({ owner_id: ownerId });

  return c.json({ result: apps });
});

