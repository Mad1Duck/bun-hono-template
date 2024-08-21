import { Hono } from 'hono';

// owners
import auth from './auth.route';
import storage from './file.route';

const app = new Hono();

// owners
app.route('/auth', auth);
app.route('/storage', storage);

export default app;
