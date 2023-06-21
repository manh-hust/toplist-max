import Comment from '@ant-design/compatible/lib/comment';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Empty, Input, Rate, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import { LANGUAGE_LOGO } from '../../constants/languageLogo';
import MainLayout from '../../layouts/MainLayout';
import { Space, Modal, Checkbox } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { selectedMassagePlaceState } from '../../recoil/Report';
import {useSetRecoilState, useRecoilValue} from 'recoil'
import axios from 'axios';
const { Meta } = Card;

const DetailPlace = () => {
	const { slug } = useParams();
	const [place, setPlace] = useState(null);
	const [loading, setLoading] = useState(true);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [reasons, setReasons] = useState([]); // Declare and initialize reasons state variable
	const [comment, setComment] = useState('');  
	const setSelectedMassagePlace = useSetRecoilState(selectedMassagePlaceState);
	setSelectedMassagePlace(slug);
	const selectedMassagePlace = useRecoilValue(selectedMassagePlaceState);
	const handleCheckboxChange = (checkedValues) => {
		setReasons(checkedValues);
	};
	const handleReportClick = () => {
		setIsModalVisible(true);
	};
	const handleModalOk = async(values) => {
		try {
			const response = await axios.post(
			  `https://toplist-max-api-production.up.railway.app/api/massage-places/${selectedMassagePlace}/reports`,
			  values
			);
			// Handle success
			// message.success('Rate successfully');
			setIsModalVisible(false);
		  } catch (error) {
			// Handle error
			// message.error('Failed to rate');
		  }
		setReasons([]);
		setComment('');
		// Handle submitting the report
	};
	
	  const handleModalCancel = () => {
		setIsModalVisible(false);
		setReasons([]);
		setComment('');
	};

	useEffect(() => {
		const fetchPlace = async() => {
			try {
				const response = await axiosClient.get(`/massage-places/${slug}`);
				setPlace(response.data);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		};
		fetchPlace();
	}, [slug]);

	return (
		<MainLayout>
			{!loading ? (
				<div>
					<div className="my-20 flex w-full justify-center">
						<div className=" mr-24">
							<Card
								className="mx-6 my-4 relative"
								hoverable
								style={{ width: 360, height: 560 }}
								cover={
									<img
										alt="example"
										src="https://cdn.spafinder.com/2015/08/massage.jpg"
										className="h-80 w-full object-cover"
									/>
								}
							>
								<Meta title={place.name} description={place.address} />
								<Rate className="mt-16" disabled defaultValue={place.rate} />
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
							<Space direction="horizontal">
  								<Button type="primary" icon={<ExclamationCircleOutlined />} size="large" style={{ backgroundColor: 'yellow' , color: 'black'}} onClick={handleReportClick}>
   										 Report
 								 </Button>
  								<Button type="primary" ghost>
   									 More information
 								 </Button>
							</Space>
							<div className="flex items-center">
								<span className="text-xl mr-4">Staff list</span>
								<div>
									<Avatar className="mr-2" size={64} icon={<UserOutlined />} />
									<Avatar className="mr-2" size={64} icon={<UserOutlined />} />
									<Avatar className="mr-2" size={64} icon={<UserOutlined />} />
									<Avatar className="mr-2" size={64} icon={<UserOutlined />} />
									<Avatar className="mr-2" size={64} icon={<UserOutlined />} />
									<Avatar className="mr-2" size={64} icon={<UserOutlined />} />
								</div>
							</div>
						</div>
					</div>
					<div className="mb-24 ml-[340px]">
						<span className="text-xl">Comments</span>
						<div className="">
							<Comment
								author={<a>Han Solo</a>}
								className="mt-4"
								avatar={
									<Avatar
										src="https://joeschmoe.io/api/v1/random"
										alt="Han Solo"
									/>
								}
								content={
									<p>
										We supply a series of design principles, practical patterns
										and high quality design resources (Sketch and Axure), to
										help people create their product prototypes beautifully and
										efficiently.
									</p>
								}
								datetime={
									<div className="flex items-start relative">
										<Tooltip title="2016-11-22 11:22:33" className="mr-2">
											<span>8 hours ago</span>
										</Tooltip>
										<Rate
											disabled
											defaultValue={5}
											className="absolute left-20 -bottom-1"
										/>
									</div>
								}
							/>
							<Comment
								author={<a>Solo kill</a>}
								className="mt-4"
								avatar={
									<Avatar
										src="https://joeschmoe.io/api/v1/random"
										alt="Han Solo"
									/>
								}
								content={
									<p>
										(Sketch and Axure), to help people create their product
										prototypes beautifully and efficiently.
									</p>
								}
								datetime={
									<div className="flex items-start relative">
										<Tooltip title="2016-11-22 11:22:33" className="mr-2">
											<span>8 hours ago</span>
										</Tooltip>
										<Rate
											disabled
											defaultValue={4}
											className="absolute left-20 -bottom-1"
										/>
									</div>
								}
							/>
							<Comment
								author={<a>Mimi</a>}
								className="mt-4"
								avatar={
									<Avatar
										src="https://joeschmoe.io/api/v1/random"
										alt="Han Solo"
									/>
								}
								content={
									<p>
										We their product prototypes beautifully and efficiently.
									</p>
								}
								datetime={
									<div className="flex items-start relative">
										<Tooltip title="2016-11-22 11:22:33" className="mr-2">
											<span>8 hours ago</span>
										</Tooltip>
										<Rate
											disabled
											defaultValue={3}
											className="absolute left-20 -bottom-1"
										/>
									</div>
								}
							/>
						</div>
					</div>
				</div>
			) : (
				<Empty />
			)}
			 <Modal
				title={ <div className="flex justify-center">
					<div className="bg-yellow-500 text-white px-4 py-2 rounded-full" style={{ width: 'fit-content' }}>
					<ExclamationCircleOutlined className="mr-2" />
						Report Place
					</div>
				</div>
				}
				visible={isModalVisible}
				onOk={handleModalOk}
				onCancel={handleModalCancel}
				footer={[
					<div className="flex justify-center" key="submit">
					<Button
					  type="primary"
					  size="large"
					  style={{ backgroundColor: 'yellow', color: 'black' }}
					  onClick={handleModalOk}
					>
					  Submit
					</Button>
				  </div>
				]}
			>
				<div>
				<p>Reason:</p>
				<div className="mb-4">
					<Checkbox.Group
					options={['Wrong Information', 'Something Else']}
					value={reasons}
					onChange={handleCheckboxChange}
					/>
				</div>
				<p>Write detail</p>
				<Input.TextArea
					rows={4}
					placeholder="Additional comments (optional)"
					value={comment}
					onChange={(e) => setComment(e.target.value)}
				/>
				</div>
  			</Modal>
		</MainLayout>
	);
};

export default DetailPlace;
