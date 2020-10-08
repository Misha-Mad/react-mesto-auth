import React from 'react';
import {Link} from 'react-router-dom';

function Login({ onLogin , handleChange, userData }) {

	function handleSubmit(e) {
		e.preventDefault();
		if (!userData.email || !userData.password) {
			return;
		}
		onLogin();
	}

	return (
		<main className="content">

			<section className="entrence">

				<form onSubmit={handleSubmit} className="entrence__form">
					<h1 className="entrence__title">Вход</h1>
					<input required minLength="2" name="email" type="email" value={userData.email} onChange={handleChange} className="entrence__input"
								 placeholder="Email"/>
					<input required minLength="2" name="password" type="password" value={userData.password} onChange={handleChange}
								 className="entrence__input" placeholder="Пароль"/>
					<button onSubmit={handleSubmit} className="entrence__button">Войти</button>
					<p className="entrence__question">Ещё не зарегистрированы? <Link className="entrence__link"
																																					 to="/sign-up">Регистрация</Link></p>
				</form>

			</section>

		</main>
	)

}

export default Login;