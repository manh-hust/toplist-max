import { Modal, Space, Table, Tag, message } from 'antd';
import { useEffect, useState } from 'react';
import axiosClient from '../../../api/axiosClient';
import { getStatus } from '../../../constants/commons';
import AdminLayout from '../../../layouts/AdminLayout';
import SideBar from './SideBar';

const RegisterRequest = () => {
	const [places, setPlaces] = useState([]);
	const [messageApi, contextHolder] = message.useMessage();
	const [isLoading, setIsLoading] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [showModalReject, setShowModalReject] = useState(false);
	const [id, setId] = useState(null);
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
			render: (text) => <Tag color="yellow">{text.toUpperCase()}</Tag>,
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
						color="green"
						className="cursor-pointer"
						onClick={() => {
							setShowModal(true);
							setId(record.key);
						}}
					>
						Accept
					</Tag>
					<Tag
						color="red"
						className="cursor-pointer"
						onClick={() => {
							setShowModalReject(true);
							setId(record.key);
						}}
					>
						Reject
					</Tag>
				</Space>
			),
		},
	];

	const handleApprove = async () => {
		try {
			if (!id) {
				messageApi.open({
					type: 'warning',
					content: 'Please choose a place',
				});
				return;
			}
			setIsLoading(true);
			const response = await axiosClient.post('/massage-places/approve', {
				id,
			});
			if (response.success) {
				messageApi.open({
					type: 'success',
					content: 'Approve success',
				});
				setPlaces((places) => places.filter((place) => place.key !== id));
			}
			setIsLoading(false);
		} catch (error) {
			console.log(error);
			messageApi.open({
				type: 'error',
				content: error.response.data.error[0],
			});
			setIsLoading(false);
		}
	};

	const handleOk = () => {
		handleApprove();
		setId(null);
		setShowModal(false);
	};
	const handleCancel = () => {
		setId(null);
		setShowModal(false);
	};

	const handleReject = async () => {
		try {
			if (!id) {
				messageApi.open({
					type: 'warning',
					content: 'Please choose a place',
				});
				return;
			}
			setIsLoading(true);
			const response = await axiosClient.post('/massage-places/reject', {
				id,
			});
			if (response.success) {
				messageApi.open({
					type: 'success',
					content: 'Reject success',
				});
				setPlaces((places) => places.filter((place) => place.key !== id));
			}
			setIsLoading(false);
		} catch (error) {
			console.log(error);
			messageApi.open({
				type: 'error',
				content: error.response.data.error[0],
			});
			setIsLoading(false);
		}
	};

	const handleCancelReject = () => {
		setId(null);
		setShowModalReject(false);
	};

	const handleOkReject = () => {
		handleReject();
		setId(null);
		setShowModalReject(false);
	};
	useEffect(() => {
		const fetchPlaces = async () => {
			const response = await axiosClient.get('/massage-places/request');
			const data = response.data.map((place) => ({
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
			<div className="flex min-h-screen mt-12">
				<SideBar />
				<div className="flex-1 flex justify-center">
					<Table
						columns={columns}
						dataSource={places || []}
						className="min-w-[1300px]"
					/>
				</div>
			</div>
			{/* Modal approve */}
			<Modal
				title="Confirm approve"
				open={showModal}
				onCancel={handleCancel}
				onOk={handleOk}
				okButtonProps={{ style: { backgroundColor: 'blue' } }}
				confirmLoading={isLoading}
			>
				<p>
					Are you sure you want to approve this place? This action cannot be
					undone.
				</p>
			</Modal>
			{/* Modal reject */}
			<Modal
				title="Confirm reject"
				open={showModalReject}
				onCancel={handleCancelReject}
				onOk={handleOkReject}
				okButtonProps={{ style: { backgroundColor: 'red' } }}
				confirmLoading={isLoading}
			>
				<p>
					Are you sure you want to reject this place? This action cannot be
					undone.
				</p>
			</Modal>
		</AdminLayout>
	);
};

export default RegisterRequest;
