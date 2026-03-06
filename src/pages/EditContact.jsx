import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../hooks/useGlobalReducer";

export const EditContact = () => {
    const { state, actions } = useContext(Context);
    const navigate = useNavigate();
    const { id } = useParams();
    const [contact, setContact] = useState({ name: "", email: "", phone: "", address: "" });
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const currentContact = state.contacts.find(c => c.id === parseInt(id));
        if (currentContact) setContact(currentContact);
    }, [id, state.contacts]);

    const handleChange = (e) => setContact({ ...contact, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        const success = await actions.updateContact(id, contact);
        setIsSaving(false);
        if (success) {
            navigate("/");
        } else {
            alert("Error al actualizar el contacto.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-12 col-md-8 col-lg-6 mx-auto">
                    <h1 className="text-center mb-4 fw-bold">Edit contact</h1>
                    <form onSubmit={handleSubmit} className="shadow-sm p-4 border rounded bg-light">
                        <div className="mb-3"><label className="form-label fw-bold">Full Name</label><input type="text" className="form-control" name="name" value={contact.name || ""} onChange={handleChange} required /></div>
                        <div className="mb-3"><label className="form-label fw-bold">Email</label><input type="email" className="form-control" name="email" value={contact.email || ""} onChange={handleChange} required /></div>
                        <div className="mb-3"><label className="form-label fw-bold">Phone</label><input type="text" className="form-control" name="phone" value={contact.phone || ""} onChange={handleChange} required /></div>
                        <div className="mb-3"><label className="form-label fw-bold">Address</label><input type="text" className="form-control" name="address" value={contact.address || ""} onChange={handleChange} required /></div>
                        <button type="submit" className="btn btn-primary w-100 mb-3 fw-bold" disabled={isSaving}>
                            {isSaving ? <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Updating...</> : "Update Contact"}
                        </button>
                        <div className="text-center"><Link to="/" className="text-decoration-none">or get back to contacts</Link></div>
                    </form>
                </div>
            </div>
        </div>
    );
};