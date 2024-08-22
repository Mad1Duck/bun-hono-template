import { Worker } from 'bullmq';
import { redisConfig } from '../bin/config';
import { sendEmail } from '../services/email.service';

export const emailWorker = new Worker('email-queue', async (job) => {
  const { to, ...data } = job.data;

  try {
    await sendEmail(job.name, to, data);
    console.log(`Email ${job.name} successfully sent to ${to}`);
  } catch (error) {
    console.error(`Failed to send email ${job.name} to ${to}:`, error);
  }
}, {
  connection: redisConfig,
});