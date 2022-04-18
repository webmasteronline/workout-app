import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import error404 from './components/pages/404'

import { useAuth } from './hooks/useAuth'
import { routes } from './dataRoutes'

const App = () => {
	const { isAuth } = useAuth()
	return (
		<Router>
			<Routes>
				{routes.map((route) => {
					const ElementPage = route.component
					if (route.auth && !isAuth) {
						return false
					}
					return (
						<Route
							path={route.path}
							key={`route4 ${route.path}`}
							element={<ElementPage />}
						/>
					)
				})}
				<Route element={error404} />
			</Routes>
		</Router>
	)
}

export default App
