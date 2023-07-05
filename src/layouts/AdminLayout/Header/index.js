import { BsJournalBookmark } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import logo from '../../../assets/images/logo-new.png';
import isAuthenticated from '../../../recoil/auth';
import sideBarStatus from '../../../recoil/sideBarStatus';
import { useSetRecoilState } from 'recoil';

const Header = () => {
	const [authenticated, setAuthenticated] = useRecoilState(isAuthenticated);
	const setStatusSidebar = useSetRecoilState(sideBarStatus);
	const token = localStorage.getItem('token');
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem('token');
		setAuthenticated(false);
		setStatusSidebar('1');
		navigate('/admin/login');
	};

	return (
		<div className="w-full h-20 bg-yellow-400 flex items-center justify-between px-4 py-4">
			<div className="flex ml-8 items-center">
				<img src={logo} alt="logo" className="w-16 h-16 mr-8" />
				<div className="flex">
					<h1 className="text-xl font-bold mr-8">
						<Link to="/admin/places">Admin</Link>
					</h1>
				</div>
			</div>
			<div className="flex">
				{token ? (
					<h1
						className="text-xl font-bold mr-8 cursor-pointer"
						onClick={handleLogout}
					>
						Logout
					</h1>
				) : (
					<></>
				)}
				<BsJournalBookmark className="w-8 h-8" />
			</div>
		</div>
	);
};
export default Header;
