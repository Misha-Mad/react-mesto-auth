import {configAuthApi} from './utils';

class AuthApi {
	constructor({
								baseUrl
							}) {
		this._baseUrl = baseUrl;
	}

	register(password, email) {
		return fetch(`${this._baseUrl}/signup`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				password: password,
				email: email
			})
		})
			.then((response,) => {
				return response.json();
			})
			.then((res) => {
				return res;
			})
			.catch((err) => console.log(err));
	};

	authorize(password, email) {
		return fetch(`${this._baseUrl}/signin`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				password: password,
				email: email
			})
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(`Ошибка: ${res.status}`);
			})
			.then((data) => {
				if (data) {
					localStorage.setItem('token', data.token);
					return data;
				}
			})
			.catch((err) => console.log(err));
	}

	getContent() {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			}
		})
			.then(res => res.json())
			.then(data => data)
	}

}

const authApi = new AuthApi(configAuthApi);
export default authApi;
