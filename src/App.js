import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayout from './pages/Root';
import RouteProtect from './components/RouteProtect/RouteProtect';
import HomePage, { loader as homeProductsLoader } from './pages/Home';
// import ErrorPage from "./pages/Error";
// import ShopPage, { loader as shopProductsLoader } from "./pages/Shop";
// import DetailPage from "./pages/Detail";
// import CartPage from "./pages/Cart";
// import CheckoutPage from "./pages/Checkout";
// import LoginPage from "./pages/Login";
// import RegisterPage from "./pages/Register";

const Error = lazy(() => import('./pages/Error'));
const Shop = lazy(() => import('./pages/Shop'));
const Detail = lazy(() => import('./pages/Detail'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const History = lazy(() => import('./pages/History'));
const OrderInformation = lazy(() => import('./pages/OrderInformation'));
const url = 'https://ecommerce-shop-5f0427530cdd.herokuapp.com/'; // Change url to "http://localhost:5500/" to use localhost

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		errorElement: (
			<Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
				<Error />
			</Suspense>
		),
		children: [
			{
				index: true,
				element: <HomePage />,
				loader: () => homeProductsLoader(url),
			},
			{
				path: 'shop',
				children: [
					{
						index: true,
						element: (
							<Suspense
								fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}
							>
								<Shop />
							</Suspense>
						),
						loader: () =>
							import('./pages/Shop').then((module) => module.loader(url)),
					},
					{
						path: ':productId',
						element: (
							<Suspense
								fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}
							>
								<Detail />
							</Suspense>
						),
						loader: () =>
							import('./pages/Shop').then((module) => module.loader(url)),
					},
				],
			},
			{
				path: 'cart',
				children: [
					{
						index: true,
						element: (
							<Suspense
								fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}
							>
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
					<Suspense
						fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}
					>
						<Login />
					</Suspense>
				),
			},
			{
				path: 'register',
				element: (
					<Suspense
						fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}
					>
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
							<Suspense
								fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}
							>
								<RouteProtect>
									<History />
								</RouteProtect>
							</Suspense>
						),
					},
					{
						path: ':orderId',
						element: (
							<Suspense
								fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}
							>
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
