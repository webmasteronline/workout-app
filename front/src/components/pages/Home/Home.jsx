import Layout from '../../common/Layout'
import Button from '../../ui/Button/Button'
import Counters from '../../ui/Counters/Counters'
import bgImage from '../../../images/home-bg.jpg'
import { useNavigate } from 'react-router-dom'
import styles from './Home.module.scss'
import { useQuery } from 'react-query'
import { useAuth } from '../../../hooks/useAuth'
import { $api } from '../../../api/api'

const Home = () => {
	const navigate = useNavigate()
	const { isAuth } = useAuth()
	const { data, isSuccess } = useQuery(
		'home page counters',
		() =>
			$api({
				url: '/users/profile',
				//type: 'POST', // type: 'GET' - стоит по умолчанию по-этому не указываем
				//auth: true, //auth: true - стоит по умолчанию
			}),
		{
			refetchOnWindowFocus: false /** If set to true, the query will refetch on window focus if the data is stale.
If set to false, the query will not refetch on window focus. */,
			enabled:
				isAuth /**Set this to false to disable this query from automatically running */,
		}
	)

	return (
		<Layout bgImage={bgImage}>
			<Button
				text='New'
				callback={() => navigate('/new-workout')}
				type='main'
			/>
			<h1 className={styles.heading}>EXERCISES FOR THE SHOULDERS</h1>
			{isSuccess && isAuth && (
				<Counters
					minutes={data.minutes}
					workouts={data.workouts}
					kgs={data.kgs}
				/>
			)}
		</Layout>
	)
}

export default Home
