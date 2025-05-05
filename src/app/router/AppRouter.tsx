import {
   ArticleEditPage,
   ArticleReadPage,
   HomePage,
   SigninPage,
} from '@/pages';
import { ROUTES } from '@/shared/config';
import { Route, Routes } from 'react-router-dom';
export const AppRouter = () => {
   return (
      <Routes>
         <Route path={ROUTES.HOME} element={<HomePage />} />
         <Route path={ROUTES.SIGN_IN} element={<SigninPage />} />
         <Route path={ROUTES.ARTICLE_EDIT} element={<ArticleEditPage />} />
         <Route path={ROUTES.ARTICLE_READ} element={<ArticleReadPage />} />
         {/* Add more routes as needed */}
      </Routes>
   );
};
