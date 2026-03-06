import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../hooks/useGlobalReducer";

export const AddContact = () => {
	const { actions } = useContext(Context);
	const navigate = useNavigate();
	const [contact, setContact] = useState({ name: "", email: "", phone: "", address: "" });
	const [isSaving, setIsSaving] = useState(false);

	const handleChange = (e) => setContact({ ...contact, [e.target.name]: e.target.value });

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSaving(true); 
		const success = await actions.addContact(contact);
		setIsSaving(false); 
		if (success) {
			navigate("/"); 
		} else {
			alert("Error al guardar el contacto.");
		}
	};

	return (
		<div className="container mt-5">
			<div className="row">
				<div className="col-12 col-md-8 col-lg-6 mx-auto">
					<h1 className="text-center mb-4 fw-bold">Add a new contact</h1>
					<form onSubmit={handleSubmit} className="shadow-sm p-4 border rounded bg-light">
						<div className="mb-3"><label className="form-label fw-bold">Full Name</label><input type="text" className="form-control" name="name" onChange={handleChange} required /></div>
						<div className="mb-3"><label className="form-label fw-bold">Email</label><input type="email" className="form-control" name="email" onChange={handleChange} required /></div>
						<div className="mb-3"><label className="form-label fw-bold">Phone</label><input type="text" className="form-control" name="phone" onChange={handleChange} required /></div>
						<div className="mb-3"><label className="form-label fw-bold">Address</label><input type="text" className="form-control" name="address" onChange={handleChange} required /></div>
						<button type="submit" className="btn btn-primary w-100 mb-3 fw-bold" disabled={isSaving}>
							{isSaving ? <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Saving...</> : "Save"}
						</button>
						<div className="text-center"><Link to="/" className="text-decoration-none">or get back to contacts</Link></div>
					</form>
				</div>
			</div>
		</div>
	);
};