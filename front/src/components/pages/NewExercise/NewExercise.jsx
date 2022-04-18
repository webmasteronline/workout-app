import { useState } from 'react'
import Layout from '../../common/Layout'
import cn from 'classnames'

import Field from '../../ui/Field/Field'
import { useNavigate } from 'react-router'
import Button from '../../ui/Button/Button'

import bgImage from '../../../images/new-exercise-bg.jpg'
import styles from './NewExercise.module.scss'
import { $api } from '../../../api/api'
import { useMutation } from 'react-query'
import Alert from '../../ui/Alert/Alert'
import Loader from '../../ui/Loader'

const data = ['chest', 'shoulders', 'biceps', 'legs', 'hit']

const NewExercise = () => {
	const [name, setName] = useState('')
	const [times, setTimes] = useState(0)
	const [imageName, setImageName] = useState('chest')

	const navigate = useNavigate()
	let setError = false
	const handleSubmit = (e) => {
		e.preventDefault()
		if (name && times && imageName) {
			mutate()
		} else {
			let setError = true
		}
	}

	const { isSuccess, mutate, isLoading, error } = useMutation(
		'Create new exercise',
		() =>
			$api({
				url: '/exercises',
				type: 'POST',
				body: { name, times, imageName },
			}),
		{
			onSuccess(data) {
				/* в конце ощищаем поля ввода */
				setName('')
				setTimes('')
				setImageName('')
			},
		}
	)

	return (
		<>
			<Layout bgImage={bgImage} heading='Create new exercise' />
			<div className='wrapper-inner-page'>
				{error && <Alert type='warning' text={error} />}
				{setError && (
					<Alert type='warning' text='Все поля должны быть заполнены' />
				)}
				{isSuccess && <Alert text='Exercise created' />}
				{isLoading && <Loader />}
				<form onSubmit={handleSubmit}>
					<Field
						placeholder='Enter name'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<Field
						placeholder='Enter times'
						value={times}
						onChange={(e) => setTimes(e.target.value)}
					/>
					<div className={styles.images}>
						{data.map((name) => (
							<img
								key={`ex img ${name}`}
								src={`/uploads/exercises/${name}.svg`}
								alt={name}
								className={cn({
									[styles.active]: imageName === name,
								})}
								onClick={() => setImageName(name)}
							/>
						))}
					</div>
					<Button text='Create' callback={() => {}} />
				</form>
			</div>
		</>
	)
}

export default NewExercise
