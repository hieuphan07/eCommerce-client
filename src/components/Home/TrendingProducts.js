import { useDispatch } from 'react-redux';
import useMouse from '../../hooks/useMouse';

import DUMMY_EXTRA_INFO from '../../dummyData/dunmmyExtraInfo.json';

import classes from './TrendingProducts.module.css';

const formatter = new Intl.NumberFormat('de-DE', {
	style: 'currency',
	currency: 'VND',
});

const TrendingProducts = ({ trendingProducts }) => {
	const [activeImage, mouseEnterHandler, mouseLeaveHandler] = useMouse();

	const dispatch = useDispatch();
	const showInfoHandler = (detail) => {
		dispatch({ type: 'SHOW_INFO', payload: detail });
	};

	return (
		<div className={classes.shopList}>
			<div className={classes.shopListTitle}>
				<span>MADE THE HARD WAY</span>
				<span>TOP TRENDING PRODUCTS</span>

				{/* Item list */}

				<ul className={classes.shopListItem}>
					{trendingProducts.map((prod, index) => (
						<li key={prod._id}>
							<img
								className={activeImage === index ? classes.dimmed : undefined}
								onMouseEnter={() => mouseEnterHandler(index)}
								onMouseLeave={mouseLeaveHandler}
								onClick={() => showInfoHandler(prod)}
								src={prod.photos[0]}
								alt={`products-${index}`}
							/>
							<span className={classes.itemName}>{prod['name']}</span>
							<span className={classes.itemPrice}>
								{formatter.format(prod['price'])}
							</span>
						</li>
					))}
				</ul>

				{/* Extra information */}

				<div className={classes.extraInfo}>
					{DUMMY_EXTRA_INFO.map((curr) => (
						<div
							key={curr.name}
							className={
								curr.class === 'ship'
									? classes.ship
									: curr.class === 'service'
									? classes.service
									: classes.offer
							}
						>
							<span>{curr.name}</span>
							<span>{curr.ship}</span>
						</div>
					))}
				</div>

				{/* Form footer */}

				<form className={classes.form}>
					<div>
						<h3>LET'S BE FRIENDS!</h3>
						<p>Nisi Nisi tempor consequat laboris nisi</p>
					</div>
					<div>
						<input type='email' placeholder='Enter your email addess' />
						<button type='button'>Subscrice</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default TrendingProducts;
