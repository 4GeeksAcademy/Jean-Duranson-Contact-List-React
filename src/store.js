export const initialState = {
	contacts: [],
	agenda: "jean_pierre",
	isLoading: false
};

export default function storeReducer(state, action) {
	switch (action.type) {
		case "SET_LOADING":
			return { ...state, isLoading: action.payload };
		case "SET_CONTACTS":
			return { ...state, contacts: action.payload };
		case "ADD_CONTACT":
			return { ...state, contacts: [...state.contacts, action.payload] };
		case "UPDATE_CONTACT":
			return {
				...state,
				contacts: state.contacts.map(contact => 
					contact.id === action.payload.id ? action.payload : contact
				)
			};
		case "DELETE_CONTACT":
			return {
				...state,
				contacts: state.contacts.filter(contact => contact.id !== action.payload)
			};
		default:
			return state;
	}
}