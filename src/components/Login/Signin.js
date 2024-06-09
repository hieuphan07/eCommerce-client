import React from 'react';
import useInput from '../../hooks/useInput';
import useFetch from '../../hooks/useFetch';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import classes from './Signin.module.css';

const isNotEmpty = (value) => value.trim() !== '';

const Signin = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const loginedUser = useSelector((state) => state.user);
	const url = useSelector((state) => state.url);
	const LOGIN_URL = `${url}auth/login`;
	const LOGOUT_URL = `${url}auth/logout`;
	const user = {};

	const {
		value: emailValue,
		isValid: emailIsValid,
		hasError: emailHasError,
		valueChangeHandler: emailChangeHandler,
		inputBlurHandler: emailBlurHandler,
		reset: resetEmail,
	} = useInput(isNotEmpty);
	const {
		value: passwordValue,
		isValid: passwordIsValid,
		hasError: passwordHasError,
		valueChangeHandler: passwordChangeHandler,
		inputBlurHandler: passwordBlurHandler,
		reset: resetPassword,
	} = useInput(isNotEmpty);

	// Check client valid input
	let formIsValid = false;
	if (emailIsValid && passwordIsValid) {
		formIsValid = true;
		user.email = emailValue;
		user.password = passwordValue;
	}

	const { error: loginError, fetchHandler: loginFetchHandler } = useFetch(
		LOGIN_URL,
		'POST',
		user
	);
	const { fetchHandler: signoutHandler } = useFetch(LOGOUT_URL, 'POST');

	// LOGIN
	const loginHandler = async (e) => {
		e.preventDefault();
		if (!formIsValid) return;
		const data = await loginFetchHandler();
		if (data?.error) return;
		dispatch({ type: 'LOGIN', user: data.userInfo });
		resetEmail();
		resetPassword();
		navigate('/');
	};

	// LOGOUT
	const logoutHandler = () => {
		signoutHandler();
		dispatch({ type: 'LOGOUT' });
	};

	return (
		<div className={classes.signin}>
			<div className={classes.wrapper}>
				{/* Before login */}
				{!loginedUser?.email && (
					<form onSubmit={loginHandler}>
						<h3>Sign In</h3>

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

						{/* Client-Warning */}
						{emailHasError && (
							<p className={classes['error-text']}>Please enter a email</p>
						)}
						{passwordHasError && (
							<p className={classes['error-text']}>Please enter a password</p>
						)}
						{/* Server-Warning */}
						{loginError && (
							<p className={classes['error-text']}>{loginError.message}</p>
						)}

						<button>SIGN IN</button>
					</form>
				)}

				{/* After login */}
				{!loginedUser?.email && (
					<p>
						Create an account? <Link to='/register'>Sign up</Link>
					</p>
				)}
				{loginedUser?.email && <h1>{`Welcome ${loginedUser.fullname}!`}</h1>}
				{loginedUser?.email && (
					<button className={classes.logout} onClick={logoutHandler}>
						Log out
					</button>
				)}
			</div>
		</div>
	);
};

export default Signin;
