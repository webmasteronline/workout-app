import React from 'react'
import Layout from '../../common/Layout'

import bgImage from '../../../images/auth-bg.png'
import Field from '../../ui/Field/Field'

import Button from '../../ui/Button/Button'
import styles from './Auth.module.scss'
import Alert from '../../ui/Alert/Alert'
import { useMutation } from 'react-query'
import { $api } from '../../../api/api'
import Loader from '../../ui/Loader'
import { useNavigate } from 'react-router'
import { useAuth } from '../../../hooks/useAuth.js'

const Auth = () => {
	const [email, setEmail] = React.useState('')
	const [password, setPassword] = React.useState('')
	const [type, setType] = React.useState('auth')

	const navigate = useNavigate()
	const { setIsAuth } = useAuth()
	const {
		mutate: register,
		isLoading,
		error,
		data,
	} = useMutation(
		'Registration',
		() =>
			$api({
				url: '/users',
				type: 'POST',
				body: { email, password },
				auth: false,
			}),
		{
			onSuccess(data) {
				//	console.log(data)
				/*в data - содержится наш ответ с сервера-   token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjU4MjBmYTgxMTZjM2NkYzYxOTA4ZjciLCJpYXQiOjE2NDk5NDI3NzgsImV4cCI6MTY1MDgwNjc3OH0.9CDXyYNa4am51I_tLUDHiVaCNRRvqsPX0sPBZIwP-fY"
user: {password: '$2a$10$2eXV2k/b.RWoQdw0QnPe0OQ688y9HDSPCbN2JarhXtAnUJ446MK0K', email: 'test123@test.ru', image: {…}, statistics: {…}, _id: '625820fa8116c3cdc61908f7', …}
[[Prototype]]: Object */
				localStorage.setItem('token', data.token)
				setIsAuth(true)
				setPassword('') //очищаем поля ввода
				setEmail('')

				navigate('/') // после успешной регистрации переходим на главную страницу.
			},
		}
	)

	const handleSubmit = (e) => {
		e.preventDefault()
		if (type === 'auth') {
			console.log('Auth')
		} else {
			register()
		}
	}

	return (
		<>
			<Layout bgImage={bgImage} heading='Auth || Registration' />
			<div className='wrapper-inner-page'>
				{error && <Alert type='warning' text={error} />}
				{isLoading && <Loader />}
				<form onSubmit={handleSubmit}>
					<Field
						placeholder='Enter email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						type='email'
					/>
					<Field
						placeholder='Enter password'
						value={password}
						onChange={({ target: { value } }) => setPassword(value)}
						required
						type='password'
					/>
					<div className={styles.wrapperButton}>
						<Button text='Sing in' callback={() => setType('auth')} />
						<Button text='Sing up' callback={() => setType('reg')} />
					</div>
				</form>
			</div>
		</>
	)
}

export default Auth
