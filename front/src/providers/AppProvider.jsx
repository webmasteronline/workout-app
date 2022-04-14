import React, { useState } from 'react'
import Routes from '../Routes'
import { AuthContext } from '../contexts/AuthContext'

const AppProvider = () => {
	const [isAuth, setIsAuth] = useState(false)
	return (
		<AuthContext.Provider value={{ isAuth, setIsAuth }}>
			<Routes />
		</AuthContext.Provider>
	)
}

export default AppProvider
