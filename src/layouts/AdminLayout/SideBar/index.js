import {
	AppstoreOutlined,
	CommentOutlined,
	MailOutlined,
	NotificationOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import sideBarStatus from '../../../recoil/sideBarStatus';

const SideBar = () => {
	const [sideBar, setSideBar] = useRecoilState(sideBarStatus);
	return (
		<Menu
			selectedKeys={[sideBar]}
			mode="inline"
			className="w-60 px-4"
			onClick={(e) => {
				setSideBar(e.key);
			}}
		>
			<Menu.Item key="1" icon={<AppstoreOutlined className="px-2" />}>
				<Link to="/admin/places">All places</Link>
			</Menu.Item>
			<Menu.Item key="2" icon={<MailOutlined className="px-2" />}>
				<Link to="/admin/places/request">Request</Link>
			</Menu.Item>
			<Menu.Item key="3" icon={<NotificationOutlined className="px-2" />}>
				<Link to="/admin/reports">Reports</Link>
			</Menu.Item>
			<Menu.Item key="4" icon={<CommentOutlined className="px-2" />}>
				<Link to="/admin/comments">Comments</Link>
			</Menu.Item>
		</Menu>
	);
};

export default SideBar;
