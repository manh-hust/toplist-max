import { Modal, Space, Table, Tag, message } from 'antd';
import { useEffect, useState } from 'react';
import axiosClient from '../../../api/axiosClient';
import { getStatus } from '../../../constants/commons';
import AdminLayout from '../../../layouts/AdminLayout';

const Places = () => {
	const [places, setPlaces] = useState([]);
	const [id, setId] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [messageApi, contextHolder] = message.useMessage();
	const [isLoading, setIsLoading] = useState(false);

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
					<Tag
						color="red"
						className="cursor-pointer"
						onClick={() => {
							setShowModal(true);
							setId(record.key);
						}}
					>
						Delete
					</Tag>
				</Space>
			),
		},
	];

	const handleOk = () => {
		handleDelete();
		setId(null);
		setShowModal(false);
	};
	const handleCancel = () => {
		setId(null);
		setShowModal(false);
	};

	const handleDelete = async () => {
		try {
			setIsLoading(true);
			const response = await axiosClient.post('/admin/massage-places/reject', {
				id,
			});
			if (response.success) {
				messageApi.success('Delete place successfully');
				const newPlaces = places.filter((place) => place.key !== id);
				setPlaces(newPlaces);
			}
		} catch (error) {
			messageApi.error('Delete place failed');
		} finally {
			setIsLoading(false);
		}
	};

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
			{contextHolder}
			<div className="w-full flex justify-center">
				<Table
					columns={columns}
					dataSource={places || []}
					className="min-w-[1300px]"
				/>
			</div>
			{/* Modal reject */}
			<Modal
				title="Confirm delete"
				open={showModal}
				onCancel={handleCancel}
				onOk={handleOk}
				okButtonProps={{ style: { backgroundColor: 'red' } }}
				confirmLoading={isLoading}
			>
				<p>
					Are you sure you want to delete this place? This action cannot be
					undone.
				</p>
			</Modal>
		</AdminLayout>
	);
};

export default Places;
