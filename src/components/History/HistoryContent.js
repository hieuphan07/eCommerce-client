import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

import BannerNaigation from '../../components/Banner/BannerNavigation';
import classes from './HistoryContent.module.css';
import { useSelector } from 'react-redux';

const HistoryContent = () => {
	const url = useSelector((state) => state.url);
	const navigate = useNavigate();
	const { userId } = useParams();
	const {
		loading,
		result: orders,
		error,
		fetchHandler,
	} = useFetch(`${url}orders/${userId}`);

	useEffect(() => {
		fetchHandler();
	}, []);

	const goToDetailOrder = (orderId) => {
		navigate(orderId);
	};

	return (
		<div className={classes.history}>
			<BannerNaigation title='HISTORY' navigation='HISTORY' />
			<table>
				<thead>
					<tr>
						<th>ID ORDER</th>
						<th>ID USER</th>
						<th>NAME</th>
						<th>PHONE</th>
						<th>ADDRESS</th>
						<th>TOTAL</th>
						<th>DELIVERY</th>
						<th>STATUS</th>
						<th>DETAIL</th>
					</tr>
				</thead>
				{!loading && !error && orders?.length > 0 && (
					<tbody>
						{orders?.map((order) => {
							return (
								<tr key={order._id}>
									<td className={classes.orderId}>{order._id}</td>
									<td className={classes.userId}>{order.userId}</td>
									<td className={classes.fullname}>{order.contact.fullname}</td>
									<td className={classes.phoneNumber}>
										{order.contact.phoneNumber}
									</td>
									<td className={classes.address}>{order.contact.address}</td>
									<td className={classes.totalAmount}>
										{Number(order.total).toLocaleString('en', {
											useGrouping: true,
										}) +
											' ' +
											'VND'}
									</td>
									<td className={classes.deliveryStatus}>
										Waiting for progressing
									</td>
									<td className={classes.paymentStatus}>Waiting for pay</td>
									<td className={classes.actions}>
										<button
											className={classes.btn}
											type='button'
											onClick={() => goToDetailOrder(order._id)}
										>
											View <b>&rarr;</b>
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				)}
			</table>
			{!loading && !error && orders?.length <= 0 && (
				<p className={classes.loading}>No orders found.</p>
			)}
			{loading && <p className={classes.loading}>Loading...</p>}
		</div>
	);
};

export default HistoryContent;
