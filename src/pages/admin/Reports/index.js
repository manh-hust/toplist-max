import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Modal, Space, Table, Tag, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import axiosClient from '../../../api/axiosClient';
import AdminLayout from '../../../layouts/AdminLayout';

const Reports = () => {
	const [reports, setReports] = useState([]);
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [messageApi, contextHolder] = message.useMessage();
	const [id, setId] = useState(null);
	const [searchText, setSearchText] = useState('');
	const [searchedColumn, setSearchedColumn] = useState('');
	const searchInput = useRef(null);

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
					place: item.place.name,
					time: item.createdAt,
					placeId: item.place.id,
				}));
				setReports(data);
			} catch (error) {
				console.log('🚀 ~ file: index.js:62 ~ fetchReports ~ error:', error);
			}
		};
		fetchReports();
	}, []);

	const handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	};
	const handleReset = (clearFilters) => {
		clearFilters();
		setSearchText('');
	};
	const getColumnSearchProps = (dataIndex) => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters,
			close,
		}) => (
			<div
				style={{
					padding: 8,
				}}
				onKeyDown={(e) => e.stopPropagation()}
			>
				<Input
					ref={searchInput}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={(e) =>
						setSelectedKeys(e.target.value ? [e.target.value] : [])
					}
					onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
					style={{
						marginBottom: 8,
						display: 'block',
					}}
				/>
				<Space>
					<Button
						type="primary"
						onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
						icon={<SearchOutlined />}
						size="small"
						style={{
							width: 90,
						}}
						className="flex items-center bg-blue-500"
					>
						Search
					</Button>
					<Button
						onClick={() => {
							clearFilters && handleReset(clearFilters);
							handleSearch(selectedKeys, confirm, dataIndex);
						}}
						size="small"
						style={{
							width: 90,
						}}
					>
						Reset
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered) => (
			<SearchOutlined
				style={{
					color: filtered ? '#1677ff' : undefined,
				}}
			/>
		),
		onFilter: (value, record) =>
			record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
		onFilterDropdownOpenChange: (visible) => {
			if (visible) {
				setTimeout(() => searchInput.current?.select(), 100);
			}
		},
		render: (text) =>
			searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{
						backgroundColor: '#fff',
						padding: 0,
					}}
					searchWords={[searchText]}
					autoEscape
					textToHighlight={text ? text.toString() : ''}
				/>
			) : (
				text
			),
	});

	const columns = [
		{
			title: 'Nickname',
			dataIndex: 'nickname',
			key: 'nickname',
			...getColumnSearchProps('nickname'),
		},
		{
			title: 'Content',
			dataIndex: 'content',
			key: 'content',
			...getColumnSearchProps('content'),
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
			...getColumnSearchProps('place'),
		},
		{
			title: 'Create at',
			key: 'time',
			dataIndex: 'time',
			sorter: (a, b) => a.time.localeCompare(b.time),
		},
		{
			title: 'Action',
			key: 'action',
			render: (_, record) => (
				<Space size="middle">
					<Tag color="blue" className="cursor-pointer">
						<a href={`/massage-places/${record.placeId}`} target="blank">
							Detail
						</a>
					</Tag>
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
