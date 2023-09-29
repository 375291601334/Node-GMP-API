import http from 'http';
import { getUsers, postUsers, getUser, patchUser, deleteUser } from './users/routeHandler';
import { deleteHobbyForUser, getHobbiesForUser, postHobbyForUser } from './hobby/routeHandler';

const port = 8000;
const host = 'localhost';

const server = http.createServer((req, res) => {
  if (req.url === '/users') {
    // GET /users
    if (req.method === 'GET') getUsers(req, res);
    // POST /users
    if (req.method === 'POST') postUsers(req, res);
  } else if (req.url?.match(/^\/users\/(\d+)/)) {
    // GET /users/:id
    if (req.method === 'GET') getUser(req, res);
    // PATCH /users/:id
    if (req.method === 'PATCH') patchUser(req, res);
    // DELETE /users/:id
    if (req.method === 'DELETE') deleteUser(req, res);
  } else if (req.url?.match(/^\/hobbies\?user=(\d+)/)) {
    // GET /hobbies?user=:id
    if (req.method === 'GET') getHobbiesForUser(req, res);
    // POST /hobbies?user=:id
    if (req.method === 'POST') postHobbyForUser(req, res);
    // DELETE /hobbies?user=:id
    if (req.method === 'DELETE') deleteHobbyForUser(req, res);
  } else {
    res.writeHead(400);
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

server.listen(port, host, () => {
  console.log(`Server is running on port ${port}`);
});
