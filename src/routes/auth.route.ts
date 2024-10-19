
import { Hono } from 'hono';
import { validate } from '../middleware/zod.middleware';
import { loginSchema, registerSchema } from '../utils/validator/auth.validator';
import { login, register } from '../controllers/auth/auth.controller';

const app = new Hono()
    .post('/login', validate(loginSchema), login)
    .post('/register', validate(registerSchema), register);

export default app;
