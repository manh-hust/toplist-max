import { atom } from 'recoil';

const isAuthenticated = atom({
	key: 'IS_AUTHENTICATED',
	default: false,
});

export default isAuthenticated;
