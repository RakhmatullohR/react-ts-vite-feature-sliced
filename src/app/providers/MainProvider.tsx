import { ThemeProvider } from '@/shared/providers';
import { BrowserRouter } from 'react-router-dom';

export function MainProvider({ children }: { children: React.ReactNode }) {
   return (
      <BrowserRouter>
         <ThemeProvider>{children}</ThemeProvider>
      </BrowserRouter>
   );
}
