import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'

const userScheme = mongoose.Schema(
	{
		name: String,
		password: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		image: {
			before: String,
			after: String,
		},
		statistics: {
			minutes: { type: Number, default: 0 },
			workout: { type: Number, default: 0 },
			kgs: { type: Number, default: 0 },
		},
	},
	{ minimize: false, timestamps: true }
)

/*создаем метод matchPassword который будем использовать дальше в контролере */
userScheme.methods.matchPassword = async function (enteredPassword) {
	return await bcryptjs.compare(enteredPassword, this.password) // сравниваем текущий пароль и введенный bcrypt - расшифровывает и сравнивает
}

// если пароль не был изменен то идем дальше
userScheme.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next()
	}

	const salt = await bcryptjs.genSalt(10) // если пароль изменили то мы снова его шифруем
	this.password = await bcryptjs.hash(this.password, salt)
})

const User = mongoose.model('User', userScheme)

export default User
