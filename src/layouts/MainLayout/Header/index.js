import { BsJournalBookmark, BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import logo from '../../../assets/images/logo-new.png';
import useSearchPlaces from '../../../hooks/useSearchPlaces';
import popupSearchState from '../../../recoil/popupSearch';
const Header = () => {
	const useSetPopup = useSetRecoilState(popupSearchState);
	const { handleSearch } = useSearchPlaces();
	return (
		<div className="w-full h-20 bg-yellow-400 flex items-center justify-between px-4 py-4">
			<div className="flex ml-8 items-center">
				<img src={logo} alt="logo" className="w-16 h-16 mr-8" />
				<div className="flex">
					<h1 className="text-xl font-bold mr-8">
						<Link to="/">Home</Link>
					</h1>
					<h1 className="text-xl font-bold">Write review</h1>
				</div>
			</div>
			<div className="flex">
				<BsSearch
					className="w-8 h-8 mr-4 cursor-pointer"
					onClick={() => {
						useSetPopup((prev) => !prev);
						handleSearch();
					}}
				/>
				<BsJournalBookmark className="w-8 h-8" />
			</div>
		</div>
	);
};
export default Header;
