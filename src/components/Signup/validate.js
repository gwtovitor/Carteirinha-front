import showToast from '../utils/toast';

export default function validate(formData) {
	if (formData.name.length < 4) {
		showToast({
			text: 'O nome deve ter pelo menos 5 caracteres',
			type: 'error',
		});
		return false;
	}
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(formData.email)) {
		showToast({ text: 'Insira um email válido', type: 'error' });
		return false;
	}
	if (formData.password !== formData.confirmPassword) {
		showToast({
			text: 'Senha e confirmação de senha não conferem',
			type: 'error',
		});
		return false;
	}
	const passwordRegex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
	if (!passwordRegex.test(formData.password)) {
		showToast({
			text: 'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número, um caractere especial e pelo menos 5 caracteres.',
			type: 'error'
		});
		return false;
	}

	if (!formData.photo) {
		showToast({ text: 'Insira uma foto', type: 'error' });
		return false;
	}
	return true;
}
