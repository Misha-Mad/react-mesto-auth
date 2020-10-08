import React from 'react';
import { Link, useHistory, useLocation } from "react-router-dom";

function Header({ loggedIn, setloggedIn, userData, onUserData }) {

	const location = useLocation();
	const history = useHistory();
	function signOut() {
		localStorage.removeItem('token');
		setloggedIn(false)
		onUserData({});
		history.push('/sign-in');
	}
	return (
			<header className="header">
				{loggedIn ?
					<>
						<p className="header__email">{userData.email}</p>
						<button className="header__button" onClick={signOut}>Выход</button>
					</> :
					location.pathname === '/sign-in' ?
						<Link to="/sign-up"  className="header__link" >Регистрация</Link> :
						<Link to="/sign-in"  className="header__link" >Войти</Link>
				}
			</header>
	)
}

export default Header;