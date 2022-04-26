import { useQuery } from 'react-query'
import Header from '../../common/Header/Header'

import bgImage from '../../../images/workout-bg.jpg'

import styles from './SingleWorkout.module.scss'
import { $api } from '../../../api/api'
import Alert from '../../ui/Alert/Alert'
import { Link } from 'react-router-dom'
import Layout from '../../common/Layout'

const ListWorkouts = () => {
	const { data, isSuccess } = useQuery(
		'get workouts',
		() =>
			$api({
				url: `/workouts`,
			}),
		{
			refetchOnWindowFocus: false,
		}
	)
	return (
		<>
			<Layout bgImage={bgImage} heading='Workout list' />
			<div
				className='wrapper-inner-page'
				style={{ paddingLeft: 0, paddingRight: 0 }}
			>
				{isSuccess ? (
					<div className={styles.wrapper}>
						{data.map((workout, idx) => (
							<div className={styles.item} key={`workouts, ${idx}`}>
								<Link to={`/workout/${workout._id}`}>
									<span>{workout.name}</span>
								</Link>
							</div>
						))}
					</div>
				) : (
					<Alert type='warning' text='Workouts not found' />
				)}
			</div>
		</>
	)
}

export default ListWorkouts
