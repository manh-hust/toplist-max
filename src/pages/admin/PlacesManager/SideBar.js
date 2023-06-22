import {
	AppstoreOutlined,
	MailOutlined,
	SettingOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';
function getItem(label, key, icon, children, type) {
	return {
		key,
		icon,
		children,
		label,
		type,
	};
}
const items = [
	getItem('Massage places', 'sub1', <MailOutlined />, [
		getItem('Active places', '1'),
		getItem('Request', '2'),
	]),
	getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
		getItem('Option 5', '5'),
		getItem('Option 6', '6'),
	]),
	getItem('Navigation Three', 'sub4', <SettingOutlined />, [
		getItem('Option 9', '9'),
		getItem('Option 10', '10'),
	]),
];
const SideBar = () => {
	const [current, setCurrent] = useState('1');

	return (
		<Menu
			style={{
				width: 256,
			}}
			defaultOpenKeys={['sub1']}
			selectedKeys={[current]}
			mode="inline"
			items={items}
		/>
	);
};

export default SideBar;
