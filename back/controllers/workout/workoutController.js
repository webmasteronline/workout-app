import asyncHandler from 'express-async-handler'
import Workout from '../../models/workoutModel.js'

// @desc    Create new workout
// @route   POST /api/workouts
// @access  Private
export const createNewWorkout = asyncHandler(async (req, res) => {
	const { name, exerciseIds } = req.body

	const workout = await Workout.create({
		name,
		exercises: exerciseIds,
	})

	res.json(workout)
})

//@desc   GET workout
//@route  GET /api/workouts/:id
//@access Private
export const getWorkout = asyncHandler(async (req, res) => {
	/* получаем workout */
	const workout = await Workout.findById(req.params.id)
		.populate('exercises')
		.lean() /* populate('exercises') - раскрывает нам полностьб все поля а не просто id возвращает уражнений		exercises: [{type: ObjectId,ref: 'Exercise',required: true,},*/

	/* отдаем workout */
	const minutes = Math.ceil(workout.exercises.length * 3.7)
	res.json({ ...workout, minutes })
})

//@desc   GET workouts
//@route  GET /api/workouts
//@access Private

export const getWorkouts = asyncHandler(async (req, res) => {
	const workouts = await Workout.find({}).populate('exercises')

	res.json(workouts)
})

//@desc   Update workout
//@route  PUT /api/workouts
//@access Private

export const updateWorkout = asyncHandler(async (req, res) => {
	const { name, exerciseIds, workoutId } = req.body

	const workout = await Workout.findById(workoutId)

	if (!workout) {
		res.status(404)
		throw new Error('Дання тренеровка не найдена!')
	}

	workout.name = name
	workout.exercises = exerciseIds

	const updatedWorkout = await workout.save()

	res.json(updatedWorkout)
})

//@desc   Delete workout
//@route  PUT /api/workouts
//@access Private

export const deleteWorkout = asyncHandler(async (req, res) => {
	const { workoutId } = req.body

	const workout = await Workout.findById(workoutId)

	if (!workout) {
		res.status(404)
		throw new Error('Данная тренеровка не найдена!')
	}

	await workout.remove()

	res.json({ message: 'Упражнение удалено' })
})
