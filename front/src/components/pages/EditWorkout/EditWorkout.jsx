import { useMutation, useQuery } from 'react-query'
import { useEffect, useState } from 'react'
import Layout from '../../common/Layout'
import ReactSelect from 'react-select'

import bgImage from '../../../images/new-workout-bg.jpg'
import Field from '../../ui/Field/Field'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../ui/Button/Button'
import { Link } from 'react-router-dom'
import { $api } from '../../../api/api'
import Loader from '../../ui/Loader'
import Alert from '../../ui/Alert/Alert'
import { Helmet } from 'react-helmet'

const EditWorkout = () => {
	const { id } = useParams()
	const { data: dataWorkout, isSuccess } = useQuery(
		'workout',
		() =>
			$api({
				url: `/workouts`,
			}),
		{
			refetchOnWindowFocus: false,
		}
	)

	const { data: dataExercises, isSuccess: exerciseSuccess } = useQuery(
		'list exercises',
		() =>
			$api({
				url: '/exercises',
			}),
		{
			refetchOnWindowFocus: false,
		}
	)

	const workout = dataWorkout.find((item) => item._id === id)
	const exercises = workout.exercises.map((ex) => ({
		value: ex._id,
		label: ex.name,
	}))

	console.log(id)
	console.log('dataExercises:', dataExercises)
	console.log('dataWorkout:', dataWorkout)
	console.log('exercises:', exercises)
	//	console.log(dataWorkout)
	//console.log(workout.name)
	//	console.log(workout.exercises)

	const [name, setName] = useState(workout.name)
	const [exercisesCurrent, setExercisesCurrent] = useState(exercises)

	const navigate = useNavigate()

	const {
		mutate,
		isLoading,
		isSuccess: isSuccessMutate,
		error,
	} = useMutation(
		'Update workout',
		({ exIds }) =>
			$api({
				url: '/workouts',
				type: 'PUT',
				body: { name, exerciseIds: exIds, workoutId: id },
			}),
		{
			onSuccess() {
				navigate(`/workouts`)
				setName('')
				setExercisesCurrent(exercises)
			},
		}
	)

	const handleSubmit = (e) => {
		e.preventDefault()
		const exIds = exercisesCurrent.map((ex) => ex.value)
		console.log('exerciseIds: exIds', { exerciseIds: exIds })
		mutate({
			exIds,
		})
	}
	return (
		<>
			<Helmet>
				<title>Workout Edit</title>
			</Helmet>
			<Layout bgImage={bgImage} heading={`Edit workout`} />
			<div className='wrapper-inner-page'>
				{error && <Alert type='warning' text={error} />}
				{isSuccessMutate && <Alert text='Workout Updated' />}
				{isLoading && <Loader />}
				<form onSubmit={handleSubmit}>
					<Field
						placeholder='Enter name'
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
					<Link to='/new-exercise' className='dark-link'>
						Add new exercise
					</Link>
					{isSuccess && exerciseSuccess && (
						<ReactSelect
							classNamePrefix='select2-selection'
							placeholder='Exercises...'
							title='Exercises'
							options={dataExercises.map((ex) => ({
								value: ex._id,
								label: ex.name,
							}))}
							value={exercisesCurrent}
							onChange={setExercisesCurrent} //причина здесь
							isMulti={true}
						/>
					)}
					<Button text='Update' />
				</form>
			</div>
		</>
	)
}

export default EditWorkout
