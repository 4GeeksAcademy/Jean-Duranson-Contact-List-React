import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../hooks/useGlobalReducer";

export const ContactCard = ({ contact }) => {
	const { actions } = useContext(Context);
	const [showModal, setShowModal] = useState(false);

	const confirmDelete = () => {
		actions.deleteContact(contact.id);
		setShowModal(false); 
	};

	return (
		<>
			<li className="list-group-item d-flex justify-content-between align-items-center p-3">
				<div className="d-flex align-items-center flex-wrap">
					<img 
						src={`https://i.pravatar.cc/150?u=${contact.id}`} 
						alt="Profile" 
						className="rounded-circle me-4 mb-2 mb-md-0 shadow-sm" 
						style={{ width: "90px", height: "90px", objectFit: "cover" }} 
					/>
					<div>
						<h5 className="mb-1 fw-bold">{contact.name}</h5>
						<p className="mb-1 text-secondary"><i className="fas fa-map-marker-alt me-3"></i>{contact.address}</p>
						<p className="mb-1 text-secondary"><i className="fas fa-phone me-3"></i>{contact.phone}</p>
						<p className="mb-1 text-secondary"><i className="fas fa-envelope me-3"></i>{contact.email}</p>
					</div>
				</div>
				<div className="d-flex flex-column flex-md-row gap-2 mt-3 mt-md-0">
					<Link to={`/edit-contact/${contact.id}`} className="btn btn-outline-primary shadow-sm">
						<i className="fas fa-pencil-alt"></i>
					</Link>
					<button className="btn btn-outline-danger shadow-sm" onClick={() => setShowModal(true)}>
						<i className="fas fa-trash-alt"></i>
					</button>
				</div>
			</li>

			{showModal && (
				<div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
					<div className="modal-dialog modal-dialog-centered">
						<div className="modal-content">
							<div className="modal-header bg-danger text-white">
								<h5 className="modal-title fw-bold">
									<i className="fas fa-exclamation-triangle me-2"></i> Confirmar Eliminación
								</h5>
								<button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
							</div>
							<div className="modal-body text-center py-4">
								<p className="mb-0 fs-5">¿Estás seguro de borrar a <br/><strong className="fs-4">{contact.name}</strong>?</p>
								<p className="text-muted mt-2 mb-0">Esta acción no se puede deshacer.</p>
							</div>
							<div className="modal-footer justify-content-center bg-light">
								<button type="button" className="btn btn-secondary fw-bold px-4" onClick={() => setShowModal(false)}>Cancelar</button>
								<button type="button" className="btn btn-danger fw-bold px-4" onClick={confirmDelete}>Sí, eliminar</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};