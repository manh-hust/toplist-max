import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import axiosClient from '../api/axiosClient';
import useSearchPlaces from './useSearchPlaces';
import staffListState from '../recoil/listStaff';

const useSearchStaffs = (placeId) =>{
	const [staffs, setStaffs] = useRecoilState(staffListState);

	useEffect(() => {
		const fetchStaff = async () => {
			try {
				const { data } = await axiosClient.get(`/massage-places/${placeId}/staffs`);
				setStaffs(data);
			} catch (err){
				console.log(error);
			}
		};
		fetchStaff();
	},[placeId, setStaffs])

	return staffs;
}

export default useSearchStaffs;
