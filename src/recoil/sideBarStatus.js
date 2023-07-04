import { atom } from 'recoil';

const sideBarStatus = atom({
	key: 'SIDE_BAR_STATUS',
	default: '1',
});

export default sideBarStatus;
