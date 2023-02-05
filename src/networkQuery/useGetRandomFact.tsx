import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';

interface IGetRandomFacts {
	onCompleted: (data: IRandomFactsResponse) => void;
}

const defaultProps = { onCompleted: () => {} };


/*
* A custom React hook that makes a GET request to an API https://uselessfacts.jsph.pl/random.json and returns an object with 4 properties:
*  the API response data, an error message, a boolean indicating if the request has completed,
*  and a function to make the API request.
*  The hook has an optional callback function that is called when the API request is successful.
* */

const UseGetRandomFact = ({ onCompleted }: IGetRandomFacts = defaultProps) => {
	const [data, setData] = useState(null);
	const [error, setError] = useState('');
	const [isLoaded, setIsLoaded] = useState(false);
	
	const makeQuery = () => {
		axios
		 .get('https://uselessfacts.jsph.pl/random.json')
		 .then((res) => {
			 onCompleted(res.data);
			 setData(res.data);
		 })
		 .catch((error) => setError(error.message))
		 .finally(() => setIsLoaded(true));
	};
	
	return { data, error, isLoaded, makeQuery };
};

export default UseGetRandomFact;
