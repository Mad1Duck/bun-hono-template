import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { timeout } from 'hono/timeout';
import { jwt } from 'hono/jwt';
import type { JwtVariables } from 'hono/jwt';

type Variables = JwtVariables;
// local import
import routes from "./routes";
import { HTTPException } from 'hono/http-exception';
import { errorHandler } from './middleware/error.middleware';

const app = new Hono<{ Variables: Variables; }>();

// middleware
app.use(logger());
app.use('/api', timeout(5000));
app.use(
  '/api/*',
  cors({
    origin: 'localhost',
    allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
    maxAge: 600,
    credentials: true,
  })
);
app.use(
  '/auth/*',
  jwt({
    secret: 'it-is-very-secret',
    alg: 'HS256',
  })
);



app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.route('/api/', routes);

app.onError(errorHandler);

export default {
  port: 8080,
  fetch: app.fetch,
};
