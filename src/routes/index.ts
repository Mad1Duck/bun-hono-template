import { Hono } from 'hono';

// owners
import auth from '@/routes/auth.route';
import storage from '@/routes/file.route';

const app = new Hono()
    // owners
    .route('/auth', auth)
    .route('/storage', storage);

export default app;
