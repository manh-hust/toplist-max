import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import isAuthenticated from '../recoil/auth';

const AuthMiddleware = ({ children }) => {
	const authenticated = useRecoilValue(isAuthenticated);

	const navigate = useNavigate();
	const token = localStorage.getItem('token');
	useEffect(() => {
		if (!authenticated && !token) {
			navigate('/admin/login');
		}
	}, [authenticated, navigate, token]);

	return <>{children}</>;
};

export default AuthMiddleware;
