import React, { useState } from 'react'
import Routes from '../Routes'
import { AuthContext } from '../contexts/AuthContext'

const AppProvider = () => {
	const [isAuth, setIsAuth] = useState(
		!!localStorage.getItem('token')
	) /** !! - для того что бы привезти значение к булеан числу - тоесть если есть token то true если нет то false  */
	return (
		<AuthContext.Provider value={{ isAuth, setIsAuth }}>
			<Routes />
		</AuthContext.Provider>
	)
}

export default AppProvider
