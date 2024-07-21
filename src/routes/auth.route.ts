
import { Hono } from 'hono';
import { validate } from '../middleware/zod.middleware';
import { loginSchema, registerSchema } from '../utils/validator/auth.validator';
import { login, register } from '../controllers/owners/auth/auth.controller';

const app = new Hono();

app.post('/owner/login', validate(loginSchema), login);
app.post('/owner/register', validate(registerSchema), register);

export default app;
