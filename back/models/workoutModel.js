import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema

const workoutScheme = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		//упражнения
		exercises: [
			{
				type: ObjectId,
				ref: 'Exercise',
				required: true,
			},
		],
	},
	{ minimize: false, timestamps: true }
)

const Workout = mongoose.model('Workout', workoutScheme)

export default Workout
