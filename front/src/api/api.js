import axios from 'axios'

const instance = axios.create({
	baseURL: '/api',
	headers: {
		'Content-Type': 'application/json',
		//Authorization: `Bearer ${token}`, //так было бы если бы мы брали токен но на данный момент не берем его- мы указали его на 14 строке ниже
	},
})

export const $api = async ({ url, type = 'GET', auth = true, body }) => {
	if (auth) {
		const token = localStorage.getItem('token')
		instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
	}
	let data
	try {
		switch (type) {
			case 'GET':
			default:
				data = await instance.get(url)
				break
			case 'POST':
				data = await instance.post(url, body)
				break
			case 'PUT':
				data = await instance.put(url, body)
				break
			case 'DELETE':
				data = await instance.delete(url, body)
				break
		}
		return data.data
	} catch (error) {
		throw error.response && error.response.data
			? error.response.data.message
			: error.message
	}
}
