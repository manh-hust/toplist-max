import { BsJournalBookmark } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo-new.png';
const Header = () => {
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
				<BsJournalBookmark className="w-8 h-8" />
			</div>
		</div>
	);
};
export default Header;
