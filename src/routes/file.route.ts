
import { Hono } from 'hono';
import { uploadThing } from '@/controllers/storage/file.controller';

const app = new Hono()
    .post('/upload', uploadThing);

export default app;
