import React, { useState, useEffect } from 'react';
import useInput from '../../hooks/useInput';
import useFetch from '../../hooks/useFetch';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import classes from './CheckoutContent.module.css';

const formatter = new Intl.NumberFormat('de-DE', {
	style: 'currency',
	currency: 'VND',
});

const isNotEmpty = (value) => value.trim() !== '';
const isEmail = (value) => value.includes('@');
const isPhone = (value) => value.trim() !== '' && value.length >= 10;

const CheckoutContent = () => {
	const url = useSelector((state) => state.url);
	const ORDER_URL = `${url}create-order`;
	const navigate = useNavigate();
	const [isSubmit, setIsSubmit] = useState(false);
	const [didSubmit, setDidSubmit] = useState(false);

	const backHandler = () => {
		navigate('/');
	};

	const dispatch = useDispatch();
	const cartItems = useSelector((state) => state.cartItems);
	const total = useSelector((state) => state.total);
	const user = useSelector((state) => state.user);

	const {
		value: fullNameValue,
		isValid: fullNameIsValid,
		hasError: fullNameHasError,
		valueChangeHandler: fullNameChangeHandler,
		inputBlurHandler: fullNameBlurHandler,
		reset: resetFullName,
	} = useInput(isNotEmpty);
	const {
		value: emailValue,
		isValid: emailIsValid,
		hasError: emailHasError,
		valueChangeHandler: emailChangeHandler,
		inputBlurHandler: emailBlurHandler,
		reset: resetEmail,
	} = useInput(isEmail);
	const {
		value: phoneValue,
		isValid: phoneIsValid,
		hasError: phoneHasError,
		valueChangeHandler: phoneChangeHandler,
		inputBlurHandler: phoneBlurHandler,
		reset: resetPhone,
	} = useInput(isPhone);
	const {
		value: addressValue,
		isValid: addressIsValid,
		hasError: addressHasError,
		valueChangeHandler: addressChangeHandler,
		inputBlurHandler: addressBlurHandler,
		reset: resetAddress,
	} = useInput(isNotEmpty);

	let formValid = false;
	if (fullNameIsValid && emailIsValid && phoneIsValid && addressIsValid) {
		formValid = true;
	}
	const contact = {
		fullname: fullNameValue,
		email: emailValue,
		phoneNumber: phoneValue,
		address: addressValue,
	};
	useEffect(() => {
		contact.fullname = fullNameValue;
		contact.email = emailValue;
		contact.phoneNumber = phoneValue;
		contact.address = addressValue;
	}, [fullNameValue, emailValue, phoneValue, addressValue]);

	const order = {
		userId: user?._id,
		contact: contact,
		items: cartItems,
		total: total,
	};

	const { error: orderError, fetchHandler: orderFetchHandler } = useFetch(
		ORDER_URL,
		'POST',
		order
	);

	// Submit handler

	const submitHandler = (e) => {
		e.preventDefault();

		if (!formValid) return;
		setIsSubmit(true);

		const order = {
			user: contact,
			orderItems: cartItems,
		};
		dispatch({ type: 'ORDER', order: order });
		dispatch({ type: 'CLEAR_CART' });

		setTimeout(() => {
			setIsSubmit(false);
			setDidSubmit(true);
		}, 1500);

		orderFetchHandler();

		resetFullName();
		resetEmail();
		resetPhone();
		resetAddress();
	};

	return (
		<div className={classes.checkoutContent}>
			<h3>BILLING DETAILS</h3>
			{!didSubmit && (
				<div className={classes.wrapper}>
					<form onSubmit={submitHandler}>
						{/* Full name */}

						<label htmlFor='fullname'>FULLNAME:</label>
						<input
							type='text'
							id='fullname'
							placeholder='Enter Your Ful Name Here!'
							value={fullNameValue}
							onChange={fullNameChangeHandler}
							onBlur={fullNameBlurHandler}
						/>
						{fullNameHasError && (
							<p className={classes.errorText}>Please enter a full name.</p>
						)}

						{/* Email */}

						<label htmlFor='email'>EMAIL:</label>
						<input
							type='email'
							id='email'
							placeholder='Enter Your Email Here!'
							value={emailValue}
							onChange={emailChangeHandler}
							onBlur={emailBlurHandler}
						/>
						{emailHasError && (
							<p className={classes.errorText}>Please enter a valid email.</p>
						)}

						{/* Phone */}

						<label htmlFor='phone'>PHONE NUMBER:</label>
						<input
							type='tel'
							id='phone'
							placeholder='Enter Your Phone Number Here!'
							value={phoneValue}
							onChange={phoneChangeHandler}
							onBlur={phoneBlurHandler}
						/>
						{phoneHasError && (
							<p className={classes.errorText}>Please enter a valid phone.</p>
						)}

						{/* Address */}

						<label htmlFor='address'>ADDRESS:</label>
						<input
							type='text'
							id='address'
							placeholder='Enter Your Address Here!'
							value={addressValue}
							onChange={addressChangeHandler}
							onBlur={addressBlurHandler}
						/>
						{addressHasError && (
							<p className={classes.errorText}>Please enter an address.</p>
						)}

						<button>{!isSubmit ? 'Place order' : 'Submitting'}</button>

						{orderError && <p>{orderError.message}</p>}
					</form>

					{/* Your order */}

					<div className={classes.yourOrder}>
						<h3>YOUR ORDER</h3>

						{/* Item list */}
						<ul>
							{cartItems.map((curr) => (
								<li key={curr._id}>
									<div>
										<span className={classes.name}>{curr.name}</span>
										<span className={classes.price}>
											{formatter.format(curr.price)}
										</span>
										<span
											className={classes.quantity}
										>{` x ${curr.quantity}`}</span>
									</div>
								</li>
							))}
						</ul>

						<div className={classes.total}>
							<span>TOTAL</span>
							<span>{formatter.format(total)}</span>
						</div>
					</div>
				</div>
			)}
			{didSubmit && (
				<div className={classes.didSubmit}>
					<h4>Successfully placed order.</h4>
					<button onClick={backHandler}>Return Home</button>
				</div>
			)}
		</div>
	);
};

export default CheckoutContent;
