import { Helmet } from 'react-helmet'

import Layout from '../../common/Layout'
import Alert from '../../ui/Alert/Alert'

import styles from './ListExercises.module.scss'
import bgImage from '../../../images/workout-bg.jpg'
import { useNavigate } from 'react-router-dom'
import Loader from '../../ui/Loader'
import { useMutation, useQuery } from 'react-query'
import { $api } from '../../../api/api'

const ListExercises = () => {
	const navigate = useNavigate()

	const { data, isSuccess, refetch } = useQuery(
		'get exercises',
		() =>
			$api({
				url: '/exercises',
			}),
		{
			refetchOnWindowFocus: false,
		}
	)

	const {
		mutate,
		isSuccess: isSuccessMutate,
		isLoading,
		error,
	} = useMutation(
		'Delete exercise',
		(exerciseId) =>
			$api({
				url: `/exercises/${exerciseId}`,
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
				<title>Exercises List</title>
			</Helmet>
			<Layout bgImage={bgImage} heading='Exercises list' />
			<div
				className='wrapper-inner-page'
				style={{ paddingLeft: 0, paddingRight: 0 }}
			>
				{error && <Alert type='error' text={error} />}
				{isSuccessMutate && <Alert text='Exercise deleted' />}
				{isLoading && <Loader />}
				{isSuccess && (
					<div className={styles.wrapper}>
						{data.map((exercise, idx) => (
							<div className={styles.item} key={`exercise ${idx}`}>
								<img
									src={`/uploads/exercises/${exercise.imageName}.svg`}
									alt={exercise.imageName}
									draggable={false}
								/>
								<span>{exercise.name}</span>
								<div>
									<button
										aria-label='Delete exercise'
										onClick={() => mutate(exercise._id)}
									>
										Dell
									</button>
									<button
										aria-label='Edit exercise'
										onClick={() => navigate(`/edit-exercise/${exercise._id}`)}
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

export default ListExercises
