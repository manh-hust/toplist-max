import Footer from '../MainLayout/Footer';
import Header from './Header';
import SideBar from './SideBar';
const AdminLayout = ({ children }) => {
	return (
		<div className="min-h-screen flex flex-col justify-between relative">
			<Header />
			<div className="flex min-h-screen mt-12">
				<SideBar />
				{children}
			</div>
			<Footer />
		</div>
	);
};

export default AdminLayout;
