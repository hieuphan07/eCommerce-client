import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { useSelector } from 'react-redux';

const RouteProtect = ({ children }) => {
	const url = useSelector((state) => state.url);
	const LOGIN_URL = `${url}auth/login`;
	const { loading, result: user, fetchHandler } = useFetch(LOGIN_URL);

	useEffect(() => {
		fetchHandler();
	}, []);

	if (!loading && !user) {
		return <Navigate to='/login' />;
	}
	return children;
};

export default RouteProtect;
