import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import axiosClient from '../../../api/axiosClient';
import isAuthenticated from '../../../recoil/auth';
const Login = () => {
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const [authenticated, setAuthenticated] = useRecoilState(isAuthenticated);

	const onFinish = async (values) => {
		try {
			const response = await axiosClient.post('/admin/login', values);
			if (response.success) {
				localStorage.setItem('token', response.data.token);
				setAuthenticated(true);
				navigate('/admin/places');
			}
		} catch (error) {
			form.setFields([
				{
					name: 'username',
					errors: ['Username or password is incorrect!'],
				},
				{
					name: 'password',
					errors: ['Username or password is incorrect!'],
				},
			]);
		}
	};
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<div className="w-screen h-screen flex justify-center bg-yellow-400">
			<div className="w-[480px] h-[440px] shadow-2xl mt-16 bg-white py-12 rounded-md">
				<h1 className="text-center text-3xl mb-4">Login</h1>
				<Form
					name="form_item_path"
					layout="vertical"
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					className="px-8"
					form={form}
				>
					<Form.Item
						name="username"
						label="Username"
						rules={[
							{
								required: true,
								message: 'Please input your username!',
							},
						]}
					>
						<Input className="h-12" />
					</Form.Item>
					<Form.Item
						name="password"
						label="Password"
						rules={[
							{
								required: true,
								message: 'Please input your password!',
							},
						]}
					>
						<Input className="h-12" type="password" />
					</Form.Item>
					<Button
						htmlType="submit"
						className="w-full bg-blue-500 text-white text-xl h-12 mt-8"
					>
						Login
					</Button>
				</Form>
			</div>
		</div>
	);
};

export default Login;
