import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayout from './pages/Root';
import RouteProtect from './components/RouteProtect/RouteProtect';
import HomePage, { loader as homeProductsLoader } from './pages/Home';

const API_URL = process.env.REACT_APP_API_URL;

const ErrorPage = lazy(() => import('./pages/Error'));
const Shop = lazy(() => import('./pages/Shop'));
const Detail = lazy(() => import('./pages/Detail'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const History = lazy(() => import('./pages/History'));
const OrderInformation = lazy(() => import('./pages/OrderInformation'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: (
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: () => homeProductsLoader(API_URL),
      },
      {
        path: 'shop',
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Shop />
              </Suspense>
            ),
            loader: () => import('./pages/Shop').then((module) => module.loader(API_URL)),
          },
          {
            path: ':productId',
            element: (
              <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Detail />
              </Suspense>
            ),
            loader: () => import('./pages/Shop').then((module) => module.loader(API_URL)),
          },
        ],
      },
      {
        path: 'cart',
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Cart />
              </Suspense>
            ),
          },
          {
            path: 'checkout',
            element: (
              <Suspense>
                <RouteProtect>
                  <Checkout />
                </RouteProtect>
              </Suspense>
            ),
          },
        ],
      },
      {
        path: 'login',
        element: (
          <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: 'register',
        element: (
          <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: 'history/:userId',
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <RouteProtect>
                  <History />
                </RouteProtect>
              </Suspense>
            ),
          },
          {
            path: ':orderId',
            element: (
              <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <RouteProtect>
                  <OrderInformation />
                </RouteProtect>
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

