// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyApi-IIIHT7ULsd5JbkBviSHzlEJF4uLIE',
	authDomain: 'itss-maxa.firebaseapp.com',
	projectId: 'itss-maxa',
	storageBucket: 'itss-maxa.appspot.com',
	messagingSenderId: '285158948564',
	appId: '1:285158948564:web:5699529e5c0a492dda4541',
	measurementId: 'G-W68ZR6Y7Y6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);

export const uploadImage = async (e) => {
	try {
		const file = e.file.originFileObj;
		const imageRef = ref(storage, `images/${file.name}`);
		const uploadTask = uploadBytesResumable(imageRef, file);

		uploadTask.on(
			'state_changed',
			(snapshot) => {},
			(err) => {},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((url) => {
					e = { ...e, url };
				});
			}
		);
	} catch (error) {
		console.log('🚀 ~ file: firebase.js:38 ~ handleChangeImg ~ error:', error);
	}
};
