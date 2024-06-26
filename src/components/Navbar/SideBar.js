import styles from './sideBar.module.scss';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import {
	FaBars,
	FaAngleDoubleRight,
	FaIdCard,
	FaEdit,
	FaSignOutAlt,
} from 'react-icons/fa';

const SidebarComponent = ({
	collapsed,
	toggled,
	handleToggleSidebar,
	handleCollapsedChange,
}) => {
	const logoff = () => {
		localStorage.removeItem('cart-token');
		window.location.href = '/';
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<FaBars
					className={styles.menuIcon}
					onClick={handleToggleSidebar}
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
				<Menu iconShape="circle">
					{collapsed ? (
						<MenuItem
							icon={<FaAngleDoubleRight />}
							onClick={handleCollapsedChange}
						></MenuItem>
					) : (
						<MenuItem>
							<div
								style={{
									padding: '9px',
									textTransform: 'uppercase',
									fontWeight: 'bold',
									fontSize: 15,
									letterSpacing: '1px',
								}}
							>
								Carteirinha
							</div>
						</MenuItem>
					)}
				</Menu>
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
