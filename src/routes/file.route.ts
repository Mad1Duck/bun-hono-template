
import { Hono } from 'hono';
import { upload } from '../controllers/storage/file.controller';

const app = new Hono();

app.post('/upload', upload);

export default app;
