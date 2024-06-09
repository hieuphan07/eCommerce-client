import React from 'react';
import { useDispatch } from 'react-redux';

import classes from './Item.module.css';

const formatter = new Intl.NumberFormat('de-DE', {
	style: 'currency',
	currency: 'VND',
});

const Item = ({ image, name, price, quantity, amount, item }) => {
	const dispatch = useDispatch();
	const addHandler = () => {
		dispatch({ type: 'UPDATE_CART', changeQuantity: 'ADD', cartItem: item });
	};
	const removeHandler = () => {
		dispatch({ type: 'UPDATE_CART', changeQuantity: 'REMOVE', cartItem: item });
	};
	const deleteHandler = () => {
		dispatch({ type: 'DELETE_CART', cartItem: item });
	};

	return (
		<tr className={classes.item}>
			<td align='center' className={classes.image}>
				<img src={image} alt={image} />
			</td>
			<td align='left' className={classes.name}>
				{name}
			</td>
			<td align='center' className={classes.price}>
				{formatter.format(price)}
			</td>
			<td align='center' className={classes.quantity}>
				<i className='fa fa-caret-left' onClick={removeHandler} />
				<span>{quantity}</span>
				<i className='fa fa-caret-right' onClick={addHandler} />
			</td>
			<td align='center' className={classes.amount}>
				{formatter.format(amount)}
			</td>
			<td align='center' className={classes.remove}>
				<i className='fa fa-trash-o' onClick={deleteHandler} />
			</td>
		</tr>
	);
};

export default Item;
