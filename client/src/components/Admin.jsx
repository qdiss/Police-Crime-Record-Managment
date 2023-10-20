import React, { useState, useEffect } from "react";
import $logoAdmin from "../images/mup.png";
import "../styles/Admin.css";
import { useNavigate } from "react-router-dom";
import { FaHome, FaPlus } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Button, Modal, Form } from "react-bootstrap";

function AdminHome({ role, changeRole, loginStatus, handleLogin, username }) {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState([]);
  const [modalTitle, setModalTitle] = useState("Dodaj osoblje");
  const [formData, setFormData] = useState({
    ime: "",
    prezime: "",
    staffid: "",
    username: "",
    lozinka: "",
    status: "CID",
  });

  useEffect(() => {
    if (!loginStatus) {
      navigate("/");
    }
    if (role !== "admin") {
      navigate("/userhome");
    }

    // Fetch login info when the component mounts
    fetch("http://localhost:4000/getLoginInfo")
      .then((response) => response.json())
      .then((data) => {
        setLoginInfo(data);
      })
      .catch((error) => {
        console.error("Error fetching login info: " + error);
      });
  }, [loginStatus, role, navigate]);

  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [showViewStaffModal, setShowViewStaffModal] = useState(false);
  const [showViewCasesModal, setShowViewCasesModal] = useState(false);

  const handleClose = () => {
    setShowAddStaffModal(false);
    setShowViewStaffModal(false);
    setShowViewCasesModal(false);
    setModalTitle("Dodaj osoblje");
  };

  const handleShowAddStaff = () => setShowAddStaffModal(true);
  const handleShowViewStaff = () => setShowViewStaffModal(true);
  const handleShowViewCases = () => setShowViewCasesModal(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Slanje POST zahtjeva s formData objektom kao tijelom
    try {
      const response = await fetch("http://localhost:4000/addUserAdmin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.status === 200) {
        setModalTitle("Osoba uspješno dodana");
      }
    } catch (error) {
      console.error("Greška pri slanju zahtjeva:", error);
    }
  };

  return (
    <div className="admin-home">
      <div className="logo">
        <img src={$logoAdmin} alt="Slika" className="logotip" />
        <h2 className="title-logotip">Ministarstvo unutrašnjih poslova</h2>
      </div>

      <div className="header">
        <h4>Sistem Upravljanja Kriminalističkim Rekordima</h4>
        <div className="login-info">
          {loginInfo.map((info, index) => (
            <div key={index}>
              <h4>Broj Značke: {info.username}</h4>
              <h4>Status: {info.status}</h4>
            </div>
          ))}
        </div>
      </div>

      <div className="admin-home-buttons">
        <a href="http://localhost:3000/adminhome">
          <button>
            <FaHome /> Home{" "}
          </button>
        </a>
        <button onClick={handleShowAddStaff}>
          <FaPlus />
          Add Staff
        </button>
        <button onClick={handleShowViewStaff}>
          <FaPlus />
          View Staff
        </button>
        <button onClick={handleShowViewCases}>
          <FaPlus />
          View Cases
        </button>
      </div>

      <Modal show={showAddStaffModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{modalTitle}</Modal.Title>
          <AiOutlineClose onClick={handleClose} className="dugme-x" />
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFirstName">
              <Form.Label>Ime</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesite ime"
                name="ime"
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formLastName">
              <Form.Label>Prezime</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesite prezime"
                name="prezime"
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formStaffNumber">
              <Form.Label>ID Osobe</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesite broj osoblja"
                name="staffid"
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formUsername">
              <Form.Label>Broj Znacke: </Form.Label>
              <Form.Control
                type="number"
                placeholder="Unesite broj osoblja"
                name="username"
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Lozinka</Form.Label>
              <Form.Control
                type="password"
                placeholder="Unesite lozinku"
                name="password"
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                className="opcije-kontrola"
                name="status"
                onChange={handleInputChange}
                value={formData.status}
              >
                <option value="CID">KRD</option>
                <option value="NCO">OFI</option>
                <option value="Admin">Admin</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Pošalji
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showViewStaffModal} onHide={handleClose}></Modal>

      <Modal show={showViewCasesModal} onHide={handleClose}></Modal>
    </div>
  );
}

export default AdminHome;
