import { useState } from 'react';
import styles from './signup.module.scss';
import { getApiClient } from '../../services/axios';
import { firebaseStorage } from '../../services/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import showToast from '../utils/toast';
import validate from './validate';
import PasswordStrengthBar from 'react-password-strength-bar';

export default function Signup({ setOpenLogin }) {

	const scoreWords = ["","Fraca", "Ok", "Boa", "Excelente"]
	
	const [formData, setFormData] = useState({
		email: '',
		name: '',
		password: '',
		confirmPassword: '',
		photo: null,
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleFileChange = (e) => {
		setFormData((prevData) => ({
			...prevData,
			photo: e.target.files[0],
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const isValid = validate(formData);
		if (!isValid) return;
		if (formData.photo) {
			let text = 'Cadastro efetuado com sucesso, realize o login';
			try {
				const storageRef = ref(
					firebaseStorage,
					`photos/${formData.photo.name}`
				);
				await uploadBytes(storageRef, formData.photo);
				const photoUrl = await getDownloadURL(storageRef);

				try {
					await getApiClient().post('/signup', {
						email: formData.email,
						name: formData.name,
						password: formData.password,
						confirmPassword: formData.confirmPassword,
						photo: photoUrl,
					});

					setOpenLogin(true);
					showToast({ text: text, type: 'success' });
				} catch (error) {
					text = 'Erro ao realizar cadastro';
					if (
						error.response.data.message ===
						'A user with this email address already exists'
					) {
						text = 'Email já cadastrado';
					}
					showToast({ text: text, type: 'error' });
				}
			} catch (error) {
				text =
					'Erro ao realizar upload do arquivo, verifique se o navegador possui as permissões';
				showToast({ text: text, type: 'error' });
			}
		}
	};

	return (
		<div className={styles.container}>
			<h3>Criar Conta</h3>
			<form className={styles.form} onSubmit={handleSubmit}>
				<label htmlFor="name" className={styles.label}>
					Nome:
				</label>
				<input
					required
					type="text"
					id="name"
					name="name"
					className={styles.input}
					value={formData.name}
					onChange={handleChange}
				/>

				<label htmlFor="email" className={styles.label}>
					Email:
				</label>
				<input
					required
					type="email"
					id="email"
					name="email"
					className={styles.input}
					value={formData.email}
					onChange={handleChange}
				/>

				<label htmlFor="password" className={styles.label}>
					Senha:
				</label>
				<input
					required
					type="password"
					id="password"
					name="password"
					className={styles.input}
					value={formData.password}
					onChange={handleChange}
				/>
				<PasswordStrengthBar className={styles.passwordBar} shortScoreWord={"Muito fraca"} scoreWords={scoreWords} password={formData.password} />
				<label htmlFor="confirmPassword" className={styles.label}>
					Confirmação de Senha:
				</label>
				<input
					required
					type="password"
					id="confirmPassword"
					name="confirmPassword"
					className={styles.input}
					value={formData.confirmPassword}
					onChange={handleChange}
				/>

				<label htmlFor="photo" className={styles.label}>
					Foto:
				</label>
				<input
					required
					type="file"
					id="photo"
					name="photo"
					className={styles.input}
					accept="image/*"
					onChange={handleFileChange}
				/>

				<button type="submit" className={styles.button}>
					Cadastrar
				</button>
			</form>
		</div>
	);
}
