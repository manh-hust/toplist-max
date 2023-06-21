import { Button, Form, Input, Modal, message } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { selectedMassagePlaceState } from '../../recoil/apiState';

const Rating = ({ setNewComment }) => {
	const selectedMassagePlace = useRecoilValue(selectedMassagePlaceState);
	const [visible, setVisible] = useState(false);
	const [form] = Form.useForm();

	const showModal = () => {
		setVisible(true);
	};

	const handleCancel = () => {
		setVisible(false);
	};

	const handleSubmit = async (values) => {
		try {
			const response = await axios.post(
				`https://toplist-max-api-production.up.railway.app/api/massage-places/${selectedMassagePlace}/comments`,
				values
			);
			message.success('Comment successfully');
			setNewComment((prev) => !prev);
			setVisible(false);
		} catch (error) {
			message.error('Failed to comment');
		}
	};

	return (
		<>
			<Button
				type="primary"
				onClick={showModal}
				className="rounded-lg mt-8 bg-yellow-500 text-black hover:bg-yellow-400"
			>
				Comment
			</Button>
			<Modal
				title="Comment"
				visible={visible}
				onCancel={handleCancel}
				footer={null}
			>
				<Form form={form} onFinish={handleSubmit}>
					<Form.Item
						name="nickname"
						label="Display name: "
						rules={[
							{
								required: true,
								message: 'Please enter your display name: ',
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name="content"
						label="Write your comment here:"
						rules={[
							{
								required: true,
								message: 'Please enter your comment',
							},
						]}
					>
						<Input.TextArea rows={4} />
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" className="bg-yellow-400 ">
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

export default Rating;
