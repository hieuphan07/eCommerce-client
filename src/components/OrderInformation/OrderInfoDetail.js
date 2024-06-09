import React, { useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import { useParams } from 'react-router-dom';

import classes from './OrderInfoDetail.module.css';
import { useSelector } from 'react-redux';

const OrderInfoDetail = () => {
	const url = useSelector((state) => state.url);
	const { userId, orderId } = useParams();
	const {
		loading,
		result: order,
		error,
		fetchHandler,
	} = useFetch(`${url}orders/${userId}/${orderId}`);

	useEffect(() => {
		fetchHandler();
	}, []);

	return (
		<div className={classes.orderInfo}>
			<h1 className={classes['orderInfo--title']}>INFORMATION ORDER</h1>
			{loading && <p style={{ textAlign: 'center' }}>Loading...</p>}
			{!loading && !error && order && (
				<div className={classes['orderInfo--contact']}>
					<p>ID User: {order.userId}</p>
					<p>Full Name: {order.contact.fullname}</p>
					<p>Phone: +84{order.contact.phoneNumber}</p>
					<p>Address: {order.contact.address}</p>
					<p>
						Total:{' '}
						{Number(order.total).toLocaleString('en', { useGrouping: true })}{' '}
						VND
					</p>
				</div>
			)}
			{!loading && !error && order && (
				<table className={classes['orderIndo--products']}>
					<thead>
						<tr>
							<th>ID PRODUCT</th>
							<th>IMAGE</th>
							<th>NAME</th>
							<th>PRICE</th>
							<th>COUNT</th>
						</tr>
					</thead>
					<tbody>
						{order?.items.map((item) => {
							return (
								<tr key={item.productId._id}>
									<td>{item.productId._id}</td>
									<td>
										<img
											src={item.productId.photos[0]}
											alt={item.productId.name}
										/>
									</td>
									<td>{item.productId.name}</td>
									<td>
										{Number(item.productId.price).toLocaleString('en', {
											useGrouping: true,
										})}{' '}
										VND
									</td>
									<td>{item.quantity}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default OrderInfoDetail;
