import { useCallback, useEffect } from 'react';
import { json, useLoaderData } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import HomePageContent from '../components/Home/HomePageContent';
import TrendingProducts from '../components/Home/TrendingProducts';
import Popup from '../components/Home/Popup';

const HomePage = () => {
	const data = useLoaderData();

	const showInfo = useSelector((state) => state.showInfo);
	const detail = useSelector((state) => state.detail);

	const dispatch = useDispatch();
	const hideInfoHandler = useCallback(() => {
		dispatch({ type: 'HIDE_INFO' });
	}, [dispatch]);

	// Press 'escape" key to close popup
	useEffect(() => {
		const handleEscape = (event) => {
			if (event.key === 'Escape') {
				hideInfoHandler();
			}
		};
		document.addEventListener('keydown', handleEscape);

		return () => {
			document.removeEventListener('keydown', handleEscape);
		};
	}, [hideInfoHandler]);

	// Main return from Homepage
	return (
		<>
			<HomePageContent />
			<TrendingProducts trendingProducts={data} />
			{showInfo && detail && <Popup detail={detail} trendingProducts={data} />}
		</>
	);
};

export default HomePage;

// Fetch loader
export async function loader(url) {
	const PRODUCTS_URL = url + 'products';
	const response = await fetch(PRODUCTS_URL);

	if (!response.ok) {
		throw json({ message: 'Could not fetch data.' }, { status: 500 });
	} else {
		return response;
	}
}
