import User from '../../models/userModel.js'
import asyncHandler from 'express-async-handler'
import { generateToken } from '../../helpers/generateToken.js'
//@desc   Register user
//@route  POST /api/users
//@access Public

export const registerUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	const isHaveUser = await User.findOne({ email }) //ищем по эмайлу

	//если есть пользователь с таким эмайлом то выдаем ошибку
	if (isHaveUser) {
		res.status(400)
		throw new Error('Данный пользователь уже зарегистрирован')
	}

	// создаем юзера и передаем ему pass and email
	const user = await User.create({
		email,
		password,
	})

	const token = generateToken(user._id)
	res.json({ user, token }) //отдаем нашего пользователя которого зарегистрировали
})
