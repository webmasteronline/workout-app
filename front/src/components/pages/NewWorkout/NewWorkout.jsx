import React from 'react'
import Layout from '../../common/Layout'
import bgImage from '../../../images/new-workout-bg.jpg'
import Field from '../../ui/Field/Field'
import { useNavigate } from 'react-router'
import Button from '../../ui/Button/Button'
import styles from './NewWorkout.module.scss'

const NewWorkout = () => {
	const [name, setName] = React.useState('')
	const handleSubmit = () => {
		console.log('submit')
	}
	const navigate = useNavigate()
	return (
		<>
			<Layout bgImage={bgImage} />
			<div className={styles.wrapper}>
				<form onSubmit={handleSubmit}>
					<Field
						placeholder='Enter name'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					{/* React Select */}
					<Button text='Create' callback={() => navigate('/new-workout')} />
				</form>
			</div>
		</>
	)
}

export default NewWorkout
