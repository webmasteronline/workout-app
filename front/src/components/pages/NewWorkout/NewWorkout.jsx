import React from 'react'
import Layout from '../../common/Layout'
import ReactSelect from 'react-select'

import bgImage from '../../../images/new-workout-bg.jpg'
import Field from '../../ui/Field/Field'
import { useNavigate } from 'react-router'
import Button from '../../ui/Button/Button'
import styles from './NewWorkout.module.scss'
import { Link } from 'react-router-dom'

const NewWorkout = () => {
	const [name, setName] = React.useState('')
	const [exercises, setExercises] = React.useState('')
	const handleSubmit = () => {
		console.log('submit')
	}
	const navigate = useNavigate()
	return (
		<>
			<Layout bgImage={bgImage} heading='Create new workout' />
			<div className={styles.wrapper}>
				<form onSubmit={handleSubmit}>
					<Field
						placeholder='Enter name'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<Link to='/mew-exercise' className='dark-link'>
						Add new exercise
					</Link>
					<ReactSelect
						classNamePrefix='select2-selection'
						placeholder='Exercises...'
						title='Exercises'
						options={[
							{ value: 'ewwrwrrw', label: 'Push-ups' },
							{ value: 'ewwrrw', label: 'Push-ups' },
						]}
						value={exercises}
						onChange={setExercises}
						isMulti={true}
					/>
					<Button text='Create' callback={() => navigate('/new-workout')} />
				</form>
			</div>
		</>
	)
}

export default NewWorkout
