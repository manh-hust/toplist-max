import { Space, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import axiosClient from '../../../api/axiosClient';
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
				<Tag color="green" className="cursor-pointer">
					Accept
				</Tag>
				<Tag color="red" className="cursor-pointer">
					Reject
				</Tag>
			</Space>
		),
	},
];

const Places = () => {
	const [places, setPlaces] = useState([]);

	useEffect(() => {
		const fetchPlaces = async () => {
			const response = await axiosClient.get('/massage-places/request');
			setPlaces(response.data);
		};
		fetchPlaces();
	}, []);

	const data = places?.map((place) => ({
		key: place.id,
		name: place.name,
		address: place.address,
		status: 'Pending',
		languages: place.serviceLanguages,
	}));

	return (
		<AdminLayout>
			<div className="flex w-screen">
				<div className="w-1/5">
					<SideBar />
				</div>
				<div className="w-full flex justify-center">
					<Table columns={columns} dataSource={data || []} />
				</div>
			</div>
		</AdminLayout>
	);
};

export default Places;
