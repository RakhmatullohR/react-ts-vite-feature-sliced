import { Route, Routes } from 'react-router-dom';

import {
   AuthorsPage,
   BooksPage,
   CounterPage,
   EffectsSequencePage,
   HomePage,
   NotFoundPage,
   SupersPage,
   UILoadingPage,
} from '@/pages';
import { ROUTES } from '@/shared/config';

export function AppRouter() {
   return (
      <Routes>
         <Route path={ROUTES.HOME} element={<HomePage />} />
         <Route path={ROUTES.COUNTER} element={<CounterPage />} />
         <Route path={ROUTES.AUTHORS} element={<AuthorsPage />} />
         <Route path={ROUTES.BOOKS} element={<BooksPage />} />
         <Route path={ROUTES.SUPERS} element={<SupersPage />} />
         <Route path={ROUTES.UI_LOADING} element={<UILoadingPage />} />
         <Route
            path={ROUTES.EFFECTS_SEQUENCE}
            element={<EffectsSequencePage />}
         />
         <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
   );
}
