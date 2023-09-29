import { IncomingMessage } from 'http';

export async function getRequestData(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const data = [] as Buffer[];

      req.on('data', (chunk) => {
        data.push(chunk);
      });

      req.on('end', () => {
        resolve(data.toString());
      });
    } catch (error) {
        reject(error);
    }
  });
}
