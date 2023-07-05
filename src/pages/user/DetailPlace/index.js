import Comment from '@ant-design/compatible/lib/comment';
import { UserOutlined } from '@ant-design/icons';
import {
	Avatar,
	Button,
	Card,
	Checkbox,
	Form,
	Input,
	Modal,
	Rate,
	Spin,
	Tooltip,
	message,
} from 'antd';
import dayjs from 'dayjs';
import { AiFillHeart } from 'react-icons/ai';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import axiosClient from '../../../api/axiosClient';
import { LANGUAGE_LOGO } from '../../../constants/languages';
import MainLayout from '../../../layouts/MainLayout';
import { selectedMassagePlaceState } from '../../../recoil/apiState';
import CommentModal from './CommentModal';
import RatingModal from './RatingModal';
const { Meta } = Card;
const { TextArea } = Input;

const DetailPlace = () => {
	const [form] = Form.useForm();
	const { slug } = useParams();
	const [place, setPlace] = useState(null);
	const [loading, setLoading] = useState(true);
	const [comments, setComments] = useState([]);
	const [ratings, setRatings] = useState([]);
	const [staffs, setStaffs] = useState([]);
	const [newComment, setNewComment] = useState(true);
	const [newRating, setNewRating] = useState(true);
	const setSelectedMassagePlace = useSetRecoilState(selectedMassagePlaceState);
	setSelectedMassagePlace(slug);

	const [selectedStaff, setSelectedStaff] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);
	const [isModalReportVisible, setIsModalReportVisible] = useState(false);

	const [messageApi, contextHolder] = message.useMessage();

	const handleIconClik = (staff) => {
		setSelectedStaff(staff);
		setModalVisible(true);
	};
	useEffect(() => {
		const fetchPlace = async () => {
			try {
				const response = await axiosClient.get(`/massage-places/${slug}`);
				setPlace(response.data);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		};
		fetchPlace();
	}, [slug, setSelectedMassagePlace]);

	useEffect(() => {
		const fetchComments = async () => {
			try {
				const response = await axiosClient.get(
					`/massage-places/${slug}/comments`
				);
				setComments(response.data);
				setLoading(false);
			} catch (error) {
				console.error(error);
			}
		};
		if (place) {
			fetchComments();
		}
	}, [place, slug, newComment]);

	useEffect(() => {
		const fetchRatings = async () => {
			try {
				const response = await axiosClient.get(
					`/massage-places/${slug}/ratings`
				);
				console.log(
					'🚀 ~ file: index.js:90 ~ fetchRatings ~ response:',
					response.data
				);

				setRatings(response.data);
				setLoading(false);
			} catch (error) {
				console.error(error);
			}
		};
		if (place) {
			fetchRatings();
		}
	}, [place, slug, newRating]);

	useEffect(() => {
		const fetchStaffs = async () => {
			try {
				const response = await axiosClient.get(
					`/massage-places/${slug}/staffs`
				);
				setStaffs(response.data);
				setLoading(false);
			} catch (error) {
				console.error(error);
			}
		};
		if (place) {
			fetchStaffs();
		}
	}, [place, slug]);

	const handleModalOk = () => {
		setIsModalReportVisible(false);
	};

	const handleModalCancel = () => {
		setIsModalReportVisible(false);
		form.resetFields();
	};

	const handleSendReport = async (value) => {
		try {
			const response = await axiosClient.post(
				`/massage-places/${slug}/reports`,
				value
			);
			messageApi.open({
				type: 'success',
				content: 'Report successfully',
			});
			handleModalCancel();
		} catch (error) {
			console.log(error.response.data.error[0]);
			messageApi.open({
				type: 'error',
				content: error.response.data.error[0],
			});
		}
	};

	console.log(place);

	return (
		<MainLayout>
			{contextHolder}
			{!loading ? (
				<div>
					<div className="mt-16 flex w-full justify-center mb-12">
						<div className=" mr-24">
							<Card
								className="mx-6 my-4 relative"
								hoverable
								style={{ width: 360, height: 500 }}
								cover={
									<img
										alt="example"
										src={
											place.photoUrl
												? place.photoUrl
												: 'https://cdn.spafinder.com/2015/08/massage.jpg'
										}
										className="h-80 w-full object-cover"
									/>
								}
							>
								<Meta title={place.name} description={place.address} />
								<Rate
									className="mt-12 text-red-500"
									disabled
									defaultValue={place.rate}
									character={<AiFillHeart />}
								/>
							</Card>
						</div>
						<div className="mt-2 w-1/3">
							<div className="mb-12 flex items-center">
								<span className="text-xl mr-4">Name</span>
								<Input
									size="large"
									placeholder={place.name}
									prefix={<UserOutlined />}
									disabled
								/>
							</div>
							<div className="mb-12 flex items-center">
								<span className="text-xl mr-4">Locate</span>
								<Input
									size="large"
									placeholder={place.address}
									prefix={<UserOutlined />}
									disabled
								/>
							</div>
							<div className="flex items-center mb-12">
								<span className="text-xl mr-4">Language</span>
								<Avatar.Group
									maxCount={6}
									maxPopoverTrigger="click"
									size="large"
									maxStyle={{
										color: '#f56a00',
										backgroundColor: '#fde3cf',
										cursor: 'pointer',
									}}
								>
									{place.serviceLanguages.map((serviceLanguage) => (
										<div className="border-2 mr-4 ">
											<Avatar
												src={LANGUAGE_LOGO[serviceLanguage.language]}
												className="border-2"
											/>
										</div>
									))}
								</Avatar.Group>
							</div>
							<div className="mb-12 flex items-start flex-col">
								<span className="text-xl mr-4 mb-4">More information</span>
								<TextArea
									type="primary mb-12"
									placeholder={place.reviewContent}
									disabled
									autoSize={{ minRows: 5 }}
								/>
							</div>
							<div className="flex flex-col">
								<span className="text-xl mr-4 mb-4">Staff List</span>
								<div className="flex items-center">
									{staffs.map((staff) => (
										<Avatar
											key={staff.id}
											className="mr-2 cursor-pointer"
											size={64}
											src={staff.image}
											onClick={() => handleIconClik(staff)}
										/>
									))}
								</div>
							</div>
						</div>
						{/* Report button */}
						<div className="ml-8 mt-2 w-3/3">
							<div className="mb-12 flex items-center">
								<button
									className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 border-b-4 border-yellow-700 hover:border-yellow-500 rounded-full"
									onClick={() => {
										setIsModalReportVisible(true);
									}}
								>
									Report
								</button>
							</div>
						</div>
					</div>

					{/* List rating */}
					<div className="mb-24 ml-[280px]">
						<span className="text-xl">Ratings</span>
						<div className="">
							{ratings && ratings.length > 0 ? (
								ratings.map((comment) => (
									<Comment
										key={comment.index}
										author={<a>{comment.nickname}</a>}
										className="mt-4"
										avatar={
											<Avatar
												src="https://joeschmoe.io/api/v1/random"
												alt={comment.nickname}
											/>
										}
										content={<p>{comment.content}</p>}
										datetime={
											<div className="flex items-start relative">
												<Tooltip title={comment.createdAt} className="mr-2">
													<span>
														{dayjs(comment.createdAt)
															.add(7, 'hours')
															.format('YYYY-MM-DD HH:mm:ss')}
													</span>
												</Tooltip>
												<Rate
													disabled
													character={<AiFillHeart />}
													value={comment.point}
													className="absolute left-32 -bottom-1 text-red-500"
												/>
											</div>
										}
									/>
								))
							) : (
								<p>No ratings available.</p>
							)}
						</div>
						<RatingModal setNewRating={setNewRating} />
					</div>

					{/* List comment */}
					<div className="mb-24 ml-[280px]">
						<span className="text-xl">Comments</span>
						<div className="">
							{comments && comments.length > 0 ? (
								comments.map((comment) => (
									<Comment
										key={comment.index}
										author={<a>{comment.nickname}</a>}
										className="mt-4"
										avatar={
											<Avatar
												src="https://joeschmoe.io/api/v1/random"
												alt={comment.nickname}
											/>
										}
										content={<p>{comment.content}</p>}
										datetime={
											<div className="flex items-start relative">
												<Tooltip title={comment.createdAt} className="mr-2">
													<span>
														{dayjs(comment.createdAt)
															.add(7, 'hours')
															.format('YYYY-MM-DD HH:mm:ss')}
													</span>
												</Tooltip>
											</div>
										}
									/>
								))
							) : (
								<p>No comments available.</p>
							)}
						</div>
						<CommentModal setNewComment={setNewComment} />
					</div>

					{/* Staff modal*/}
					<Modal
						visible={modalVisible}
						onCancel={() => setModalVisible(false)}
						footer={null}
						className="w-[800px]"
					>
						{selectedStaff && (
							<div className="p-0 m-0">
								<h1 className="text-center text-2xl font-bold mb-4 border-b-2 pb-4 ">
									Staff
								</h1>
								<div className="flex">
									<div className="mr-10">
										<div className="mb-12 flex items-center">
											<span className="text-xl mr-4">Name</span>
											<Input
												size="large"
												placeholder={selectedStaff.name}
												prefix={<UserOutlined />}
												disabled
											/>
										</div>
										<div className="mb-12 flex items-center">
											<span className="text-xl mr-4">Sex</span>
											<Input size="large" placeholder={null} disabled />
										</div>
										<div className="mb-12 flex items-center">
											<span className="text-xl mr-4">Experience</span>
											<Input
												size="large"
												placeholder={selectedStaff.experience}
												disabled
											/>
										</div>
									</div>
									<div className="w-36">
										<img src={selectedStaff.image} />
									</div>
								</div>
								<div className="flex items-center mb-12">
									<span className="text-xl mr-4">Language</span>
									<Avatar.Group
										maxCount={6}
										maxPopoverTrigger="click"
										size="large"
										maxStyle={{
											color: '#f56a00',
											backgroundColor: '#fde3cf',
											cursor: 'pointer',
										}}
									>
										{selectedStaff.languages
											.filter(
												(language, index, self) =>
													index ===
													self.findIndex(
														(t) => t.language === language.language
													)
											)
											.map((language) => (
												<div className="border-2 mr-4 ">
													<Avatar
														src={LANGUAGE_LOGO[language.language]}
														className="border-2"
													/>
												</div>
											))}
									</Avatar.Group>
								</div>
								<div className="flex justify-center">
									<Button
										className="bg-yellow-500 w-24"
										onClick={() => setModalVisible(false)}
									>
										OK
									</Button>
								</div>
								<p>{selectedStaff.position}</p>
							</div>
						)}
					</Modal>
					{/* Report modal*/}
					<Modal
						title={
							<div className="flex justify-center">
								<div className="bg-yellow-500 text-white px-4 py-2 rounded-full mb-4">
									Report Place
								</div>
							</div>
						}
						visible={isModalReportVisible}
						onOk={handleModalOk}
						onCancel={handleModalCancel}
						footer={null}
					>
						<Form form={form} onFinish={handleSendReport}>
							<Form.Item
								label="Nickname"
								name="nickname"
								rules={[{ required: true }]}
							>
								<Input placeholder="Nickname" />
							</Form.Item>
							<Form.Item label="Reason" name="reasons">
								<Checkbox.Group
									options={['Wrong Information', 'Something Else']}
								/>
							</Form.Item>
							<Form.Item
								label="Write detail"
								name="content"
								rules={[{ required: true }]}
							>
								<Input.TextArea
									rows={4}
									placeholder="Additional comments (optional)"
								/>
							</Form.Item>
							<Form.Item className="flex justify-center">
								<Button
									type="primary"
									size="large"
									className="rounded-lg mt-8 bg-yellow-500 text-black hover:bg-yellow-400"
									htmlType="submit"
								>
									Submit
								</Button>
							</Form.Item>
						</Form>
					</Modal>
				</div>
			) : (
				<div className="flex justify-center my-72">
					{/* <Empty /> */}
					<Spin />
				</div>
			)}
		</MainLayout>
	);
};

export default DetailPlace;
