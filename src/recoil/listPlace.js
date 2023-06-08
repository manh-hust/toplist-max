import { atom } from 'recoil';

const placeListState = atom({
	key: 'PlaceList',
	default: [],
});

export default placeListState;
