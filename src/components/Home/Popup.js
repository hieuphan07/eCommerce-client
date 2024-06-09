import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import classes from './Popup.module.css';

const formatter = new Intl.NumberFormat('de-DE', {
	style: 'currency',
	currency: 'VND',
});

const Popup = ({ detail, trendingProducts }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const hideInfoHandler = () => {
		dispatch({ type: 'HIDE_INFO' });
	};

	const selectProductHandler = () => {
		const selectedProducts = trendingProducts.filter(
			(curr) => curr.category === detail.category
		);
		const productId = detail._id;

		dispatch({ type: 'PRODUCT_SELECT', selectedProds: selectedProducts });
		// localStorage.setItem('SELECTED_PRODUCTS', JSON.stringify(selectedProducts));
		dispatch({ type: 'HIDE_INFO' });

		navigate(`/shop/${productId}`);
	};

	return (
		<div
			className={classes['popup-overlay']}
			onClick={(event) => {
				if (event.target.className === 'Popup_popup-overlay__qzNbS') {
					hideInfoHandler();
				}
			}}
		>
			<div className={classes.popup}>
				{/* Product image */}

				<div className={classes.img}>
					<img src={detail.photos[0]} alt={detail.photos[0]}></img>
				</div>

				{/* Product text */}

				<div className={classes.info}>
					<span className={classes.name}>{detail['name']}</span>
					<span className={classes.price}>
						{formatter.format(detail['price'])}
					</span>
					<span className={classes.detail}>{detail['short_desc']}</span>
					<button onClick={selectProductHandler}>View Detail</button>
					<span className={classes.close} onClick={hideInfoHandler}></span>
				</div>
			</div>
		</div>
	);
};

export default Popup;
