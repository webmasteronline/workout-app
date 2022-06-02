import error404 from './components/pages/404'
import Auth from './components/pages/Auth/Auth'
import Home from './components/pages/Home/Home'
import NewWorkout from './components/pages/NewWorkout/NewWorkout'
import NewExercise from './components/pages/NewExercise/NewExercise'
import Profile from './components/pages/Profile/Profile'
import ListWorkouts from './components/pages/Workouts/ListWorkouts'
import SingleWorkout from './components/pages/Workouts/SingleWorkout'
import SingleExercise from './components/pages/Exercises/SingleExercise'
import ListExercises from './components/pages/DellExercise/ListExercises'
import EditExercise from './components/pages/EditExercise/EditExercise'
import EditWorkout from './components/pages/EditWorkout/EditWorkout'

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
		path: '/workout/:id',
		component: SingleWorkout,
		auth: true,
	},
	{
		path: '/workouts',
		component: ListWorkouts,
		auth: true,
	},
	{
		path: '/exercise/:id',
		component: SingleExercise,
		auth: true,
	},
	{
		path: '/dell-exercise/',
		component: ListExercises,
		auth: true,
	},
	{
		path: '/edit-exercise/:id',
		component: EditExercise,
		auth: true,
	},
	{
		path: '/edit-workout/:id',
		component: EditWorkout,
		auth: true,
	},
	{
		path: '/*' /**Путь в виде звездочки - "*" указывает, что этот маршрут будет сопоставляться со всеми адресами URL, которые не соответствуют предыдущим маршрутам */,
		component: error404,
		auth: false,
	},
]
