import { useMutation, useQuery } from 'react-query'
import { Helmet } from 'react-helmet'

import Loader from '../../ui/Loader'
import { $api } from '../../../api/api'
import Layout from '../../common/Layout'
import Alert from '../../ui/Alert/Alert'

import styles from './SingleWorkout.module.scss'
import bgImage from '../../../images/workout-bg.jpg'
import { useNavigate } from 'react-router-dom'

const ListWorkouts = () => {
	const navigate = useNavigate()

	const { data, isSuccess, refetch } = useQuery(
		'get workouts',
		() =>
			$api({
				url: `/workouts`,
			}),
		{
			refetchOnWindowFocus: false,
		}
	)

	const {
		mutate: createWorkoutLog,
		isLoading,
		isSuccess: isSuccessMutate,
		error,
	} = useMutation(
		'Create new workout log',
		({ workoutId }) =>
			$api({
				url: '/workouts/log',
				type: 'POST',
				body: { workoutId },
			}),
		{
			onSuccess(data) {
				navigate(`/workout/${data._id}`)
			},
		}
	)

	const {
		mutate: dellWorkout,
		// isLoading: isDelWorkout,
		// isSuccess: isSuccessDellWorkout,
		// error: errorDelWorkout,
	} = useMutation(
		'Dell workout',
		(workoutId) =>
			$api({
				url: `/workouts/${workoutId}`,
				type: 'DELETE',
			}),
		{
			onSuccess() {
				refetch()
			},
		}
	)

	return (
		<>
			<Helmet>
				<title>Workout List</title>
			</Helmet>
			<Layout bgImage={bgImage} heading='Workout list' />
			<div
				className='wrapper-inner-page'
				style={{ paddingLeft: 0, paddingRight: 0 }}
			>
				{error && <Alert type='error' text={error} />}
				{isSuccessMutate && <Alert text='Workout log created' />}
				{isLoading && <Loader />}
				{isSuccess && (
					<div className={styles.wrapper}>
						{data.map((workout, idx) => (
							<div className={styles.item} key={`workout ${idx}`}>
								<button
									aria-label='Create new workout'
									onClick={() =>
										createWorkoutLog({
											workoutId: workout._id,
										})
									}
								>
									<span>{workout.name}</span>
								</button>
								<div>
									<button
										aria-label='Delete exercise'
										onClick={() => dellWorkout(workout._id)}
									>
										Dell
									</button>
									<button
										aria-label='Edit exercise'
										 onClick={() => navigate(`/edit-workout/${workout._id}`)}
									>
										Edit
									</button>
								</div>
							</div>
						))}
					</div>
				)}
				{isSuccess && data?.length === 0 && (
					<Alert type='warning' text='Workouts not found' />
				)}
			</div>
		</>
	)
}

export default ListWorkouts
