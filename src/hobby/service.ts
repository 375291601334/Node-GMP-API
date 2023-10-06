import { getUserWithHobbies } from '../users/service';

export function getHobbies(userId: number): string[] {
  const user = getUserWithHobbies(userId);

  return user.hobbies || [];
}

export function addHobby(userId: number, newHobby: string) {
  const user = getUserWithHobbies(userId);

  if (user.hobbies.find(hobby => hobby === newHobby)) {
    throw new Error(`Hobby ${newHobby} already exists for ${user.name}`);
  }

  user.hobbies.push(newHobby);
}

export function deleteHobby(userId: number, hobbyToDelete: string) {
  const user = getUserWithHobbies(userId);

  if (!user.hobbies.find(hobby => hobby === hobbyToDelete)) {
    throw new Error(`Hobby ${hobbyToDelete} not found for ${user.name}`);
  }

  user.hobbies = user.hobbies.filter(hobby => hobby !== hobbyToDelete);
}
