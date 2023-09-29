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

function removeHobbiesProp(user: User): Omit<User, 'hobbies'> {
  const { hobbies, ...userProps } = user;
  return userProps;
}

function addHypermediaLinksToUser(user: User) {
  return {
    ...user,
    links: [
      { rel: 'hobbies', href: `/hobbies?user=${user.id}` }
    ],
  }
}

export function getUserWithHobbies(id: number): User {
  const user = users.find(user => user.id === id);

  if (!user) throw new Error('User not found');

  return user;
}

export function getUser(id: number): Omit<User, 'hobbies'> {
  return removeHobbiesProp(addHypermediaLinksToUser(getUserWithHobbies(id)));
}

export function getAllUsers(): Omit<User, 'hobbies'>[] {
  return users.map(addHypermediaLinksToUser).map(removeHobbiesProp);
}

export function addUser(user: Omit<User, 'id' | 'hobbies'>): User {
  const newId = users[users.length - 1].id + 1;
  const newUser = { hobbies: [], ...user, id: newId };

  users.push(newUser);
  return addHypermediaLinksToUser(newUser);
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
    return removeHobbiesProp(addHypermediaLinksToUser(updatedUser));
  }
}
