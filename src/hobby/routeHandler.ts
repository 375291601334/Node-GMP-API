import { IncomingMessage, ServerResponse } from 'http';
import { getRequestData } from '../utils';
import * as service from './service';

function getUserIdFromUrl(url: string): number {
  try {
    const queryParams = url.split('?')[1];
    const userQueryParam = new URLSearchParams(queryParams).get('user');

    const isUserQueryParamValid = /^\d+$/.test(userQueryParam || '');

    if (!isUserQueryParamValid) throw new Error("Can't parse user id");
    return Number(userQueryParam);
  } catch {
    throw new Error("Error during user id parsing");
  }
}

export function getHobbiesForUser(req: IncomingMessage, res: ServerResponse) {
  try {
    const userId = getUserIdFromUrl(req.url || '');

    try {
      const hobbies = service.getHobbies(userId);
      res.writeHead(200, { 'Cache-Control': 'public, max-age=3600;' });
      res.end(JSON.stringify(hobbies));
    } catch (e) {
      res.writeHead(404);
      res.end(JSON.stringify({ message: (e as Error).message }));
    }
  } catch (e) {
    res.writeHead(500);
    res.end(JSON.stringify({ message: (e as Error).message }));
  }
}

export async function postHobbyForUser(req: IncomingMessage, res: ServerResponse) {
  try {
    const userId = getUserIdFromUrl(req.url || '');

    const data = await getRequestData(req);
    const newHobby = JSON.parse(data);

    const hobby = service.addHobby(userId, newHobby);
    res.writeHead(201);
    res.end(JSON.stringify({ message: `Hobby ${newHobby} was added for user ${userId}` }));
  } catch (e) {
    res.writeHead(500);
    res.end(JSON.stringify({ message: (e as Error).message }));
  }
}

export async function deleteHobbyForUser(req: IncomingMessage, res: ServerResponse) {
  try {
    const userId = getUserIdFromUrl(req.url || '');

    const data = await getRequestData(req);
    const hobby = JSON.parse(data);

    try {
      service.deleteHobby(userId, hobby);
      res.writeHead(200);
      res.end(JSON.stringify({ message: `Hobby ${hobby} was deleted for user ${userId}` }));
    } catch (e) {
      res.writeHead(404);
      res.end(JSON.stringify({ message: (e as Error).message }));
    }
  } catch (e) {
    res.writeHead(500);
    res.end(JSON.stringify({ message: (e as Error).message }));
  }
}
