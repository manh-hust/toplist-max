import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import AuthMiddleware from './middlewares/AuthMiddleware';
import Login from './pages/admin/Auth/Login';
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
				<Route path="/admin/login" element={<Login />} />
				<Route
					path="/admin/places/request"
					element={
						<AuthMiddleware>
							<RegisterRequest />
						</AuthMiddleware>
					}
				/>
				<Route
					path="/admin/places"
					element={
						<AuthMiddleware>
							<Places />
						</AuthMiddleware>
					}
				/>
				<Route
					path="/admin/reports"
					element={
						<AuthMiddleware>
							<Reports />
						</AuthMiddleware>
					}
				/>
				<Route
					path="/admin/comments"
					element={
						<AuthMiddleware>
							<Comments />
						</AuthMiddleware>
					}
				/>
			</Routes>
		</Router>
	);
};

export default App;
