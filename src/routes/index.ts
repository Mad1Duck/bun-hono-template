import { Hono } from 'hono';

// owners
import auth from './auth.route';

const app = new Hono();

// owners
app.route('/auth', auth);

export default app;
