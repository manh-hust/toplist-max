import { Modal, Space, Table, Tag, message } from 'antd';
import { useEffect, useState } from 'react';
import axiosClient from '../../../api/axiosClient';
import AdminLayout from '../../../layouts/AdminLayout';

const Reports = () => {
	const [reports, setReports] = useState([]);
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [messageApi, contextHolder] = message.useMessage();
	const [id, setId] = useState(null);

	const columns = [
		{
			title: 'Nickname',
			dataIndex: 'nickname',
			key: 'nickname',
			render: (text) => <span>{text}</span>,
		},
		{
			title: 'Content',
			dataIndex: 'content',
			key: 'content',
			render: (text) => <span>{text}</span>,
		},
		{
			title: 'Email address',
			dataIndex: 'email',
			key: 'email',
			render: (text) => <span>{text || 'Not update'}</span>,
		},
		{
			title: 'Massage place',
			dataIndex: 'place',
			key: 'place',
			render: (place) => (
				<a href={`/massage-places/${place?.id}`} target="blank">
					{place?.name}
				</a>
			),
		},
		{
			title: 'Create at',
			key: 'time',
			dataIndex: 'time',
			render: (text) => <span>{text}</span>,
		},
		{
			title: 'Action',
			key: 'action',
			render: (_, record) => (
				<Space size="middle">
					<Tag
						color="red"
						className="cursor-pointer"
						onClick={() => {
							setIsOpenModal(true);
							setId(record.key);
						}}
					>
						Delete
					</Tag>
				</Space>
			),
		},
	];

	const handleOk = async () => {
		await handleDelete();
		setId(null);
		setIsOpenModal(false);
	};
	const handleCancel = () => {
		setId(null);
		setIsOpenModal(false);
	};

	const handleDelete = async () => {
		try {
			await axiosClient.delete(`/admin/reports/${id}`);
			setReports(reports.filter((item) => item.key !== id));
			setId(null);
			setIsOpenModal(false);
			messageApi.success('Delete report successfully');
		} catch (error) {
			console.log('🚀 ~ file: index.js:62 ~ fetchReports ~ error:', error);
			messageApi.error('Delete report failed');
		}
	};
	useEffect(() => {
		const fetchReports = async () => {
			try {
				const response = await axiosClient.get('/admin/reports');
				const data = response.data.map((item) => ({
					key: item.id,
					nickname: item.nickname,
					content: item.content,
					email: item.email,
					place: item.place,
					time: item.createdAt,
				}));
				setReports(data);
			} catch (error) {
				console.log('🚀 ~ file: index.js:62 ~ fetchReports ~ error:', error);
			}
		};
		fetchReports();
	}, []);

	return (
		<AdminLayout>
			{contextHolder}
			<div className="w-full flex justify-center">
				<Table
					columns={columns}
					dataSource={reports || []}
					className="min-w-[1300px]"
				/>
			</div>
			<Modal
				title="Confirm delete"
				open={isOpenModal}
				onCancel={handleCancel}
				onOk={handleOk}
				okButtonProps={{ style: { backgroundColor: 'red' } }}
			>
				<p>
					Are you sure you want to delete this report? This action cannot be
					undone.
				</p>
			</Modal>
		</AdminLayout>
	);
};

export default Reports;
