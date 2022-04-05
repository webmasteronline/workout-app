import asyncHandler from 'express-async-handler'

import WorkoutLog from '../../models/workoutLogModel.js'

//@desc   Create new Workout Log
//@route  POST /api/workouts/log
//@access Private

export const createNewWorkoutLog = asyncHandler(async (req, res) => {
	const { workoutId } = req.body

	const workoutLog = await WorkoutLog.create({
		workout: workoutId,
	})

	res.json(workoutLog)
})
