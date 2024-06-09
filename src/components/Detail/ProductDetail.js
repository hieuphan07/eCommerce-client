import React, { useRef, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import { useParams, useNavigate, useLoaderData } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import BannerNavigation from '../Banner/BannerNavigation';

import classes from './ProductDetail.module.css';

const formatter = new Intl.NumberFormat('de-DE', {
	style: 'currency',
	currency: 'VND',
});

const ProductDetail = () => {
	const url = useSelector((state) => state.url);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const allProduct = useLoaderData();
	const inputRef = useRef();
	const params = useParams();
	const productId = params.productId;
	const PRODUCT_URL = `${url}products/${productId}`;
	let longDesc;
	const {
		loading,
		result: mainProductInfo,
		error: productError,
		fetchHandler: productFetchHandler,
	} = useFetch(PRODUCT_URL);
	const relatedProducts = allProduct.filter(
		(prod) =>
			prod._id !== productId && prod.category === mainProductInfo?.category
	);

	const scrollToTop = () => {
		window.scrollTo(0, 0);
	};

	const addCartHandler = () => {
		dispatch({
			type: 'ADD_CART',
			cartItem: mainProductInfo,
			quantity: inputRef.current.value,
		});
		// reset value
		inputRef.current.value = 1;
	};

	const selectProductHandler = (productId) => {
		// reset value
		inputRef.current.value = 1;
		// navigate to specific product
		navigate(`/shop/${productId}`);
	};

	// Fetch product by productId
	useEffect(() => {
		productFetchHandler();
		scrollToTop();
	}, [productId]);

	// Convert "long_desc" from text to text array
	if (mainProductInfo?.['long_desc']?.includes('•')) {
		longDesc = mainProductInfo?.['long_desc']?.split('•');
	} else {
		longDesc = mainProductInfo?.['long_desc']?.split('-');
	}

	return (
		<>
			{/* Error message */}
			{productError && (
				<div className={classes.container}>
					<BannerNavigation title='DETAIL' navigation='SHOP / ProductID' />
					<h1>{productError.message}</h1>
				</div>
			)}
			{/* Render main product */}
			{!loading && mainProductInfo && (
				<div className={classes.container}>
					<BannerNavigation title='DETAIL' navigation='SHOP / ProductID' />
					<div className={classes.wrapper}>
						{/* Product images */}
						<div className={classes.images}>
							<div className={classes.colors}>
								<ul>
									{mainProductInfo.photos.map((curr, ind) => (
										<li key={curr + ind}>
											<img src={curr} alt={curr + ind} />
										</li>
									))}
								</ul>
							</div>
							<div className={classes.mainColor}>
								<img src={mainProductInfo.photos[0]} alt='img1' />
							</div>
						</div>

						{/* Product text */}
						<div className={classes.text}>
							<span className={classes.name}>{mainProductInfo.name}</span>
							<span className={classes.price}>
								{formatter.format(mainProductInfo.price)}
							</span>
							<span className={classes.shortDesc}>
								{mainProductInfo['short_desc']}
							</span>
							<span className={classes.category}>
								<strong>CATEGORY: </strong>
								{mainProductInfo.category}
							</span>
							<div className={classes.quantity}>
								<input
									type='number'
									min='1'
									defaultValue='1'
									placeholder='QUANTITY'
									ref={inputRef}
								></input>
								<button onClick={addCartHandler}>Add to cart</button>
							</div>
						</div>
					</div>

					{/* Long Description */}
					<div className={classes.longDesc}>
						<span>DESCRIPTION</span>
						<h3>PRODUCT DESCRIPTION</h3>
						<ul>
							{longDesc.map((spec) => (
								<li key={spec}>{spec}</li>
							))}
						</ul>
					</div>

					{/* Related Products */}
					{relatedProducts && (
						<div className={classes.relatedProducts}>
							<h3>RELATED PRODUCTS</h3>
							<ul>
								{relatedProducts.map((prod, ind) => (
									<li
										key={prod._id}
										onClick={() => selectProductHandler(prod._id)}
									>
										<img src={prod.photos?.[0]} alt={`prod-${ind + 1}`} />
										<span>{prod.name}</span>
										<span>{formatter.format(prod.price)}</span>
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default ProductDetail;
