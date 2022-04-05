import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

export const protect = asyncHandler(async (req, res, next) => {
	let token

	if (req.headers.authorization?.startsWith('Bearer')) {
		// если строчка начинается с Bearer - то мы идем дальше
		token = req.headers.authorization.split(' ')[1]
		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN) //декодируем token который приходит с помощью jwt.verify и сравниваем с нашим токеном в файле env
		const userFound = await User.findById(decoded.userId).select('-password') //ищем нашего пользователя по userId и выбираем у него все поля кроме -password
		if (userFound) {
			req.user = userFound
			next()
		} else {
			res.status(401)
			throw new Error('Не авторизован, токен не работает')
		}
	}
	if (!token) {
		res.status(401)
		throw new Error('Не авторизирован, без токена ')
	}
})
