import React, { useState, useEffect } from "react";
import $logoAdmin from "../images/mup.png";
import "../styles/User.css";
import { useNavigate } from "react-router-dom";
import { FaHome, FaUser } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Button, Modal } from "react-bootstrap";
import Axios from "axios";

function User({ role, changeRole, loginStatus, handleLogin }) {
  const navigate = useNavigate();
  const [cases, setCases] = useState([]);

  useEffect(() => {
    if (loginStatus === false) {
      navigate("/");
    }
    if (role !== "user") {
      navigate("/");
    }

    Axios.get("http://localhost:4000/getCases")
      .then((response) => {
        setCases(response.data);
      })
      .catch((error) => {
        console.error("Greška pri dohvaćanju podataka: " + error);
      });
  }, [loginStatus, role, navigate]);
  const [showViewCasesModal, setShowViewCasesModal] = useState(false);

  const handleClose = () => {
    setShowViewCasesModal(false);
  };
  const handleShowViewCases = () => {
    setShowViewCasesModal(true);
  };
  return (
    <div className="admin-home">
      <div className="logo">
        <img src={$logoAdmin} alt="Slika" className="logotip" />
        <h2 className="title-logotip">Ministarstvo unutrašnjih poslova</h2>
      </div>
      <div className="header">
        <h4>Sistem Upravljanja Kriminalističkim Rekordima</h4>
      </div>
      <div className="user-home-buttons">
        <a href="http://localhost:3000/adminhome">
          <button className="user-home">
            <FaHome /> Home{" "}
          </button>
        </a>
        <button onClick={setShowViewCasesModal} className="user-view">
          <FaUser />
          Pogledaj dodjenjene slučajeve
        </button>
      </div>

      <Modal
        className="modalni-ekran"
        show={showViewCasesModal}
        onHide={handleClose}
      >
        <Modal.Header className="modal-gore">
          <Modal.Title className="modal-naslov">Popis slučajeva</Modal.Title>
          <AiOutlineClose onClick={handleClose} className="dugme-x" />
        </Modal.Header>
        <Modal.Body className="modal-tijelo">
          <div>
            <table className="tabela">
              <thead>
                <tr>
                  <th className="naslov">Broj Slučaja</th>
                  <th className="naslov">Krivično djelo</th>
                  <th className="naslov">Vrijeme prijave</th>
                  <th className="naslov">Oficir</th>
                  <th className="naslov">Krimi</th>
                  <th className="naslov">Status istrage</th>
                  <th className="naslov">Akcije</th>
                </tr>
              </thead>
              <tbody className="popis">
                {cases.map((caseData) => (
                  <tr key={caseData.case_id}>
                    <td>{caseData.case_id}</td>
                    <td>{caseData.case_type}</td>
                    <td>{caseData.date_added}</td>
                    <td>{caseData.staffid}</td>
                    <td>{caseData.cid}</td>
                    <td>{caseData.status}</td>
                    <Button variant="details" className="btn-details">
                      Detalji
                    </Button>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default User;
