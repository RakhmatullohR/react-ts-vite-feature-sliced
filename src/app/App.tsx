import Layout from './Layout';
import { MainProvider } from './providers/MainProvider';
import { AppRouter } from './router';

function App() {
   return (
      <MainProvider>
         <Layout>
            <AppRouter />
         </Layout>
      </MainProvider>
   );
}

export default App;
