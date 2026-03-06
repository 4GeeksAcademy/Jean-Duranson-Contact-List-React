import React, { createContext, useReducer, useEffect } from "react";
import storeReducer, { initialState } from "../store";

export const Context = createContext(null);

export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(storeReducer, initialState);

	const actions = {
		loadContacts: async () => {
			dispatch({ type: "SET_LOADING", payload: true });
			try {
				let response = await fetch(`https://playground.4geeks.com/contact/agendas/${state.agenda}/contacts`);
				
				if (response.status === 404) {
					await fetch(`https://playground.4geeks.com/contact/agendas/${state.agenda}`, { method: "POST" });
					response = await fetch(`https://playground.4geeks.com/contact/agendas/${state.agenda}/contacts`);
				}
				
				if (response.ok) {
					const data = await response.json();
					dispatch({ type: "SET_CONTACTS", payload: data.contacts });
				}
			} catch (error) {
				console.error("Error cargando contactos:", error);
			} finally {
				dispatch({ type: "SET_LOADING", payload: false });
			}
		},
		addContact: async (contact) => {
			try {
				const response = await fetch(`https://playground.4geeks.com/contact/agendas/${state.agenda}/contacts`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(contact)
				});
				if (response.ok) {
					const newContact = await response.json();
					dispatch({ type: "ADD_CONTACT", payload: newContact });
					return true; 
				}
			} catch (error) {
				return false;
			}
		},
		updateContact: async (id, contact) => {
			try {
				const response = await fetch(`https://playground.4geeks.com/contact/agendas/${state.agenda}/contacts/${id}`, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(contact)
				});
				if (response.ok) {
					const updatedContact = await response.json();
					dispatch({ type: "UPDATE_CONTACT", payload: updatedContact });
					return true;
				}
			} catch (error) {
				return false;
			}
		},
		deleteContact: async (id) => {
			try {
				const response = await fetch(`https://playground.4geeks.com/contact/agendas/${state.agenda}/contacts/${id}`, {
					method: "DELETE"
				});
				if (response.ok) {
					dispatch({ type: "DELETE_CONTACT", payload: id });
				}
			} catch (error) {
				console.error("Error al eliminar:", error);
			}
		}
	};

	useEffect(() => {
		actions.loadContacts();
	}, []);

	return (
		<Context.Provider value={{ state, actions }}>
			{children}
		</Context.Provider>
	);
};