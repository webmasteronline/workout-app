import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

/** Это у нас кастомный hook сдесь мы вызываем AuthContext что бы вызвать его и подключить один раз, а не каждый раз где нам необходим  AuthContext*/
export const useAuth = () => {
	const { isAuth, setIsAuth } = useContext(AuthContext)
	return {
		isAuth,
		setIsAuth,
	}
}
