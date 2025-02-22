import { Context, Next } from "hono";
import { HTTPException } from "hono/http-exception";
import { errorConverter } from "@/middleware/error.middleware";
import ApiError from "@/utils/ApiError";

export const catchAsync = <T>(fn: (c: Context, next: Next) => T) => async (c: Context, next: Next) => {
  try {
    const result = await fn(c, next) as T;
    return result as T extends Promise<infer U> ? U : T;
  } catch (error: any) {
    if (error instanceof ApiError) {
      const { response, statusCode } = await errorConverter({ message: error.message, statusCode: error.statusCode });
      throw new HTTPException(statusCode, { message: response.message });
    } else {
      const { response, statusCode } = await errorConverter(error);
      throw new HTTPException(statusCode, { message: response.message });
    }
  }
};