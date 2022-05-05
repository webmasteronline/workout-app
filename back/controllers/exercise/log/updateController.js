import asyncHandler from 'express-async-handler'
import ExerciseLog from '../../../models/exerciseLogModel.js'

//@desc   Update exercise Log
//@route  PUT /api/exercises/log
//@access Private
export const updateExerciseLog = asyncHandler(async (req, res) => {
	const { logId, timeIndex, key, value } = req.body //все эти поля мы получаем из body сейчас мы отправляем их через insomnia в дальнейшем это будут поля на странице кооторые мы будем заполнять в фронте
	// timeIndex - какой именно подход 1,2,3...
	//key - ключь weight,repeat,completed ... value - это новое значение для этих ключей

	const currentLog = await ExerciseLog.findById(logId) //ищем Log по id

	//если данный Log не найден выдаем ошибку
	if (!currentLog) {
		res.status(404)
		throw new Error('Данный лог не найден!')
	}

	//currentlog.times - берет из exerciseLogModel.js наши поля weight,repeat,completed
	let newTimes = currentLog.times

	if ((!timeIndex && timeIndex !== 0) || !key || (!value && value !== false)) {
		res.status(404)
		throw new Error('Вы не указали все поля!')
	}

	newTimes[timeIndex][key] = value

	currentLog.times = newTimes

	const updatedLog = await currentLog.save()

	res.json(updatedLog)
})

// @desc    Update status of complete exercise log
// @route   PUT /api/exercises/log/complete
// @access  Private
export const updateCompleteExerciseLog = asyncHandler(async (req, res) => {
	const { logId, completed } = req.body

	const currentLog = await ExerciseLog.findById(logId).populate(
		'exercise',
		'workout'
	)

	if (!currentLog) {
		res.status(404)
		throw new Error('Данный лог не найден!')
	}

	currentLog.completed = completed

	const updatedLog = await currentLog.save()

	res.json(updatedLog)
})
