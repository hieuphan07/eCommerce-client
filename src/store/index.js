import { createStore } from 'redux';

const SHOW_INFO = 'SHOW_INFO';
const HIDE_INFO = 'HIDE_INFO';
const TYPE_SELECT = 'TYPE_SELECT';
const PRODUCT_SELECT = 'PRODUCT_SELECT';
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const ADD_CART = 'ADD_CART';
const UPDATE_CART = 'UPDATE_CART';
const DELETE_CART = 'DELETE_CART';
const CLEAR_CART = 'CLEAR_CART';
const ORDER = 'ORDER';

const initialState = {
	showInfo: false,
	category: 'All',
	products: [],
	user: JSON.parse(localStorage.getItem('LOGINED_USER')) || null,
	cartItems: JSON.parse(localStorage.getItem('CART_ITEMS')) || [],
	total: Number(localStorage.getItem('TOTAL')) || 0,
	orders: JSON.parse(localStorage.getItem('ORDERS')) || [],
	url: 'https://ecommerce-shop-5f0427530cdd.herokuapp.com/',
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SHOW_INFO:
			return {
				...state,
				showInfo: true,
				detail: action.payload,
			};
		case HIDE_INFO:
			return {
				...state,
				showInfo: false,
				detail: action.payload,
			};
		case TYPE_SELECT:
			return {
				...state,
				category: action.selectedType,
			};
		case PRODUCT_SELECT:
			return {
				...state,
				products: action.selectedProds,
			};
		case LOGIN:
			// localStorage.setItem('LOGINED_USER', JSON.stringify(action.user));
			return {
				...state,
				user: action.user,
			};
		case LOGOUT:
			localStorage.removeItem('LOGINED_USER');
			return {
				...state,
				user: null,
			};
		case ADD_CART:
			const addedItem = action.cartItem;
			const inputQuantity = action.quantity;

			const existingItemIndex = state.cartItems.findIndex(
				(curr) => curr._id === addedItem._id
			);
			const existingItem = state.cartItems[existingItemIndex];

			let updatedCartItems;
			let updatedTotal;

			// If added-item is existing then updating quantity only

			if (existingItem) {
				const updatedQuantity =
					Number(existingItem.quantity) + Number(inputQuantity);
				const updatedAmount = updatedQuantity * existingItem.price;
				const updatedExistingItem = {
					...existingItem,
					quantity: updatedQuantity,
					amount: updatedAmount,
				};
				updatedCartItems = [...state.cartItems];
				updatedCartItems[existingItemIndex] = updatedExistingItem;
				updatedTotal = updatedCartItems.reduce(
					(total, curr) => total + Number(curr.amount),
					0
				);

				localStorage.setItem('CART_ITEMS', JSON.stringify(updatedCartItems));
				localStorage.setItem('TOTAL', updatedTotal);

				return { ...state, cartItems: updatedCartItems, total: updatedTotal };
			}

			// If added-item is not existing then adding to cart items
			else {
				const amount = inputQuantity * addedItem.price;
				updatedCartItems = [
					...state.cartItems,
					{ ...addedItem, quantity: inputQuantity, amount: amount },
				];
				updatedTotal = updatedCartItems.reduce(
					(total, curr) => total + Number(curr.amount),
					0
				);

				localStorage.setItem('CART_ITEMS', JSON.stringify(updatedCartItems));
				localStorage.setItem('TOTAL', updatedTotal);

				return { ...state, cartItems: updatedCartItems, total: updatedTotal };
			}

		case UPDATE_CART:
			const changeQuantity = action.changeQuantity;
			const inputUpdatingItem = action.cartItem;

			const updatingItemIndex = state.cartItems.findIndex(
				(curr) => curr._id === inputUpdatingItem._id
			);
			const updatingItem = state.cartItems[updatingItemIndex];

			let updatingCartItems;
			let updatingTotal;

			// Add 1 quantity

			if (changeQuantity === 'ADD') {
				const updatingQuantity = Number(updatingItem.quantity) + 1;
				const updatingAmount = updatingQuantity * updatingItem.price;
				const updatingExistingItem = {
					...updatingItem,
					quantity: updatingQuantity,
					amount: updatingAmount,
				};
				updatingCartItems = [...state.cartItems];
				updatingCartItems[updatingItemIndex] = updatingExistingItem;
				updatingTotal = updatingCartItems.reduce(
					(total, curr) => total + Number(curr.amount),
					0
				);

				localStorage.setItem('CART_ITEMS', JSON.stringify(updatingCartItems));
				localStorage.setItem('TOTAL', updatingTotal);

				return { ...state, cartItems: updatingCartItems, total: updatingTotal };
			}

			// Remove 1 quantity
			else {
				const updatingQuantity = Number(updatingItem.quantity) - 1;
				if (updatingQuantity > 0) {
					const updatingAmount = updatingQuantity * updatingItem.price;
					const updatingExistingItem = {
						...updatingItem,
						quantity: updatingQuantity,
						amount: updatingAmount,
					};
					updatingCartItems = [...state.cartItems];
					updatingCartItems[updatingItemIndex] = updatingExistingItem;
					updatingTotal = updatingCartItems.reduce(
						(total, curr) => total + Number(curr.amount),
						0
					);

					localStorage.setItem('CART_ITEMS', JSON.stringify(updatingCartItems));
					localStorage.setItem('TOTAL', updatingTotal);

					return {
						...state,
						cartItems: updatingCartItems,
						total: updatingTotal,
					};
				} else {
					updatingCartItems = [...state.cartItems];
					updatingCartItems.splice(updatingItemIndex, 1);
					updatingTotal = updatingCartItems.reduce(
						(total, curr) => total + Number(curr.amount),
						0
					);

					localStorage.setItem('CART_ITEMS', JSON.stringify(updatingCartItems));
					localStorage.setItem('TOTAL', updatingTotal);

					if (updatingCartItems.length === 0) {
						localStorage.removeItem('CART_ITEMS');
						localStorage.setItem('TOTAL', 0);
					}

					return {
						...state,
						cartItems: updatingCartItems,
						total: updatingTotal,
					};
				}
			}
		case DELETE_CART:
			const inputRemovingItem = action.cartItem;
			const removingItemIndex = state.cartItems.findIndex(
				(curr) => curr._id === inputRemovingItem._id
			);
			let removingCartItems = [...state.cartItems];

			removingCartItems.splice(removingItemIndex, 1);

			const removingTotal = removingCartItems.reduce(
				(total, curr) => total + Number(curr.amount),
				0
			);

			localStorage.setItem('CART_ITEMS', JSON.stringify(removingCartItems));
			localStorage.setItem('TOTAL', removingTotal);

			if (removingCartItems.length === 0) {
				localStorage.removeItem('CART_ITEMS');
				localStorage.setItem('TOTAL', 0);
			}

			return { ...state, cartItems: removingCartItems, total: removingTotal };
		case CLEAR_CART:
			localStorage.removeItem('CART_ITEMS');
			localStorage.removeItem('TOTAL');
			return { ...state, cartItems: [], total: 0 };
		case ORDER:
			const updatedOrders = state.orders;
			updatedOrders.push(action.order);
			localStorage.setItem('ORDERS', JSON.stringify(updatedOrders));
			return { ...state, orders: updatedOrders };
		default:
			return state;
	}
};

const store = createStore(reducer);

export default store;
