import { useState } from 'react'
import Layout from '../../common/Layout'

import bgImage from '../../../images/new-exercise-bg.jpg'
import Field from '../../ui/Field/Field'
import { useNavigate } from 'react-router'
import Button from '../../ui/Button/Button'
import styles from './NewExercise.module.scss'

const data = ['chest', 'shoulders', 'biceps', 'legs', 'hit']

const NewExercise = () => {
	const [name, setName] = useState('')
	const [times, setTimes] = useState(0)
	const [imageIdx, setImageIdx] = useState(0)
	const handleSubmit = () => {
		console.log('submit')
	}
	const navigate = useNavigate()
	return (
		<>
			<Layout bgImage={bgImage} heading='Create new exercise' />
			<div className='wrapper-inner-page'>
				<form onSubmit={handleSubmit}>
					<Field
						placeholder='Enter name'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<Field
						placeholder='Enter times'
						value={name}
						onChange={(e) => setTimes(e.target.value)}
					/>
					<div className={styles.images}>
						{data.map((name) => (
							<img src={`/uploads/exercises/${name}.svg`} alt={name} />
						))}
					</div>
					<Button text='Create' callback={() => navigate('/new-workout')} />
				</form>
			</div>
		</>
	)
}

export default NewExercise
