import { createSlice } from '@reduxjs/toolkit';
import { getUserFromLocalStorage } from '../lib';
import { checkAuth, login, logout } from './thunks';
import { UserState } from './types';

const initialState: UserState = {
   isLoading: false,
   user: getUserFromLocalStorage(),
};
const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {},
   extraReducers: builder => {
      builder.addCase(login.pending, state => {
         state.isLoading = true;
      });
      builder.addCase(login.fulfilled, (state, action) => {
         state.user = action.payload;
         state.isLoading = false;
      });
      builder.addCase(login.rejected, state => {
         state.isLoading = false;
         state.user = null;
      });
      builder.addCase(logout.fulfilled, state => {
         state.user = null;
         state.isLoading = false;
      });
      builder.addCase(checkAuth.fulfilled, (state, action) => {
         state.user = action.payload;
         state.isLoading = false;
      });
      builder.addCase(checkAuth.rejected, state => {
         state.user = null;
         state.isLoading = false;
      });
   },
});

export default userSlice.reducer;
