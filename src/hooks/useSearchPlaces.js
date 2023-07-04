import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import axiosClient from '../api/axiosClient';
import placeListState from '../recoil/listPlace';

const useSearchPlaces = () => {
	const [places, setPlaces] = useRecoilState(placeListState);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchMassagePlaces = async () => {
			try {
				setLoading(true);
				const { data } = await axiosClient.get('/massage-places?limit=100');
				setPlaces(data);
				setLoading(false);
			} catch (err) {
				setLoading(false);
			}
		};
		fetchMassagePlaces();
	}, []);

	const handleSearch = async () => {
		try {
			setLoading(true);
			const { data } = await axiosClient.get(`/massage-places`);
			setPlaces(data);
			setLoading(false);
		} catch (err) {
			setLoading(false);
		}
	};

	return {
		places,
		handleSearch,
	};
};

export default useSearchPlaces;
