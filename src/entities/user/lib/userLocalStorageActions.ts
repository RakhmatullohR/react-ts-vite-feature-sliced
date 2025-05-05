import { User } from '../model';

export const getUserFromLocalStorage = (): User | null => {
   const user = localStorage.getItem('user');
   if (user) {
      return JSON.parse(user);
   }
   return null;
};

export const removeUserFromLocalStorage = (): void => {
   localStorage.removeItem('user');
};
export const setUserToLocalStorage = (user: User): void => {
   localStorage.setItem('user', JSON.stringify(user));
};
