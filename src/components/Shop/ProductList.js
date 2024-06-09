import BannerNavigation from '../Banner/BannerNavigation';
import ProductListNav from './ProductListNav';
import ProductListMain from './ProductListMain';

import classes from './ProductList.module.css';

const ProductList = () => {
	return (
		<div className={classes.shop}>
			<BannerNavigation title='SHOP' navigation='SHOP' />
			<ProductListNav />
			<ProductListMain />
		</div>
	);
};

export default ProductList;
