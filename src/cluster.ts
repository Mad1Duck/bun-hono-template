import cluster from 'node:cluster';
import { cpus } from 'node:os';

const cpusLength = Number(process.env.CPU_CORES) ?? cpus().length;

if (cluster.isPrimary) {
  for (let i = 0; i < cpusLength; i++) {
    cluster.fork();
  }
} else {
  import('@/index');
}