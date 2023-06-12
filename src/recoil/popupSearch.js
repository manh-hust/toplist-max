import { atom } from 'recoil';

const popupSearchState = atom({
	key: 'PopupSearch',
	default: false,
});

export default popupSearchState;
