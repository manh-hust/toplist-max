import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
	Button,
	DatePicker,
	Divider,
	Form,
	Input,
	InputNumber,
	Modal,
	Select,
	Spin,
	Upload,
	message,
} from 'antd';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react';
import axiosClient from '../../api/axiosClient';
import { LANGUAGE_LOGO } from '../../constants/languageLogo';
import { storage } from '../../firebase';
import MainLayout from '../../layouts/MainLayout';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const listCountry = Object.keys(LANGUAGE_LOGO);

const Register = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [staffs, setStaffs] = useState([]);
	const [form1] = Form.useForm();
	const [form2] = Form.useForm();
	const [messageApi, contextHolder] = message.useMessage();
	const [isLoading, setIsLoading] = useState(false);

	const [imageUrl, setImageUrl] = useState('https://i.imgur.com/3g7nmJC.png');

	const handleSubmit = async (value) => {
		try {
			if (staffs.length === 0) {
				messageApi.open({
					type: 'warning',
					content: 'Please add staffs',
				});
				return;
			}
			const data = {
				...value,
				staffs: staffs.staffs,
			};
			setIsLoading(true);
			const response = await axiosClient.post('/massage-places', data);
			if (response.success) {
				messageApi.open({
					type: 'success',
					content: 'Register success',
				});
				form1.resetFields();
				form2.resetFields();
				setStaffs([]);
			}
			setIsLoading(false);
		} catch (error) {
			messageApi.open({
				type: 'error',
				content: error.response.data.error[0],
			});
			setIsLoading(false);
		}
	};
	const showModal = () => {
		setIsModalOpen(true);
	};

	const uploadImage = async (e) => {
		try {
			const file = e.file.originFileObj;
			const imageRef = ref(storage, `images/${file.name}`);
			const uploadTask = uploadBytesResumable(imageRef, file);
			uploadTask.on(
				'state_changed',
				(snapshot) => {},
				(err) => {},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then((url) => {
						setImageUrl(url);
					});
				}
			);
		} catch (error) {
			console.log(
				'🚀 ~ file: firebase.js:38 ~ handleChangeImg ~ error:',
				error
			);
		}
	};

	const handleOk = () => {
		setIsModalOpen(false);
		form2.resetFields();
	};

	const handleCancel = async () => {
		try {
			const errors = await form2.validateFields();
			setIsModalOpen(false);
		} catch (error) {}
	};

	return (
		<MainLayout>
			{contextHolder}
			{isLoading ? (
				<div className="flex justify-center">
					<Spin />
				</div>
			) : (
				<div className="flex justify-center w-full">
					<Form
						labelCol={{ span: 4 }}
						wrapperCol={{ span: 14 }}
						layout="horizontal"
						className="mt-12 w-3/5"
						form={form1}
						onFinish={handleSubmit}
					>
						<div className="flex justify-center">
							<div className="w-2/3">
								<Form.Item
									label="Name"
									name="name"
									rules={[{ required: true, message: 'Please input name!' }]}
								>
									<Input />
								</Form.Item>
								<Form.Item
									label="Location"
									name="address"
									rules={[
										{ required: true, message: 'Please input location!' },
									]}
								>
									<Input />
								</Form.Item>
								<Form.Item
									label="Language"
									name="languages"
									rules={[
										{ required: true, message: 'Please select language!' },
									]}
								>
									<Select mode="multiple">
										{listCountry.map((item) => (
											<Select.Option key={item} value={item}>
												<img
													src={LANGUAGE_LOGO[item]}
													alt={item}
													className="w-8 h-8"
												/>
												<div>{item}</div>
											</Select.Option>
										))}
									</Select>
								</Form.Item>
								<Form.Item
									label="Description"
									name="description"
									rules={[
										{ required: true, message: 'Please input description!' },
									]}
								>
									<TextArea rows={4} />
								</Form.Item>
							</div>
							<div className="w-1/3">
								<Form.Item label="Upload" name="photoUrl">
									<Upload
										listType="picture-card"
										multiple={false}
										maxCount={1}
										onChange={async (e) => {
											await uploadImage(e);
											form1.setFieldsValue({ photoUrl: imageUrl });
										}}
									>
										<div>
											<PlusOutlined />
											<div style={{ marginTop: 8 }}>Upload</div>
										</div>
									</Upload>
								</Form.Item>
							</div>
						</div>
						<div className="ml-10">
							<span
								className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 border-b-4 border-yellow-700 hover:border-yellow-500 rounded-full mr-4 mt-4"
								onClick={showModal}
							>
								Staff List
							</span>
						</div>
						<Form.Item className="flex justify-center">
							<Button htmlType="submit" className="w-32 h-12">
								Submit
							</Button>
						</Form.Item>
					</Form>
					<Modal
						title="Add staffs"
						open={isModalOpen}
						onOk={handleOk}
						onCancel={handleCancel}
						footer={null}
					>
						<Form
							form={form2}
							onValuesChange={(changedValues, allValues) => {
								setStaffs(allValues);
							}}
						>
							<Form.List name="staffs">
								{(fields, { add, remove }) => {
									return (
										<div>
											{fields.map((field, index) => (
												<div key={field.key}>
													<Divider>Staff {index + 1}</Divider>
													<Form.Item
														label="Staff name"
														name={[index, 'name']}
														rules={[
															{
																required: true,
																message: 'Please input staff name!',
															},
														]}
													>
														<Input />
													</Form.Item>
													<Form.Item
														label="Age"
														name={[index, 'age']}
														rules={[
															{
																required: true,
																message: 'Please input age!',
															},
														]}
													>
														<InputNumber min={18} />
													</Form.Item>
													<Form.Item
														label="Year of EXP"
														name={[index, 'experience']}
														rules={[
															{
																required: true,
																message: 'Please input year of EXP!',
															},
														]}
													>
														<InputNumber min={0} />
													</Form.Item>
													<Form.Item label="Upload" name={[index, 'image']}>
														<Upload
															listType="picture-card"
															maxCount={1}
															onChange={async (e) => {
																await uploadImage(e);
																const fieldsValue = form2.getFieldsValue();
																const { staffs } = fieldsValue;
																await Object.assign(staffs[index], {
																	image: imageUrl,
																});
																form2.setFieldsValue({ staffs });
															}}
														>
															<div>
																<PlusOutlined />
																<div
																	style={{
																		marginTop: 8,
																	}}
																>
																	Upload
																</div>
															</div>
														</Upload>
													</Form.Item>
													{fields.length > 0 ? (
														<Button
															type="danger"
															onClick={() => remove(field.name)}
															icon={<MinusCircleOutlined />}
															className="bg-red-500 flex justify-center items-center w-40 text-white"
														>
															Remove
														</Button>
													) : null}
												</div>
											))}
											<Form.Item>
												<Button
													type="dashed"
													onClick={() => add()}
													className="mt-12 text-white bg-blue-500 w-full flex items-center justify-center"
												>
													<PlusOutlined /> Add staff
												</Button>
											</Form.Item>
										</div>
									);
								}}
							</Form.List>
						</Form>
					</Modal>
				</div>
			)}
		</MainLayout>
	);
};
export default Register;
