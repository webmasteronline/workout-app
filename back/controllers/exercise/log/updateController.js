import asyncHandler from 'express-async-handler'

import ExerciseLog from '../../../models/exerciseLogModel.js'

//@desc   Update exercise Log
//@route  PUT /api/exercises/log
//@access Private

export const updateExerciseLog = asyncHandler(async (req, res) => {
	const { logId, timeIndex, key, value } = req.body //все эти поля мы получаем из body сейчас мы отправляем их через insomnia в дальнейшем это будут поля на странице кооторые мы будем заполнять в фронте
	// timeIndex - какой именно подход 1,2,3...
	//key - ключь weight,repeat,completed ... value - это новое значение для этих ключей

	const currentlog = await ExerciseLog.findById(logId) //ищем Log по id

	//если данный Log не найден выдаем ошибку
	if (!currentlog) {
		res.status(404)
		throw new Error('Данный лог не найден!')
	}

	//currentlog.times - берет из exerciseLogModel.js наши поля weight,repeat,completed
	let newTimes = currentlog.times

	if (!timeIndex || !key || !value) {
		res.status(404)
		throw new Error('Вы не указали все поля!')
	}

	newTimes[timeIndex][key] = value
	currentlog.times = newTimes

	const exerciseLog = await currentlog.save()

	res.json(exerciseLog)
})

//@desc   Update status of complete exercise Log
//@route  PUT /api/exercises/log/completed
//@access Private

export const updateCompleteExerciseLog = asyncHandler(async (req, res) => {
	const { logId, completed } = req.body

	const currentlog = await ExerciseLog.findById(logId)

	if (!currentlog) {
		res.status(404)
		throw new Error('Данный лог не найден!')
	}

	currentlog.completed = completed

	const exerciseLog = await currentlog.save()

	res.json(exerciseLog)
})
