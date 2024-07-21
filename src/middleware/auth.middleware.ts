import { jwt } from "hono/jwt";
import { catchAsync } from "../utils/catchAsync";
import { getUserById } from "../services/auth.service";
import { isEmpty } from "lodash";
import ApiError from "../utils/ApiError";
import * as HttpStatus from "http-status";

export const authentication = jwt({ secret: process.env.JWT_SECRET || 'default', });

export const authenticationStoreOwner = catchAsync(async (c, next) => {
  const { id } = c.get("jwtPayload");
  return await next();
});

export const authenticationAppOwner = catchAsync(async (c, next) => {
  const { id } = c.get("jwtPayload");
  const findUser = await getUserById({ id });

  if (!isEmpty(findUser) && findUser.roles.name === "APP_OWNER") {
    return await next();
  } else {
    throw new ApiError(HttpStatus.UNAUTHORIZED, { message: "unauthorize" });
  }
});

export const authenticationAdministrator = catchAsync(async (c, next) => {
  const { id } = c.get("jwtPayload");
  const findUser = await getUserById({ id });

  if (!isEmpty(findUser) && findUser.roles.name === "ADMINISTRATOR") {
    return await next();
  } else {
    throw new ApiError(HttpStatus.UNAUTHORIZED, { message: "unauthorize" });
  }
});
