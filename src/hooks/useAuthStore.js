import { useDispatch, useSelector } from 'react-redux';
import calendarApi from '../api/calendarApi';
import {
	clearErrorMessage,
	onChecking,
	onLogin,
	onLogOut,
	onLogoutCalendar,
	onRegister,
} from '../store';

export const useAuthStore = () => {
	const { status, user, errorMessage } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const startLogin = async ({ email, password }) => {
		dispatch(onChecking());

		try {
			const { data } = await calendarApi.post('/auth', { email, password });
			localStorage.setItem('token', data.token);
			localStorage.setItem('token-init-date', new Date().getTime());
			dispatch(onLogin({ name: data.name, uid: data.uid }));
		} catch (error) {
			dispatch(onLogOut('Error de credenciales'));
			setTimeout(() => {
				dispatch(clearErrorMessage());
			}, 10);
		}
	};

	const startRegister = async ({ name, email, password }) => {
		dispatch(onChecking());

		try {
			const { data } = await calendarApi.post('/auth/register', {
				name,
				email,
				password,
			});
			localStorage.setItem('token', data.token);
			localStorage.setItem('token-init-date', new Date().getTime());
			dispatch(
				onLogin({
					name: data.name,
					uid: data.uid,
				})
			);
		} catch (error) {
			dispatch(onLogOut(error.response.data?.msg || '--'));
			setTimeout(() => {
				dispatch(clearErrorMessage());
			}, 10);
		}
	};

	const startLogOut = () => {
		localStorage.clear();
		dispatch(onLogoutCalendar());
		dispatch(onLogOut());
	};

	const checkAuthToken = async () => {
		const token = localStorage.getItem('token');
		if (!token) return dispatch(onLogOut());

		try {
			const { data } = await calendarApi.get('/auth/renew');
			localStorage.setItem('token', data.token);
			localStorage.setItem('token-init-date', new Date().getTime());
			dispatch(
				onLogin({
					name: data.name,
					uid: data.uid,
				})
			);
		} catch (error) {
			localStorage.clear();
			dispatch(onLogOut());
		}
	};

	return {
		status,
		user,
		errorMessage,

		startLogin,
		startRegister,
		checkAuthToken,
		startLogOut,
	};
};
