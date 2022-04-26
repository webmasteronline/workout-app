import { useQuery } from 'react-query'
import Header from '../../common/Header/Header'

import bgImage from '../../../images/workout-bg.jpg'

import styles from './SingleWorkout.module.scss'
import stylesLayout from '../../common/Layout.module.scss'
import { $api } from '../../../api/api'
import { useParams } from 'react-router'
import Alert from '../../ui/Alert/Alert'
import { Link } from 'react-router-dom'
import { Fragment } from 'react'

const SingleWorkout = () => {
	const { id } =
		useParams() /** получаем наш параметр id из адресной строки. для этого в dataRoutes указываем (path: '/workout/:id') */
	const { data, isSuccess } = useQuery(
		'get workout',
		() =>
			$api({
				url: `/workouts/${id}`,
			}),
		{
			refetchOnWindowFocus: false,
		}
	)
	return (
		<>
			<div
				className={`${stylesLayout.wrapper} ${stylesLayout.otherPage}`}
				style={{ backgroundImage: `url(${bgImage})`, height: 356 }}
			>
				<Header />

				{isSuccess && (
					<div>
						<time className={styles.time}>{data.minutes + ' min.'}</time>
						<h1 className={stylesLayout.heading}>{data.name}</h1>
					</div>
				)}
			</div>
			<div
				className='wrapper-inner-page'
				style={{ paddingLeft: 0, paddingRight: 0 }}
			>
				{isSuccess ? (
					<div className={styles.wrapper}>
						{data.exercises.map((ex, idx) => {
							return (
								<Fragment key={`ex ${idx}`}>
									<div className={styles.item}>
										<Link to={`/exercises/${ex._id}`}>
											<span>{ex.name}</span>
											<img
												src={`/uploads/exercises/${ex.imageName}.svg`}
												height='34'
												alt=''
												draggable={false}
											/>
										</Link>
									</div>
									{idx % 2 !== 0 && <div className={styles.line}></div>}
								</Fragment>
							)
						})}
					</div>
				) : (
					<Alert type='warning' text='Exercises not found' />
				)}
			</div>
		</>
	)
}

export default SingleWorkout
