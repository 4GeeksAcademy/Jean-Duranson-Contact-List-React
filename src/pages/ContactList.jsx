import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../hooks/useGlobalReducer";
import { ContactCard } from "../components/ContactCard";

export const ContactList = () => {
	const { state } = useContext(Context);

	if (state.isLoading) {
		return (
			<div className="d-flex justify-content-center align-items-center vh-100 w-100">
				<div className="spinner-border text-primary" role="status" style={{ width: "4rem", height: "4rem" }}>
					<span className="visually-hidden">Loading...</span>
				</div>
			</div>
		);
	}

	return (
		<div className="container mt-5">
			<div className="row">
				<div className="col-12 col-md-10 col-lg-8 mx-auto">
					<div className="d-flex justify-content-end mb-3">
						<Link to="/add-contact" className="btn btn-success fw-bold">Add new contact</Link>
					</div>
					<ul className="list-group shadow-sm">
						{state.contacts && state.contacts.length > 0 ? (
							state.contacts.map((contact) => (
								<ContactCard key={contact.id} contact={contact} />
							))
						) : (
							<li className="list-group-item text-center text-muted py-4">No contacts found. Create one!</li>
						)}
					</ul>
				</div>
			</div>
		</div>
	);
};