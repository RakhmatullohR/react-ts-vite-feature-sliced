import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'sonner';
import { loginUser } from '../api';
import {
   getUserFromLocalStorage,
   removeUserFromLocalStorage,
   setUserToLocalStorage,
} from '../lib';

export const login = createAsyncThunk(
   'user/login',
   async (
      payload: { username: string; password: string; id: string },
      thunkAPI
   ) => {
      try {
         const user = await loginUser(
            payload.username,
            payload.password,
            payload.id
         );
         setUserToLocalStorage(user);
         return user;
      } catch (error: unknown) {
         if (error instanceof Error) {
            toast.error(error.message);
            return thunkAPI.rejectWithValue(error.message);
         } else {
            toast.error('An unexpected error occurred');
            return thunkAPI.rejectWithValue('An unexpected error occurred');
         }
      }
   }
);

export const logout = createAsyncThunk('user/logout', async () => {
   removeUserFromLocalStorage();
   return null;
});

export const checkAuth = createAsyncThunk(
   'user/checkAuth',
   async (_, thunkAPI) => {
      const user = getUserFromLocalStorage();
      try {
         if (user) {
            return user;
         } else {
            throw new Error('Not authenticated');
         }
      } catch (error: unknown) {
         if (error instanceof Error) {
            toast.error(error.message);
            return thunkAPI.rejectWithValue(error.message);
         } else {
            toast.error('An unexpected error occurred');
            return thunkAPI.rejectWithValue('An unexpected error occurred');
         }
      }
   }
);
