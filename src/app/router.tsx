import { Route, Routes } from 'react-router-dom';

import {
   AuthorsPage,
   BooksPage,
   CounterPage,
   HomePage,
   NotFoundPage,
} from '@/pages';
import { ROUTES } from '@/shared/config';

export function AppRouter() {
   return (
      <Routes>
         <Route path={ROUTES.HOME} element={<HomePage />} />
         <Route path={ROUTES.COUNTER} element={<CounterPage />} />
         <Route path={ROUTES.AUTHORS} element={<AuthorsPage />} />
         <Route path={ROUTES.BOOKS} element={<BooksPage />} />
         <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
   );
}
