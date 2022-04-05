import mongoose from 'mongoose'

const exerciseScheme = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		times: {
			//количество подходов
			type: Number,
			required: true,
		},
		imageIdx: {
			type: Number,
			required: true,
		},
	},
	{ minimize: false, timestamps: true }
)

const Exercise = mongoose.model('Exercise', exerciseScheme)

export default Exercise
