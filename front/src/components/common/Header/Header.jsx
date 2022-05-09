import React from 'react'
import Hamburger from './Hamburger/Hamburger'
import styles from './Header.module.scss'

import userImage from '../../../images/header/user.svg'
import arrowImage from '../../../images/header/arrow.svg'
import authImage from '../../../images/header/dumbbell.svg'
import { useLocation, useNavigate } from 'react-router'
import { useAuth } from '../../../hooks/useAuth'

const Header = ({ backCallback }) => {
	const navigate = useNavigate()
	const location = useLocation()
	//console.log(location.pathname) // выводит /new-workout
	const { isAuth } = useAuth() //авторизован либо нет получаем это все из AuthContext
	return (
		<header className={styles.header}>
			{location.pathname !== '/' ? (
				<button type='button' onClick={() => navigate(-1)}>
					<img
						src={arrowImage}
						alt='back'
						width='29'
						height='23'
						draggable={false}
					/>
				</button>
			) : (
				<button
					type='button'
					onClick={() => navigate(isAuth ? '/profile' : '/auth')} //если авториз то '/profile' : иначе '/auth'
				>
					<img
						src={isAuth ? authImage : userImage}
						alt='Auth'
						height='40'
						width='40'
						draggable={false}
					/>
				</button>
			)}

			<Hamburger />
		</header>
	)
}

export default Header
