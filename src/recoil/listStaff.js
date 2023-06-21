import { atom } from 'recoil';

const staffListState = atom({
	key: 'StaffList',
	default: [],
});

export default staffListState;
