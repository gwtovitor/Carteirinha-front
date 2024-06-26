import { useState } from 'react';
import Login from 'src/components/Login/Login';
import Signin from 'src/components/Signin/Signin';
import styles from './index.module.scss';

export default function Index() {
	const [openLogin, setOpenLogin] = useState(false);

	return (
		<>
			{openLogin ? <Login></Login> : <Signin setOpenLogin={setOpenLogin}></Signin>}

			<button
				onClick={() => setOpenLogin((prev) => !prev)}
				className={styles.button}
			>
				{openLogin ? 'Cadastrar' : 'Já possui cadastro?'}
			</button>
		</>
	)
}
