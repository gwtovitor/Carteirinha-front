import { useState } from 'react';
import styles from './login.module.scss';
import { getApiClient } from '../../services/axios';
import showToast from '../utils/toast';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await getApiClient().post('/login', {
                email: formData.email,
                password: formData.password
            });
            localStorage.setItem("cart-token",  response.data.token)

            showToast({ text: 'Login realizado com sucesso', type: 'success' });
            window.location.href = '/home';
        } catch (error) {
            showToast({ text: 'Erro ao realizar login', type: 'error' });
            console.error('Erro ao realizar login:', error);
        }
    };

    return (
        <div className={styles.container}>
            <h3>Entrar na Conta</h3>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label htmlFor="email" className={styles.label}>Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className={styles.input}
                    value={formData.email}
                    onChange={handleChange}
                />

                <label htmlFor="password" className={styles.label}>Senha:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className={styles.input}
                    value={formData.password}
                    onChange={handleChange}
                />

                <button type="submit" className={styles.button}>Entrar</button>
            </form>
        </div>
    );
}
