
import { IncomingMessage, ServerResponse } from 'http';
import { getRequestData } from '../utils';
import * as service from './service';

function getUserIdFromUrl(url: string) {
  try {
    const userId = +url.split('/')[2];

    if (isNaN(userId)) throw new Error("Can't parse user id");
    return userId;
  } catch {
    throw new Error("Error during user id parsing");
  }
}

export function getUsers(req: IncomingMessage, res: ServerResponse) {
  try {
    const users = service.getAllUsers();
    res.writeHead(200);
    res.end(JSON.stringify(users));
  } catch (e) {
    res.writeHead(500);
    res.end(JSON.stringify({ message: (e as Error).message }));
  }
}

export function getUser(req: IncomingMessage, res: ServerResponse) {
  try {
    const userId = getUserIdFromUrl(req.url || '');

    try {
      const user = service.getUser(userId);
      res.writeHead(200);
      res.end(JSON.stringify(user));
    } catch (e) {
      res.writeHead(404);
      res.end(JSON.stringify({ message: (e as Error).message }));
    }
  } catch (e) {
    res.writeHead(500);
    res.end(JSON.stringify({ message: (e as Error).message }));
  }
}

export async function postUsers(req: IncomingMessage, res: ServerResponse) {
  try {
    const data = await getRequestData(req);
    const newUser = JSON.parse(data);

    const user = service.addUser(newUser);
    res.writeHead(201);
    res.end(JSON.stringify(user));
  } catch (e) {
    res.writeHead(500);
    res.end(JSON.stringify({ message: (e as Error).message }));
  }
}

export function deleteUser(req: IncomingMessage, res: ServerResponse) {
  try {
    const userId = getUserIdFromUrl(req.url || '');

    try {
      service.deleteUser(userId);
      res.writeHead(200);
      res.end(JSON.stringify({ message: `User ${userId} was deleted` }));
    } catch (e) {
      res.writeHead(404);
      res.end(JSON.stringify({ message: (e as Error).message }));
    }
  } catch (e) {
    res.writeHead(500);
    res.end(JSON.stringify({ message: (e as Error).message }));
  }
}

export async function patchUser(req: IncomingMessage, res: ServerResponse) {
  try {
    const userId = getUserIdFromUrl(req.url || '');
    const data = await getRequestData(req);
    const userProps = JSON.parse(data);

    try {
      const user = service.updateUser(userId, userProps);
      res.writeHead(200);
      res.end(JSON.stringify(user));
    } catch (e) {
      res.writeHead(404);
      res.end(JSON.stringify({ message: (e as Error).message }));
    }
  } catch (e) {
    res.writeHead(500);
    res.end(JSON.stringify({ message: (e as Error).message }));
  }
}
