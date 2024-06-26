// utils/toast.js
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastConfig = {
	position: 'bottom-right',
	autoClose: 5000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
	theme: 'dark',
};

export default function showToast({text, type}) {
  console.log(text)
	if (type === 'error') {
		toast.error(text, toastConfig);
	} else {
		toast.success(text, toastConfig);
	}
}
