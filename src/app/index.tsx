import { RouterProvider, StoreProvider } from './providers';
import { AppRouter } from './router';

function App() {
   return (
      <StoreProvider>
         <RouterProvider>
            <AppRouter />
         </RouterProvider>
      </StoreProvider>
   );
}

export default App;
