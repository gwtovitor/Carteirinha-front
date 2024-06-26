import styles from './sideBar.module.scss';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import {
	FaBars,
	FaIdCard,
	FaEdit,
	FaSignOutAlt,
} from 'react-icons/fa';

const SidebarComponent = ({
	collapsed,
	toggled,
	handleToggleSidebar,
	handleCollapsedChange
}) => {
	
	const logoff = () => {
		localStorage.removeItem('cart-token');
		window.location.href = '/';
	};

	const toggleNav = ()=> {
		handleCollapsedChange()
		handleToggleSidebar()
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<FaBars
					className={styles.menuIcon}
					onClick={toggleNav}
				/>
			</div>
			<Sidebar
				collapsed={collapsed}
				toggled={toggled}
				onToggle={handleToggleSidebar}
				breakPoint="lg"
				className={styles.sideBar}
				height="100%"
				collapsedWidth="4.5rem"
			>
				<h1 className={`${collapsed && styles.collapsed}`} >Carteirinha</h1>
				<Menu iconShape="circle">
					<MenuItem
						onClick={() => {
							window.location.href = '/home';
						}}
						icon={<FaIdCard />}
					>
						Minha Carteirinha
					</MenuItem>
					<MenuItem
						onClick={() => {
							window.location.href = '/edit';
						}}
						icon={<FaEdit />}
					>
						Editar Carteirinha
					</MenuItem>
					<MenuItem
						onClick={logoff}
						className={styles.logoff}
						icon={<FaSignOutAlt color="red" />}
					>
						<span style={{ color: 'red' }}>Sair</span>
					</MenuItem>
				</Menu>
			</Sidebar>
		</div>
	);
};

export default SidebarComponent;
