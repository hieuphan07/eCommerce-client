import { json } from 'react-router-dom';

import ProductList from '../components/Shop/ProductList';

const ShopPage = () => {
	return <ProductList />;
};

export default ShopPage;

// Fetch loader
export async function loader(url) {
	const response = await fetch(`${url}products`, {
		credentials: 'include',
	});

	if (!response.ok) {
		throw json({ message: 'Could not fetch data.' }, { status: 500 });
	} else {
		return response;
	}
}
