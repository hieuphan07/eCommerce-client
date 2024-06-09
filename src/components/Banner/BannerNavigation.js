import classes from './BannerNavigation.module.css';

const ProductListBanner = ({ title, navigation }) => {
	return (
		<div className={classes.banner}>
			<h2>{title}</h2>
			<h4>{navigation}</h4>
		</div>
	);
};

export default ProductListBanner;
