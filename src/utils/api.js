import {configApi} from './utils.js';

class Api {
	constructor({
								baseUrl,
								headers = {}
							}) {
		this._baseUrl = baseUrl;
		this._headers = headers;
	}

	_handleResponse(res) {
		if (res.ok) {
			return res.json();
		}
		 return Promise.reject(`Ошибка: ${res.status}`);
	}

	_handleResponseError(err) {
		console.log(err);
	}

	getInfo() {
		return fetch(`${this._baseUrl}/users/me`, {
			headers: {
				authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})
			.then(this._handleResponse)
			.catch(this._handleResponseError);
	}

	getInitialCards() {
		return fetch(`${this._baseUrl}/cards`, {
			headers: {
				authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})
			.then(this._handleResponse)
			.catch(this._handleResponseError);
	}

	setInfo(inputObject) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'PATCH',
			headers: {
				authorization: `Bearer ${localStorage.getItem('token')}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(inputObject)
		})
			.then(this._handleResponse)
			.catch(this._handleResponseError);
	}

	addNewCard(namePlace, src) {
		return fetch(`${this._baseUrl}/cards`, {
			method: 'POST',
			headers: {
				authorization: `Bearer ${localStorage.getItem('token')}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: namePlace,
				link: src
			})
		})
			.then(this._handleResponse)
			.catch(this._handleResponseError)
	}

	deleteCard(id) {
		return fetch(`${this._baseUrl}/cards/${id}`, {
			method: 'DELETE',
			headers: {
				authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})
			.then(this._handleResponse)
			.catch(this._handleResponseError);
	}

	changeLikeCardStatus(cardId, isLiked) {
		if (isLiked) {
			return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
				method: 'DELETE',
				headers: {
					authorization: `Bearer ${localStorage.getItem('token')}`
				}
			})
				.then(this._handleResponse)
				.catch(this._handleResponseError);

		} else {
			return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
				method: 'PUT',
				headers: {
					authorization: `Bearer ${localStorage.getItem('token')}`
				}
			})
				.then(this._handleResponse)
				.catch(this._handleResponseError);
		}
	}

	setNewAvatar(link) {
		return fetch(`${this._baseUrl}/users/me/avatar`, {
			method: 'PATCH',
			headers: {
				authorization: `Bearer ${localStorage.getItem('token')}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				avatar: link
			})
		})
			.then(this._handleResponse)
			.catch(this._handleResponseError);
	}

}

const api = new Api(configApi);
export default api;