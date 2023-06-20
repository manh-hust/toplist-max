import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import DetailPlace from './pages/DetailPlace';
import Home from './pages/Home';
import WriteReview from './pages/WriteReview';

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/massage-places/:slug" element={<DetailPlace />} />
				<Route path='/WriteReview' element={<WriteReview/>} />
			</Routes>
		</Router>
	);
};

export default App;
