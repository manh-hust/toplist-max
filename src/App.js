import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import DetailPlace from './pages/DetailPlace';
import Home from './pages/Home';
import Register from './pages/Register';
import WriteReview from './pages/WriteReview';
import Places from './pages/admin/PlacesManager/Places';
import RegisterRequest from './pages/admin/PlacesManager/RegisterRequest';
const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/massage-places/:slug" element={<DetailPlace />} />
				<Route path="/WriteReview" element={<WriteReview />} />
				<Route path="/register" element={<Register />} />
				<Route path="/admin/places/request" element={<RegisterRequest />} />
				<Route path="/admin/places" element={<Places />} />
			</Routes>
		</Router>
	);
};

export default App;
