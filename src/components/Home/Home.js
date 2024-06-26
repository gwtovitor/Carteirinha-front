/* eslint-disable jsx-a11y/alt-text */

import { useEffect, useState } from 'react';
import styles from './home.module.scss';
import { getApiClient } from '../../services/axios.js';
import showToast from '../utils/toast';
import { Logo } from '../utils/icons';
import { formatDateToFront } from '../utils/date';
import Sidebar from '../Navbar/SideBar';

export const checkToken = async (setUser) => {
	const tk = localStorage.getItem('cart-token');
	try {
		const decodedToken = await getApiClient(tk).get('/decode-token');
		const response = await getApiClient(tk).get(
			`/user/${decodedToken.data.user.id}`
		);
		console.log(response);
		setUser(response.data);
	} catch (error) {
		showToast({
			text: 'Faça  o login novamente, você será redirecionado ...',
			type: 'error',
		});
		localStorage.removeItem('cart-token');
		setTimeout(() => {
			window.location.href = '/';
		}, 3000);

		console.error('Erro ao verificar token:', error);
	}
};

export default function Home() {
	const [user, setUser] = useState(undefined);

	const [collapsed, setCollapsed] = useState(false);
	const [toggled, setToggled] = useState(false);

	const handleToggleSidebar = () => {
		setToggled(!toggled);
	};

	const handleCollapsedChange = () => {
		setCollapsed(!collapsed);
	};
	useEffect(() => {
		checkToken(setUser);
	}, []);

	return user ? (
		<div className={styles.home}>
			<Sidebar
				collapsed={collapsed}
				toggled={toggled}
				handleToggleSidebar={handleToggleSidebar}
				handleCollapsedChange={handleCollapsedChange}
			/>
			<div className={styles.cart}>
				<Logo className={styles.logo}></Logo>
				<hr />
				<img width="100px" height="140px" src={user.photo}></img>
				<div className={styles.clientData}>
					<span>Nome</span>
					<h4 className={styles.name}>{user.name}</h4>
				</div>
				<div className={styles.clientData}>
					<span>Acesso válido até</span>
					<h4 className={styles.green}>
						{formatDateToFront(user.validity)}
					</h4>
				</div>
			</div>
		</div>
	) : (
		<div>Loading...</div>
	);
}
