import React from 'react'
import Hamburger from './Hamburger/Hamburger'
import styles from './Header.module.scss'

import userImage from '../../../images/header/user.svg'
import arrowImage from '../../../images/header/arrow.svg'
import { useLocation, useNavigate } from 'react-router'

const Header = ({ backCallback }) => {
	const navigate = useNavigate()
	const location = useLocation()
	//console.log(location.pathname) // выводит /new-workout
	return (
		<header className={styles.header}>
			{location.pathname !== '/' ? (
				<button type='button' onClick={() => navigate(-1)}>
					<img src={arrowImage} alt='Auth' />
				</button>
			) : (
				<button type='button' onClick={() => navigate('/auth')}>
					<img src={userImage} alt='Auth' />
				</button>
			)}

			<Hamburger />
		</header>
	)
}

export default Header
