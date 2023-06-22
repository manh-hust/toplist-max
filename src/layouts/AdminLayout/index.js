import Footer from '../MainLayout/Footer';
import Header from './Header';

const AdminLayout = ({ children }) => {
	return (
		<div className="min-h-screen flex flex-col justify-between relative">
			<Header />
			{children}
			<Footer />
		</div>
	);
};

export default AdminLayout;
