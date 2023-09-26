import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Welcome from './pages/Welcome';
import Loader from './common/Loader';
import routes from './routes';
import { AuthProvider } from './hooks/useAuth';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
    <Toaster position='top-right' reverseOrder={false} containerClassName='overflow-auto'/>
  
      <AuthProvider>
        <Routes>
          <Route index element={<Welcome />} />
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route element={<DefaultLayout />}>
            {routes.map(({ path, component: Component }, index) => (
              <Route
                key={index}
                path={path}
                element={
                  <Suspense fallback={<Loader />}>
                    <Component />
                  </Suspense>
                }
              />
            ))}
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

// Set your API baseUrl here
//
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// redaxios.defaults.baseURL = "http://localhost:8000";
// redaxios.defaults.withCredentials = true;

export default App;
