import { Hono } from 'hono';

// owners
import auth from './auth.route';
import storage from './file.route';

const app = new Hono()
    // owners
    .route('/auth', auth)
    .route('/storage', storage);

export default app;
