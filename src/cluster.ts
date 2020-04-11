import * as cluster from 'cluster';
import * as os from 'os';
import { Logger } from '@nestjs/common';

const numCPUs = os.cpus().length;

export class Cluster {
  static run(callback: () => {}): void {
    if (cluster.isMaster) {
      Logger.log(`Master server is running `);

      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }

      cluster.on('exit', (worker, code, signal) => {
        Logger.log(`worker ${worker.process.pid} died`);
      });
    } else {
      callback();
    }
  }
}
