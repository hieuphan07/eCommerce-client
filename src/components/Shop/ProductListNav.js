import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DUMMY_CATEGORIES from '../../dummyData/dummyCategories.json';

import classes from './ProductListNav.module.css';

const ProductListNav = () => {
	const selectedType = useSelector((state) => state.type);
	const dispatch = useDispatch();

	const [activeType, setActiveType] = useState(selectedType);

	const setActiveTypeHandler = (string) => {
		setActiveType(string);
		dispatch({ type: 'TYPE_SELECT', selectedType: string });
	};

	// After navigating to Shop Page, Category "All" will be selected and rendered
	useEffect(() => {
		setActiveType('All');
		dispatch({ type: 'TYPE_SELECT', selectedType: 'All' });
	}, []);

	return (
		<nav className={classes.navbar}>
			<h4 className={classes.title}>CATEGORIES</h4>
			<ul>
				{/* Main type */}

				{DUMMY_CATEGORIES.map((curr) => (
					<li key={curr.category}>
						<span className={classes.category}>{curr.category}</span>
						<ul>
							{/* Sub type */}

							{curr.type.map((type) => (
								<li key={type}>
									<p
										className={activeType === type ? classes.active : undefined}
										onClick={() => setActiveTypeHandler(type)}
									>
										{type}
									</p>
								</li>
							))}
						</ul>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default ProductListNav;
