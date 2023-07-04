import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Comments from './pages/admin/Comments';
import Places from './pages/admin/PlacesManager/Places';
import RegisterRequest from './pages/admin/PlacesManager/RegisterRequest';
import Reports from './pages/admin/Reports';
import DetailPlace from './pages/user/DetailPlace';
import Home from './pages/user/Home';
import Register from './pages/user/Register';
const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/massage-places/:slug" element={<DetailPlace />} />
				<Route path="/register" element={<Register />} />
				<Route path="/admin/places/request" element={<RegisterRequest />} />
				<Route path="/admin/places" element={<Places />} />
				<Route path="/admin/reports" element={<Reports />} />
				<Route path="/admin/comments" element={<Comments />} />
			</Routes>
		</Router>
	);
};

export default App;
