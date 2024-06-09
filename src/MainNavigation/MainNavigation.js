import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import useFetch from '../hooks/useFetch';

import PopupMessage from '../components/PopupMessage/PopupMessage';
import messageIcon from '../images/message_icon.png';

import classes from './MainNavigation.module.css';

const NavBar = () => {
	const navigate = useNavigate();
	const loginedUser = useSelector((state) => state.user);
	const cartItems = useSelector((state) => state.cartItems);
	const url = useSelector((state) => state.url);
	const dispatch = useDispatch();

	const LOGOUT_URL = url + 'auth/logout';
	const LOGIN_URL = url + 'auth/login';
	const { fetchHandler: signoutHandler } = useFetch(LOGOUT_URL, 'POST');

	const logoutHandler = () => {
		signoutHandler();
		dispatch({ type: 'LOGOUT' });
		navigate('/');
	};

	const [isPopupVisible, setIsPopupVisible] = useState(false);
	const togglePopup = () => {
		setIsPopupVisible(!isPopupVisible);
	};

	const numberItems = cartItems.reduce(
		(sum, curr) => sum + Number(curr.quantity),
		0
	);

	useEffect(() => {
		const fetcher = async () => {
			try {
				const response = await fetch(LOGIN_URL, {
					credentials: 'include',
				});
				const resData = await response.json();
				if (!response.ok) {
					if (response.status === 401) {
						console.log(resData);
					} else {
						console.log(`${response.status}: ${response.statusText}`);
					}
				} else {
					dispatch({ type: 'LOGIN', user: resData.userInfo });
				}
			} catch (err) {
				console.log(err);
			}
		};
		fetcher();
	}, []);

	return (
		<header className={classes['main-header']}>
			<nav>
				<ul className={classes.navbar}>
					<li>
						<ul className={classes.navbarLeft}>
							<li>
								<NavLink
									to='/'
									className={({ isActive }) =>
										isActive ? classes.active : undefined
									}
									end
								>
									Home
								</NavLink>
							</li>
							<li>
								<NavLink
									to='/shop'
									className={({ isActive }) =>
										isActive ? classes.active : undefined
									}
								>
									Shop
								</NavLink>
							</li>
						</ul>
					</li>
					<li className={classes.navbarMid}>
						<h4>BOUTIQUE</h4>
					</li>
					<li>
						<ul className={classes.navbarRight}>
							<li>
								<NavLink
									to='/cart'
									className={({ isActive }) =>
										isActive ? classes.active : undefined
									}
								>
									<i className='fa fa-shopping-cart'></i> Cart{' '}
									{`(${numberItems})`}
								</NavLink>
							</li>
							{loginedUser && (
								<li>
									<NavLink
										to={'/history/' + loginedUser._id}
										className={({ isActive }) =>
											isActive ? classes.active : undefined
										}
									>
										<i className='fa fa-th-list'></i> History
									</NavLink>
								</li>
							)}
							<li>
								<NavLink
									to='/login'
									className={({ isActive }) =>
										isActive ? classes.active : undefined
									}
								>
									<i className='fa fa-user'></i>{' '}
									{loginedUser ? loginedUser.fullname : 'Login'}{' '}
									{loginedUser && <i className='fa fa-caret-down' />}
								</NavLink>
							</li>
							{loginedUser ? (
								<li>
									<button onClick={logoutHandler}>(Logout)</button>
								</li>
							) : undefined}
						</ul>
					</li>
				</ul>
			</nav>

			{/* Popup message */}

			<div className={classes.messageIcon}>
				<img src={messageIcon} alt='message-icon' onClick={togglePopup} />
			</div>
			{isPopupVisible && <PopupMessage />}
		</header>
	);
};

export default NavBar;
