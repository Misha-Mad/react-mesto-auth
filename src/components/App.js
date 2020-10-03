import React from 'react';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmationDeleteCard from './ConfirmationDeleteCard';

function App() {

	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
	const [isConfirmationDeleteCard, setIsConfirmationDeleteCard] = React.useState(false);

	const [selectedCard, setSelectedCard] = React.useState('');
	const [currentUser, setCurrentUser] = React.useState({});
	const [cards, setCards] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(false);
	const [currentCard, setCurrentCard] = React.useState(false);

	React.useEffect(() => {
		Promise.all([api.getInfo(), api.getInitialCards()])
			.then(([currentUser, cards]) => {
				setCurrentUser(currentUser);
				setCards(cards);
			})
	}, []);

	React.useEffect( () => {
		api.getInfo()
			.then(currentUser => {
				setCurrentUser(currentUser);
			})
	}, [isEditProfilePopupOpen])

	React.useEffect(() => {

		function handleEscClose(event) {
			if (event.key === "Escape") {
				closeAllPopups();
			}
		}

		function closeByOverlay(event) {
			if (event.target.classList.contains('popup_active')) {
				closeAllPopups();
			}
		}

		document.addEventListener('mousedown', closeByOverlay);
		document.addEventListener('keydown', handleEscClose);

		return () => {
			document.removeEventListener('keydown', handleEscClose);
			document.removeEventListener('mousedown', closeByOverlay);
		}
	})

	function handleCardClick(card) {
		setSelectedCard(card);
	}

	function handleDeleteClick(card) {
		setIsConfirmationDeleteCard(true);
		setCurrentCard(card);
	}

	function handleEditAvatarClick() {
		setIsEditAvatarPopupOpen(true);
	}

	function handleEditProfileClick() {
		setIsEditProfilePopupOpen(true);
	}

	function handleAddPlaceClick() {
		setIsAddPlacePopupOpen(true);
	}

	function closeAllPopups() {
		setIsEditProfilePopupOpen(false);
		setIsEditAvatarPopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setIsConfirmationDeleteCard(false);
		setSelectedCard('');
		setIsLoading(false);
	}

	function handleUpdateUser(inputObj) {
		setIsLoading(true);
		api.setInfo(inputObj.values)
			.then(newUserInfo => {
					setCurrentUser(newUserInfo);
					closeAllPopups();
				}
			)
	}

	function handleUpdateAvatar(link) {
		setIsLoading(true);
		api.setNewAvatar(link)
			.then(newUserInfo => {
					setCurrentUser(newUserInfo);
					closeAllPopups();
				}
			)
	}

	function handleCardLike(card) {
		const isLiked = card.likes.some(i => i._id === currentUser._id);
		api.changeLikeCardStatus(card._id, isLiked)
			.then((newCard) => {
				const newCards = cards.map((c) => c._id === card._id ? newCard : c);
				setCards(newCards);
			});
	}

	function handleDeleteCard(card) {
		setIsLoading(true);
		api.deleteCard(card._id)
			.then(() => {
				const newCards = cards.filter((c) => card._id !== c._id);
				setCards(newCards);
				closeAllPopups();
			});
	}

	function handleAddPlaceSubmit(namePlace, src) {
		setIsLoading(true);
		api.addNewCard(namePlace, src)
			.then(newCard => {
				if (newCard !== undefined) {
					setCards([newCard, ...cards]);
				}
				closeAllPopups();
			})
	}

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="root">

				< Header/>
				< Main onEditProfile={handleEditProfileClick}
							 onAddPlace={handleAddPlaceClick}
							 onEditAvatar={handleEditAvatarClick}
							 onCardClick={handleCardClick}
							 cards={cards}
							 onCardLike={handleCardLike}
							 onCardDelete={handleDeleteClick}
				/>
				< Footer/>

				<EditProfilePopup isOpen={isEditProfilePopupOpen}
													onClose={closeAllPopups}
													onUpdateUser={handleUpdateUser}
													isLoading={isLoading}
													/>

				<EditAvatarPopup isOpen={isEditAvatarPopupOpen}
												 onClose={closeAllPopups}
												 onUpdateAvatar={handleUpdateAvatar}
												 isLoading={isLoading}
												 />

				<AddPlacePopup isOpen={isAddPlacePopupOpen}
											 onClose={closeAllPopups}
											 onAddPlace={handleAddPlaceSubmit}
											 isLoading={isLoading}
											 />

				<ConfirmationDeleteCard isOpen={isConfirmationDeleteCard}
																onClose={closeAllPopups}
																onDelete={handleDeleteCard}
																isLoading={isLoading}
																currentCard={currentCard}
				/>

				<ImagePopup card={selectedCard}
										onClose={closeAllPopups}
				/>

			</div>
		</CurrentUserContext.Provider>
	)
}

export default App;