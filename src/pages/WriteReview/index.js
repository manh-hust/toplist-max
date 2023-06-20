import { Form } from 'react-router-dom';
import useSearchPlaces from '../../hooks/useSearchPlaces';
import MainLayout from '../../layouts/MainLayout';
import CreateReview from './CreateReview';
const WriteReview = () => {
	const { places } = useSearchPlaces();
	return (
		<MainLayout>
			<CreateReview/>
		</MainLayout>
	);
};

export default WriteReview;
