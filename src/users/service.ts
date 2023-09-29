import { User } from '../types';

export let users: User[] = [
  {
    id: 1,
    name: 'Ann',
    email: 'ann@google.com',
    hobbies: ['books', 'sport', 'dancing'],
  },
  {
    id: 2,
    name: 'Ben',
    email: 'ben@google.com',
    hobbies: ['series', 'sport'],
  },
];

function filterUserProps(user: User): Omit<User, 'hobbies'> {
  const { id, name, email } = user;
  return { id, name, email };
}

export function getUserWithHobbies(id: number): User {
  const user = users.find(user => user.id === id);

  if (!user) throw new Error('User not found');

  return user;
}

export function getUser(id: number): Omit<User, 'hobbies'> {
  return filterUserProps(getUserWithHobbies(id));
}

export function getAllUsers(): Omit<User, 'hobbies'>[] {
  return users.map(filterUserProps);
}

export function addUser(user: Omit<User, 'id'>): User {
  const newId = users[users.length - 1].id + 1;
  const newUser = { ...user, id: newId };

  users.push(newUser);
  return newUser;
}

export function deleteUser(id: number) {
  const user = getUserWithHobbies(id);

  if (user) {
    users = users.filter(user => user.id !== id);
  }
}

export function updateUser(id: number, userProps: Partial<Omit<User, 'id'>>) {
  let user = getUserWithHobbies(id);

  if (user) {
    const updatedUser = { ...user, ...userProps };
    users = users.map((user) => user.id === id ? updatedUser : user);
  }
}
