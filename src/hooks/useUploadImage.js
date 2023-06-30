import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react';
import { storage } from '../firebase';
const useUploadImage = async (e) => {
	const [image, setImage] = useState(null);
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
					setImage(url);
				});
			}
		);
	} catch (error) {
		console.log('🚀 ~ file: firebase.js:38 ~ handleChangeImg ~ error:', error);
	}

	return image;
};

export default useUploadImage;
