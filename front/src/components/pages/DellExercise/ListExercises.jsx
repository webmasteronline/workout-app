import { useMutation, useQuery } from 'react-query'
import { Helmet } from 'react-helmet'

import { $api } from '../../../api/api'
import Layout from '../../common/Layout'
import Alert from '../../ui/Alert/Alert'

import styles from './ListExercises.module.scss'
import bgImage from '../../../images/workout-bg.jpg'
//import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const ListExercises = () => {
	const [exerciseIds, setExerciseIds] = useState('')
	//const navigate = useNavigate()

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
		error,
	} = useMutation('Delete Exercise', ({ exerciseId }) =>
		$api({
			url: '/exercises',
			type: 'DELETE',
			body: { exerciseId: exerciseId },
		})
	)
	const handleSubmit = (e) => {
		e.preventDefault()
		const exerciseId = exerciseIds
		mutate({ exerciseId })
	}
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
				{isSuccessMutate && <Alert text='Workout log created' />}
				{isSuccess && (
					<form onSubmit={handleSubmit}>
						<div className={styles.wrapper}>
							{data.map((exercise, idx) => (
								<div className={styles.item} key={`exercise ${idx}`}>
									<span>{exercise.name}</span>

									<button
										value={exerciseIds}
										aria-label='Delete exercise'
										onClick={() => setExerciseIds(exercise._id)}
									>
										Dell{exercise._id}
									</button>
								</div>
							))}
						</div>
					</form>
				)}
				{isSuccess && data?.length === 0 && (
					<Alert type='warning' text='Workouts not found' />
				)}
			</div>
		</>
	)
}

export default ListExercises
