import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema

const workoutLogScheme = mongoose.Schema(
	{
		user: {
			type: ObjectId,
			ref: 'User',
			required: true,
		},
		workout: { type: ObjectId, ref: 'Workout', required: true },
		completed: { type: Boolean, default: true },
	},
	{ minimize: false, timestamps: true }
)

const WorkoutLog = mongoose.model('WorkoutLog', workoutLogScheme)

export default WorkoutLog
