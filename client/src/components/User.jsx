import React, { useState, useEffect } from "react";
import $logoUser from "../images/mup.png";
import "../styles/User.css";
import { useNavigate } from "react-router-dom";
import { FaHome, FaUser, FaPencilAlt, FaPlus } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Button, Modal, Form } from "react-bootstrap";
import Axios from "axios";

function User({ role, changeRole, loginStatus, handleLogin }) {
  const navigate = useNavigate();
  const [cases, setCases] = useState([]);
  const [kriminalniTip, setCrimeType] = useState([]);

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

    Axios.get("http://localhost:4000/getCrimeType")
      .then((response) => {
        setCrimeType(response.data);
      })
      .catch((error) => {
        console.error("Karina: " + error);
      });
  }, [loginStatus, role, navigate]);
  const [showViewCasesModal, setShowViewCasesModal] = useState(false);
  const [showAddCaseModal, setShowAddCaseModal] = useState(false);

  const handleClose = () => {
    setShowViewCasesModal(false);
    setShowAddCaseModal(false);
  };

  const handleShowViewCases = () => {
    setShowViewCasesModal(true);
  };

  const handleShowAddCase = () => {
    setShowAddCaseModal(true);
  };

  return (
    <div className="admin-home">
      <div className="logo">
        <img src={$logoUser} alt="Slika" className="logotip" />
        <h2 className="title-logotip">Ministarstvo unutrašnjih poslova</h2>
      </div>

      <div className="header">
        <h4>Sistem Upravljanja Kriminalističkim Rekordima</h4>
      </div>

      <div className="user-home-buttons">
        <a href="http://localhost:3000/adminhome">
          <button className="dugmad">
            <FaHome /> Home{" "}
          </button>
        </a>
        <button onClick={handleShowAddCase} className="dugmad">
          <FaPlus />
          Dodaj novi slučaj
        </button>
        <button onClick={handleShowViewCases} className="dugmad">
          <FaUser />
          Pogledaj dodjenjene slučajeve
        </button>
      </div>

      <Modal
        show={showViewCasesModal}
        className="modalni-ekran"
        onHide={handleClose}
      >
        <Modal.Header className="modal-gore">
          <Modal.Title className="modal-naslov">
            Dodjeljeni Slucajevi
          </Modal.Title>
          <AiOutlineClose onClick={handleClose} className="dugme-x" />
        </Modal.Header>
        <Modal.Body className="modal-tijelo">
          <div>
            <table className="tabela">
              <thead>
                <tr>
                  <th className="naslov">Broj Slučaja</th>
                  <th className="naslov">Krivično djelo</th>
                  <th className="naslov">Izjava</th>
                  <th className="naslov">Akcije</th>
                </tr>
              </thead>
              <tbody className="popis">
                {cases.map((caseData) => (
                  <tr key={caseData.case_id}>
                    <td>{caseData.case_id}</td>
                    <td>{caseData.case_type}</td>
                    <td>{caseData.statement}</td>
                    <td>
                      <Button variant="informacija" className="btn-informacija">
                        <FaPencilAlt />
                      </Button>
                      <Button variant="detalji" className="btn-detalji">
                        Detalji
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Modal.Body>
      </Modal>

      {/* Treba dodati slanje podataka */}
      <Modal
        show={showAddCaseModal}
        onHide={handleClose}
        className="glavni-modal"
      >
        <Modal.Header className="modal-zaglavlje">
          <Modal.Title className="modalni-naslov">
            Dodaj novi slucaj
          </Modal.Title>
          <AiOutlineClose onClick={handleClose} className="dugme-x" />
        </Modal.Header>
        <Modal.Body className="modalno-tijelo">
          <Form className="forma-osudjenik flex-container">
            <div className="form-row">
              <Form.Group controlId="formImeOsudjenika" className="form-col">
                <Form.Label>Ime i Prezime Osudjenika</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Unesite ime i prezime osudjenika"
                />
              </Form.Group>

              <Form.Group controlId="formBrojTelefona" className="form-col">
                <Form.Label>Broj Telefona</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Unesite broj telefona osudjenika"
                />
              </Form.Group>
            </div>

            <div className="form-row">
              <Form.Group controlId="formOkupacija" className="form-col">
                <Form.Label>Okupacija</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Unesite okupaciju osudjenika"
                />
              </Form.Group>

              <Form.Group controlId="formGodine" className="form-col">
                <Form.Label>Godine</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Unesite godine osudjenika"
                />
              </Form.Group>
            </div>

            <div className="form-row">
              <Form.Group controlId="formSpol" className="form-col">
                <Form.Label>Spol</Form.Label>
                <Form.Control as="select" className="selekcija">
                  <option>Muško</option>
                  <option>Žensko</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formAdresa" className="form-col">
                <Form.Label>Adresa</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Unesite adresu osudjenika"
                />
              </Form.Group>
            </div>

            <div className="form-row">
              <Form.Group controlId="formRegija" className="form-col">
                <Form.Label>Regija</Form.Label>
                <Form.Control as="select" className="selekcija">
                  <option>Unsko-sanski kanton</option>
                  <option>Posavski kanton</option>
                  <option>Tuzlanski kanton</option>
                  <option>Zeničko-dobojski kanton</option>
                  <option>Bosansko-podrinjski kanton</option>
                  <option>Srednjobosanski kanton</option>
                  <option>Hercegovačko-neretvanski kanton</option>
                  <option>Zapadnohercegovački kanton</option>
                  <option>Kanton Sarajevo</option>
                  <option>Kanton 10</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formDistrikt" className="form-col">
                <Form.Label>Distrikt</Form.Label>
                <Form.Control as="select" className="selekcija">
                  <option>Federacija Bih</option>
                  <option>Republika Srpska</option>
                  <option>Brčko Distrikt</option>
                </Form.Control>
              </Form.Group>
            </div>
            <div className="form-row">
              <Form.Group controlId="formLokacija" className="form-col">
                <Form.Label>Lokacija</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Unesite lokaciju osudjenika"
                />
              </Form.Group>
              <Form.Group controlId="formKrivicnoDjelo" className="form-col">
                <Form.Label>Krivično Djelo</Form.Label>
                <Form.Control as="select" className="selekcija">
                  {kriminalniTip.map((kriminalData) => (
                    <option>{kriminalData.des}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </div>
          </Form>
        </Modal.Body>
        <Button variant="primary" className="btn-salji">
          Pošalji
        </Button>
      </Modal>
    </div>
  );
}

export default User;
