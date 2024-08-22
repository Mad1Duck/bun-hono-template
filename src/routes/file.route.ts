
import { Hono } from 'hono';
import { upload, uploadThing } from '../controllers/storage/file.controller';

const app = new Hono();

app.post('/upload', uploadThing);

export default app;
