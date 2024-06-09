import { useState } from 'react';

const useFetch = (url, method, body) => {
	const [loading, setLoading] = useState(true);
	const [result, setResult] = useState();
	const [error, setError] = useState(null);

	const fetcherConfig = method
		? {
				method: method,
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
		  }
		: { credentials: 'include' };

	const fetchHandler = async () => {
		try {
			setLoading(true);
			const response = await fetch(url, fetcherConfig);
			const resData = await response.json();
			if (!response.ok) {
				setError(resData.error);
			} else {
				if (resData.error) {
					setError(resData.error);
				} else {
					setResult(resData);
				}
			}
			setLoading(false);
			return resData;
		} catch (err) {
			console.log(err);
		}
	};

	return { loading, result: result, error: error, fetchHandler: fetchHandler };
};

export default useFetch;
