import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => {
	const [current, setCurrent] = useState('1');

	return (
		<Menu
			defaultOpenKeys={['sub1']}
			selectedKeys={[current]}
			mode="inline"
			className="w-60 px-4"
			accessKey={current}
		>
			<Link to="/admin/places">
				<Menu.Item
					key="all-places"
					icon={<AppstoreOutlined className="px-2" />}
				>
					All places
				</Menu.Item>
			</Link>
			<Link to="/admin/places/request">
				<Menu.Item key="request" icon={<MailOutlined className="px-2" />}>
					Request
				</Menu.Item>
			</Link>
			<Link to="/admin/report">
				<Menu.Item key="request" icon={<MailOutlined className="px-2" />}>
					Reports
				</Menu.Item>
			</Link>
			<Link to="/admin/comment">
				<Menu.Item key="request" icon={<MailOutlined className="px-2" />}>
					Comments
				</Menu.Item>
			</Link>
		</Menu>
	);
};

export default SideBar;
