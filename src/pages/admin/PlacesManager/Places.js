import { Space, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import axiosClient from '../../../api/axiosClient';
import { getStatus } from '../../../constants/commons';
import AdminLayout from '../../../layouts/AdminLayout';
import SideBar from './SideBar';

const columns = [
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
		render: (text) => <a>{text}</a>,
	},
	{
		title: 'Address',
		dataIndex: 'address',
		key: 'address',
	},
	{
		title: 'Phone number',
		dataIndex: 'phone',
		key: 'phone',
		render: (text) => <a>{text || 'Not update'}</a>,
	},
	{
		title: 'Status',
		dataIndex: 'status',
		key: 'status',
		render: (text) => <Tag color="blue">{text.toUpperCase()}</Tag>,
	},
	{
		title: 'Languages',
		key: 'languages',
		dataIndex: 'languages',
		render: (_, { languages }) => (
			<>
				{languages.map((tag) => {
					return <Tag key={tag.language}>{tag.language}</Tag>;
				})}
			</>
		),
	},
	{
		title: 'Action',
		key: 'action',
		render: (_, record) => (
			<Space size="middle">
				<Tag color="blue" className="cursor-pointer">
					<a href={`/massage-places/${record.key}`} target="blank">
						Detail
					</a>
				</Tag>
				<Tag color="red" className="cursor-pointer">
					Delete
				</Tag>
			</Space>
		),
	},
];

const Places = () => {
	const [places, setPlaces] = useState([]);

	useEffect(() => {
		const fetchPlaces = async () => {
			const response = await axiosClient.get('/massage-places?limit=100');
			const data = response.data.massagePlaces.map((place) => ({
				key: place.id,
				name: place.name,
				address: place.address,
				status: getStatus(place?.status),
				languages: place.serviceLanguages,
			}));
			setPlaces(data);
		};
		fetchPlaces();
	}, []);

	return (
		<AdminLayout>
			<div className="flex min-h-screen mt-12">
				<SideBar />
				<div className="w-full flex justify-center">
					<Table
						columns={columns}
						dataSource={places || []}
						className="min-w-[1300px]"
					/>
				</div>
			</div>
		</AdminLayout>
	);
};

export default Places;
