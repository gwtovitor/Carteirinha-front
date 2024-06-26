import { useState } from 'react';
import Login from 'src/components/Login/Login';
import Signup from 'src/components/Signup/Signup';
import styles from './index.module.scss';

export default function Index() {
	const [openLogin, setOpenLogin] = useState(false);

	return (
		<>
			{openLogin ? <Login/> : <Signup setOpenLogin={setOpenLogin}/>}

			<button
				onClick={() => setOpenLogin((prev) => !prev)}
				className={styles.button}
			>
				{openLogin ? 'Cadastrar' : 'Já possui cadastro?'}
			</button>
		</>
	)
}
