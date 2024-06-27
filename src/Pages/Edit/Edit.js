/* eslint-disable jsx-a11y/img-redundant-alt */
import { useEffect, useState } from 'react';
import styles from './edit.module.scss';
import { getApiClient } from 'src/services/axios';
import showToast from 'src/components/utils/toast';
import { Logo } from 'src/components/utils/icons';
import Sidebar from 'src/components/Navbar/SideBar';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firebaseStorage } from '../../services/firebase';
import { formatDateToFront } from 'src/components/utils/date';
import { checkToken } from '../Home/Home';

export default function Edit() {
	const [user, setUser] = useState(undefined);
	const [name, setName] = useState('');
	const [validity, setValidity] = useState('');
	const [photo, setPhoto] = useState('');
	const [photoFile, setPhotoFile] = useState(null);
	const [photoPreview, setPhotoPreview] = useState('');

	const [collapsed, setCollapsed] = useState(false);
	const [toggled, setToggled] = useState(false);

	const handleToggleSidebar = () => {
		setToggled(!toggled);
	};

	const handleCollapsedChange = () => {
		setCollapsed(!collapsed);
	};
	const handleSave = async () => {
		const tk = localStorage.getItem('cart-token');
		try {
			let photoUrl = photo;
			if (photoFile) {
				const storageRef = ref(
					firebaseStorage,
					`photos/${photoFile.name}`
				);
				await uploadBytes(storageRef, photoFile);
				photoUrl = await getDownloadURL(storageRef);
			}
			const userDecoded = await getApiClient(tk).get('/decode-token');
			const userId = userDecoded.data.user.id;
			await getApiClient(tk).put(`/user/update/${userId}`, {
				name: name,
				email: userDecoded.data.user.email,
				photo: photoUrl,
			});
			setUser((prevUser) => ({
				...prevUser,
				name: name,
				photo: photoUrl,
			}));
			setPhoto(photoUrl);

			showToast({
				text: 'Dados atualizados com sucesso!',
				type: 'success',
			});
			window.location.href = '/home';
		} catch (error) {
			showToast({
				text: 'Erro ao salvar dados, tente novamente.',
				type: 'error',
			});
			console.error('Erro ao atualizar dados:', error);
		}
	};

	const handlePhotoChange = (e) => {
		const file = e.target.files[0];
		setPhotoFile(file);
		setPhotoPreview(URL.createObjectURL(file));
	};

	useEffect(() => {
		checkToken(setUser);
	}, []);

	useEffect(() => {
		if (user) {
			setName(user.name);
			setValidity(user.validity);
			setPhoto(user.photo);
			setPhotoPreview(user.photo);
		}
	}, [user]);

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
				<img
					width="100px"
					height="140px"
					src={photoPreview}
					alt="User photo"
				></img>
				<div className={styles.clientData}>
					<span>Foto</span>
					<input
						required
						type="file"
						id="photo"
						name="photo"
						className={styles.input}
						accept="image/*"
						onChange={handlePhotoChange}
					/>
				</div>
				<div className={styles.clientData}>
					<span>Nome</span>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className={styles.clientData}>
					<span>Acesso válido até</span>
					<h4 className={styles.green}>
						{formatDateToFront(validity)}
					</h4>
				</div>

				<button onClick={handleSave}>Salvar</button>
			</div>
		</div>
	) : (
		<div></div>
	);
}
