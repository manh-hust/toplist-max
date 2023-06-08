import useSearchPlaces from '../../hooks/useSearchPlaces';
import MainLayout from '../../layouts/MainLayout';
import ListPlace from './ListPlace';
const Home = () => {
	const { places } = useSearchPlaces();
	return (
		<MainLayout>
			<ListPlace places={places.massagePlaces} />
		</MainLayout>
	);
};

export default Home;
