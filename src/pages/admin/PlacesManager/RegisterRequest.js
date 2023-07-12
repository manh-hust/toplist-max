import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Modal, Space, Table, Tag, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import axiosClient from '../../../api/axiosClient';
import { getStatus } from '../../../constants/commons';
import { LANGUAGES } from '../../../constants/languages';
import AdminLayout from '../../../layouts/AdminLayout';

const RegisterRequest = () => {
	const [places, setPlaces] = useState([]);
	const [messageApi, contextHolder] = message.useMessage();
	const [isLoading, setIsLoading] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [showModalReject, setShowModalReject] = useState(false);
	const [id, setId] = useState(null);
	const [searchText, setSearchText] = useState('');
	const [searchedColumn, setSearchedColumn] = useState('');
	const searchInput = useRef(null);

	const filterLanguages = LANGUAGES.map((key) => ({
		text: key,
		value: key,
	}));

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
			const response = await axiosClient.post('/admin/massage-places/approve', {
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
			const response = await axiosClient.post('/admin/massage-places/reject', {
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
			const response = await axiosClient.get('/admin/massage-places/request');
			const data = response.data.map((place) => ({
				key: place.id,
				name: place.name,
				address: place.address,
				status: getStatus(place?.status),
				description: place.reviewContent,
				time: place.createdAt,
				languages: place.serviceLanguages,
			}));
			setPlaces(data);
		};
		fetchPlaces();
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
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			...getColumnSearchProps('name'),
		},
		{
			title: 'Address',
			dataIndex: 'address',
			key: 'address',
			...getColumnSearchProps('address'),
		},
		{
			title: 'Description',
			dataIndex: 'description',
			key: 'description',
			render: (text) => <span>{text || 'Not update'}</span>,
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
			filters: filterLanguages,
			onFilter: (value, record) => {
				const languages = record.languages.map((tag) => tag.language);
				return languages.includes(value);
			},
			filterSearch: true,
			render: (_, { languages }) => (
				<>
					{languages.map((tag) => {
						return <Tag key={tag.language}>{tag.language}</Tag>;
					})}
				</>
			),
		},
		{
			title: 'Created at',
			dataIndex: 'time',
			key: 'time',
			className: 'w-32',
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
	return (
		<AdminLayout>
			{contextHolder}
			<div className="flex-1 flex justify-center">
				<Table
					columns={columns}
					dataSource={places || []}
					className="min-w-[1300px]"
				/>
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
