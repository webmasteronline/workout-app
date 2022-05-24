import { useState } from 'react'
import Layout from '../../common/Layout'
import cn from 'classnames'

import Field from '../../ui/Field/Field'
import Button from '../../ui/Button/Button'

import bgImage from '../../../images/new-exercise-bg.jpg'
import styles from './EditExercise.module.scss'
import { $api } from '../../../api/api'
import { useMutation, useQuery } from 'react-query'
import Alert from '../../ui/Alert/Alert'
import Loader from '../../ui/Loader'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const dataIcon = ['chest', 'shoulders', 'biceps', 'legs', 'hit']

const EditExercise = () => {
	const { data } = useQuery(
		'get exercises',
		() =>
			$api({
				url: '/exercises',
			}),
		{
			refetchOnWindowFocus: false,
		}
	)
	const { id } = useParams()
	const exercise = data.find((ex) => ex._id === id)
	const exerciseId = id
	const [name, setName] = useState(exercise.name)
	const [times, setTimes] = useState(exercise.times)
	const [imageName, setImageName] = useState(exercise.imageName)
	const [errorEmpty, setErrorEmpty] = useState(false)

	const navigate = useNavigate()

	const handleSubmit = (e) => {
		e.preventDefault()
		if (name && times && imageName) {
			EditExerciseMut()
		} else {
			setErrorEmpty(true)
		}
	}

	const {
		mutate: EditExerciseMut,
		isSuccess,
		isLoading,
		error,
	} = useMutation(
		'Edit exercise',
		() =>
			$api({
				url: `/exercises`,
				type: 'PUT',
				body: { name, times, imageName, exerciseId },
			}),
		{
			onSuccess() {
				navigate('/dell-exercise')
			},
		}
	)

	return (
		<>
			<Layout bgImage={bgImage} heading='Create new exercise' />
			<div className='wrapper-inner-page'>
				{error && <Alert type='warning' text={error} />}
				{errorEmpty && <Alert type='warning' text='Заполните все поля' />}
				{isSuccess && <Alert text='Exercise created' />}
				{isLoading && <Loader />}
				<form onSubmit={handleSubmit}>
					<Field
						placeholder={name}
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<Field
						placeholder={times}
						value={times}
						onChange={(e) => setTimes(e.target.value)}
					/>
					<div className={styles.images}>
						{dataIcon.map((name) => (
							<img
								key={`ex img ${name}`}
								src={`/uploads/exercises/${name}.svg`}
								alt={name}
								className={cn({
									[styles.active]: imageName === name,
								})}
								onClick={() => setImageName(name)}
								draggable={false}
							/>
						))}
					</div>
					<Button text='Create' onClick={() => EditExerciseMut()} />
				</form>
			</div>
		</>
	)
}

export default EditExercise
