import { createUser, getUser } from "../../services/auth.service";
import { catchAsync } from "../../utils/catchAsync";
import { loginSchemaType, registerSchemaType } from "../../utils/validator/auth.validator";
import { isEmpty } from "lodash";
import { bcryptVerify } from "../../utils/hashing";
import ApiError from "../../utils/ApiError";
import * as HttpStatus from "http-status";
import { generateToken } from "../../utils/jwt";

// owner
export const register = catchAsync(async (c) => {
  const { email, firstName, lastName, password, phone, username }: registerSchemaType = await c.req.parseBody();

  const result = await createUser({
    email, firstName: firstName, lastName: lastName, password, phone, username: username
  });
  return c.json({ data: result });
});

export const login = catchAsync(async (c) => {
  const { password, username }: loginSchemaType = await c.req.parseBody();

  const findUser = await getUser({ email: username, phone: username });

  if (isEmpty(findUser)) {
    throw new ApiError(HttpStatus.UNAUTHORIZED, { message: "unauthorize" });
  } else {
    const verifiedPassword = await bcryptVerify(password, findUser.password);
    if (verifiedPassword) {
      const { id, email, firstName, lastName, roles } = findUser;
      const token = await generateToken({ email, id });
      return c.json({ data: { firstName, lastName, email, roles, authoritation: { token: token } } });
    }
    throw new ApiError(HttpStatus.UNAUTHORIZED, { message: "unauthorize" });
  }
});
