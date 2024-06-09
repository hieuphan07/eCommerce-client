import React from 'react';

import BannerNavigation from '../Banner/BannerNavigation';
import CheckoutContent from './CheckoutContent';

import classes from './CheckoutDetail.module.css';

const CheckoutDetail = () => {
	return (
		<div className={classes.checkout}>
			<BannerNavigation title='CHECKOUT' navigation='HOME / CART / CHECKOUT' />
			<CheckoutContent />
		</div>
	);
};

export default CheckoutDetail;
