import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serveStatic } from 'hono/bun';
import { logger } from 'hono/logger';
import { timeout } from 'hono/timeout';
import { jwt } from 'hono/jwt';
import type { JwtVariables } from 'hono/jwt';
import routes from './routes';
import { errorHandler } from '@/middleware/error.middleware';
import { join } from 'path';

type Variables = JwtVariables;

const app = new Hono<{ Variables: Variables; }>()

  // Middleware
  .use(logger())
  .use('/api', timeout(5000))
  .use(
    '/api/*',
    cors({
      origin: 'localhost',
      allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests'],
      allowMethods: ['POST', 'GET', 'OPTIONS'],
      exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
      maxAge: 600,
      credentials: true,
    })
  )
  .use(
    '/auth/*',
    jwt({
      secret: 'it-is-very-secret',
      alg: 'HS256',
    })
  )
  .use('/public/*', async (c) => {
    const publicPath = join(process.cwd(), 'public');

    const filePath = join(publicPath, c.req.path.replace('/public/', ''));
    const file = Bun.file(filePath);
    return new Response(file);
  })

  .use('/file-data/*', serveStatic({
    root: './public',
    rewriteRequestPath: (path) => {

      const filePath = path.replace('/file-data/', '');

      console.log(filePath);

      return filePath;
    }
  }))

  .route('/api', routes) // Ensure routes are correct and match

  .onError(errorHandler);

export default {
  port: process.env.PORT || 8080,
  fetch: app.fetch,
};

export type AppType = typeof app;