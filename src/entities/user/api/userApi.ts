import { axiosInstance } from '@/shared/api';
import { User } from '../model';

export const loginUser = async (
   email: string,
   password: string,
   id: string
): Promise<User> => {
   const response = await axiosInstance.get<User[]>('/users', {
      params: { email, password, id },
   });
   if (response.status !== 200) {
      throw new Error('Failed to fetch user data');
   }
   if (response.data.length === 0) {
      throw new Error('No user found with the provided credentials');
   }
   return response.data[0];
};
