import React from 'react';
import useInput from '../../hooks/useInput';
import useFetch from '../../hooks/useFetch';
import { Link, useNavigate } from 'react-router-dom';

import classes from './Signup.module.css';
import { useSelector } from 'react-redux';

const isNotEmpty = (value) => value.trim() !== '';
const isEmail = (value) => value.includes('@');
const isPassword = (value) =>
	value.length >= 8 && /\d/.test(value) && /[a-zA-Z]/.test(value);
const isPhone = (value) => value.trim() !== '' && value.length >= 10;

const Signup = () => {
	const navigate = useNavigate();
	const url = useSelector((state) => state.url);
	const SIGNUP_URL = `${url}auth/signup`;
	const user = {};

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
		value: passwordValue,
		isValid: passwordIsValid,
		hasError: passwordHasError,
		valueChangeHandler: passwordChangeHandler,
		inputBlurHandler: passwordBlurHandler,
		reset: resetPassword,
	} = useInput(isPassword);
	const {
		value: phoneValue,
		isValid: phoneIsValid,
		hasError: phoneHasError,
		valueChangeHandler: phoneChangeHandler,
		inputBlurHandler: phoneBlurHandler,
		reset: resetPhone,
	} = useInput(isPhone);

	let formIsValid = false;
	if (fullNameIsValid && emailIsValid && passwordIsValid && phoneIsValid) {
		formIsValid = true;
		// Assign value for user fields
		user.fullname = fullNameValue;
		user.email = emailValue;
		user.password = passwordValue;
		user.phone = phoneValue;
	}

	const { error, fetchHandler } = useFetch(SIGNUP_URL, 'POST', user);

	// Confirm register
	const submitHanlder = async (e) => {
		e.preventDefault();
		if (!formIsValid) return;

		const { error } = await fetchHandler();
		if (error) return;

		resetFullName();
		resetEmail();
		resetPassword();
		resetPhone();

		alert('Successfully registered!');
		navigate('/login');
	};

	return (
		<div className={classes.signup}>
			<div className={classes.wrapper}>
				<form onSubmit={submitHanlder}>
					<h3>Sign Up</h3>

					{/* Full name */}
					<input
						type='text'
						placeholder='Full Name'
						id='full-name'
						value={fullNameValue}
						onChange={fullNameChangeHandler}
						onBlur={fullNameBlurHandler}
					/>

					{/* Email */}
					<input
						type='email'
						placeholder='Email'
						id='email'
						value={emailValue}
						onChange={emailChangeHandler}
						onBlur={emailBlurHandler}
					/>

					{/* Password */}
					<input
						type='password'
						placeholder='Password'
						id='password'
						value={passwordValue}
						onChange={passwordChangeHandler}
						onBlur={passwordBlurHandler}
					/>

					{/* Phone */}
					<input
						type='tel'
						placeholder='Phone'
						id='phone'
						value={phoneValue}
						onChange={phoneChangeHandler}
						onBlur={phoneBlurHandler}
					/>

					{/* Client-Warning */}
					{fullNameHasError && (
						<p className={classes['error-text']}>Please enter a full name</p>
					)}
					{emailHasError && (
						<p className={classes['error-text']}>Please enter a valid email</p>
					)}
					{passwordHasError && (
						<p className={classes['error-text']}>
							Password must be at latest 8 characters & include letter and
							number
						</p>
					)}
					{phoneHasError && (
						<p className={classes['error-text']}>
							Please enter a phone number.
						</p>
					)}

					{/* Server-Warning */}
					{error && <p className={classes['error-text']}>{error}</p>}

					<button>SIGN UP</button>
				</form>
				<p>
					Login? <Link to='/login'>Click</Link>
				</p>
			</div>
		</div>
	);
};

export default Signup;
