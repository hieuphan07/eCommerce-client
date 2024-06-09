import { useLoaderData, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import MainContentBanner from './MainContentBanner';
import Indicator from './Indicator';

import classes from './ProductListMain.module.css';

const formatter = new Intl.NumberFormat('de-DE', {
	style: 'currency',
	currency: 'VND',
});

const ProductListMain = () => {
	const data = useLoaderData();

	const selectedType = useSelector((state) => state.category);
	const dispatch = useDispatch();

	let dataFiltered;

	if (selectedType !== 'All') {
		dataFiltered = data.filter(
			(curr) => curr.category === selectedType.toLowerCase()
		);
	} else {
		dataFiltered = data;
	}

	const selectProductHandler = (byCategory) => {
		const selectedProducts = data.filter(
			(curr) => curr.category === byCategory
		);
		dispatch({ type: 'PRODUCT_SELECT', selectedProds: selectedProducts });
		// localStorage.setItem('SELECTED_PRODUCTS', JSON.stringify(selectedProducts));
	};

	return (
		<div className={classes['main-content']}>
			<MainContentBanner />

			{/* Product lists */}

			<ul className={classes.shopListItem}>
				{dataFiltered.map((prod, index) => (
					<li key={prod._id}>
						<Link to={prod._id}>
							<img
								src={prod.photos[0]}
								alt={`products-${index}`}
								onClick={() => selectProductHandler(prod.category)}
							/>
							<span className={classes.itemName}>{prod['name']}</span>
							<span className={classes.itemPrice}>
								{formatter.format(prod['price'])}
							</span>
						</Link>
					</li>
				))}
			</ul>

			<Indicator />
		</div>
	);
};

export default ProductListMain;
