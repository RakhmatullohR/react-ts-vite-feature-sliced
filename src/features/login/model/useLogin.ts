import { AppDispatch, RootState } from '@/app/stores/mainStore';
import { useDispatch, useSelector } from 'react-redux';

export const useLogin = () => {
   const dispatch: AppDispatch = useDispatch();
   const { isLoading } = useSelector((state: RootState) => state);
};
