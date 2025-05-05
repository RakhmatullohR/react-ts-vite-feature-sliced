import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { mainStore } from '../stores/mainStore';
export const StoreProvider = ({ children }: { children: ReactNode }) => {
   return (
      <Provider store={mainStore}>
         {children}
         {/* Your store provider logic here */}
      </Provider>
   );
};
export default StoreProvider;
