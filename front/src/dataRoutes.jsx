import error404 from './components/pages/404'
import Auth from './components/pages/Auth/Auth'
import Home from './components/pages/Home/Home'
import NewExercise from './components/pages/NewExercise/NewExercise'
import NewWorkout from './components/pages/NewWorkout/NewWorkout'
import Profile from './components/pages/Profile/Profile'

export const routes = [
	{
		path: '/',
		component: Home,
		auth: false,
	},
	{
		path: '/auth',
		component: Auth,
		auth: false,
	},
	{
		path: '/new-workout',
		component: NewWorkout,
		auth: true,
	},
	{
		path: '/new-exercise',
		component: NewExercise,
		auth: true,
	},
	{
		path: '/profile',
		component: Profile,
		auth: true,
	},
	{
		path: '/*' /**Путь в виде звездочки - "*" указывает, что этот маршрут будет сопоставляться со всеми адресами URL, которые не соответствуют предыдущим маршрутам */,
		component: error404,
		auth: false,
	},
]
