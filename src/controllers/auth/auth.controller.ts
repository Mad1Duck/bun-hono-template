import { createUser, getUser } from "../../services/auth.service";
import { catchAsync } from "../../utils/catchAsync";
import { loginSchemaType, registerSchemaType } from "../../utils/validator/auth.validator";
import { isEmpty } from "lodash";
import { bcryptVerify } from "../../utils/hashing";
import ApiError from "../../utils/ApiError";
import * as HttpStatus from "http-status";
import { generateToken } from "../../utils/jwt";
import { findRole } from "../../services/role.service";

// owner
export const register = catchAsync(async (c) => {
  const { email, firstName, lastName, password, phone, username }: registerSchemaType = await c.req.parseBody();
  const role = await findRole({ name: "APP_OWNER" });

  const result = await createUser({
    email, first_name: firstName, last_name: lastName, password, phone, role_id: role?.id, username: username
  });
  return c.json({ result });
});

export const login = catchAsync(async (c) => {
  const { password, username }: loginSchemaType = await c.req.parseBody();

  const findUser = await getUser({ email: username, phone: username });

  if (isEmpty(findUser)) {
    throw new ApiError(HttpStatus.UNAUTHORIZED, { message: "unauthorize" });
  } else {
    const verifiedPassword = await bcryptVerify(password, findUser.password);
    if (verifiedPassword) {
      const { id, email, first_name, last_name, roles } = findUser;
      const token = await generateToken({ email, id });
      return c.json({ first_name, last_name, email, roles, authoritation: { token: token } });
    }
    throw new ApiError(HttpStatus.UNAUTHORIZED, { message: "unauthorize" });
  }
});

// customer

// operator
