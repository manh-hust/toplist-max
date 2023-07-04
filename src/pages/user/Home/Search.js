import { Input, Select } from 'antd';
import React from 'react';
import { AiFillStar, AiOutlineClose } from 'react-icons/ai';
import { BsTranslate } from 'react-icons/bs';
import { GrMap } from 'react-icons/gr';
import { useSetRecoilState } from 'recoil';
import axiosClient from '../../../api/axiosClient';
import { LANGUAGE_LOGO } from '../../../constants/languageLogo';
import useSearchPlaces from '../../../hooks/useSearchPlaces';
import placeListState from '../../../recoil/listPlace';
import popupSearchState from '../../../recoil/popupSearch';

const Search = () => {
	const [filters, setFilters] = React.useState({
		rate: '',
		language: '',
		address: '',
	});

	const options = Object.keys(LANGUAGE_LOGO).map((key) => ({
		value: key,
		label: key,
	}));

	const setPlaces = useSetRecoilState(placeListState);
	const setPopupSearch = useSetRecoilState(popupSearchState);
	const { handleSearch } = useSearchPlaces();
	const handleSearchPlaces = async ({ rate, language, address }) => {
		try {
			let query = '/massage-places?';
			if (rate) query += `rate=${rate}&`;
			if (language) query += `language=${language}&`;
			if (address) query += `address=${address}`;
			const { data } = await axiosClient.get(query);
			setPlaces(data);
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div className="mt-4 h-[720px] border-l-2">
			<div className="mx-4 flex justify-between items-center">
				<h1 className="text-2xl">Find filters</h1>
				<AiOutlineClose
					className="w-6 cursor-pointer"
					onClick={() => {
						setPopupSearch((prev) => !prev);
						handleSearch();
					}}
				/>
			</div>
			<div className="mt-8 px-4">
				<div className="flex mb-8">
					<GrMap className="w-8 h-8 mr-2" />
					<Input
						placeholder="Enter address"
						onChange={(e) => {
							setFilters({ ...filters, address: e.target.value });
							handleSearchPlaces({ ...filters, address: e.target.value });
						}}
					/>
				</div>
				<div className="flex mb-8">
					<BsTranslate className="w-8 h-8 mr-2" />
					<Select
						showSearch
						style={{
							width: 200,
						}}
						placeholder="Search by language"
						optionFilterProp="children"
						filterOption={(input, option) =>
							(option?.label ?? '').includes(input)
						}
						filterSort={(optionA, optionB) =>
							(optionA?.label ?? '')
								.toLowerCase()
								.localeCompare((optionB?.label ?? '').toLowerCase())
						}
						options={options}
						onChange={(value) => {
							setFilters({ ...filters, language: value });
							handleSearchPlaces({ ...filters, language: value });
						}}
					/>
				</div>
				<div className="flex">
					<AiFillStar className="w-8 h-8 mr-2" />
					<Select
						defaultValue=""
						style={{ width: 120 }}
						allowClear
						options={[
							{ value: '1', label: '1' },
							{ value: '2', label: '2' },
							{ value: '3', label: '3' },
							{ value: '4', label: '4' },
							{ value: '5', label: '5' },
						]}
						onChange={(value) => {
							setFilters({ ...filters, rate: value });
							handleSearchPlaces({ ...filters, rate: value });
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default Search;
