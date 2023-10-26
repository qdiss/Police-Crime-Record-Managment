import React, { useState, useEffect } from "react";
import $logoAdmin from "../images/mup.png";
import "../styles/Admin.css";
import { useNavigate } from "react-router-dom";
import { FaHome, FaPlus, FaTrash, FaPencilAlt } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Button, Modal, Form, Table } from "react-bootstrap";
import Axios from "axios";

function AdminHome({ role, changeRole, loginStatus, handleLogin, username }) {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState([]);
  const [modalTitle, setModalTitle] = useState("Dodaj osoblje");
  const [formData, setFormData] = useState({
    ime: "",
    prezime: "",
    status: "CID",
  });

  const [staff, setStaff] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [showEditStaffModal, setShowEditStaffModal] = useState(false);
  const [cases, setCases] = useState([]);

  useEffect(() => {
    if (!loginStatus) {
      navigate("/");
    }
    if (role !== "admin") {
      navigate("/userhome");
    }

    fetch("http://localhost:4000/getLoginInfo")
      .then((response) => response.json())
      .then((data) => {
        setLoginInfo(data);
      })
      .catch((error) => {
        console.error("Error fetching login info: " + error);
      });

    Axios.get("http://localhost:4000/getStaffData")
      .then((response) => {
        setStaff(response.data);
      })
      .catch((error) => {
        console.error("Error fetching staff data: " + error);
      });

    Axios.get("http://localhost:4000/getCases")
      .then((response) => {
        setCases(response.data);
      })
      .catch((error) => {
        console.error("Greška pri dohvaćanju podataka: " + error);
      });
  }, [loginStatus, role, navigate]);

  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [showViewStaffModal, setShowViewStaffModal] = useState(false);
  const [showViewCasesModal, setShowViewCasesModal] = useState(false);

  const handleClose = () => {
    setShowAddStaffModal(false);
    setShowViewStaffModal(false);
    setShowViewCasesModal(false);
    setShowEditStaffModal(false);
    setModalTitle("Dodaj osoblje");
  };

  const handleShowAddStaff = () => setShowAddStaffModal(true);
  const handleShowViewStaff = () => {
    setShowViewStaffModal(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleShowViewCases = () => {
    setShowViewCasesModal(true);
  };

  const handleShowEdit = (staff) => {
    setFormData({
      ime: staff.ime,
      prezime: staff.prezime,
      status: staff.status,
    });
    setSelectedStaff(staff);
    setShowViewStaffModal(false);
    setShowEditStaffModal(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

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

  const handleDelete = (staffId) => {
    Axios.delete(`http://localhost:4000/deleteStaff/${staffId}`)
      .then((response) => {
        console.log(response.data.message);
        Axios.get("http://localhost:4000/getStaffData")
          .then((response) => {
            setStaff(response.data);
          })
          .catch((error) => {
            console.error("Error fetching staff data: " + error);
          });
      })
      .catch((error) => {
        console.error("Error deleting staff: " + error);
      });
    alert("User deleted");
  };

  const handleEdit = async (event) => {
    event.preventDefault();

    try {
      const response = await Axios.put(
        `http://localhost:4000/updateStaff/${selectedStaff.id}`,
        formData
      );
      if (response.status === 200) {
        Axios.get("http://localhost:4000/getStaffData")
          .then((response) => {
            setStaff(response.data);
          })
          .catch((error) => {
            console.error("Error fetching staff data: " + error);
          });

        handleClose();
      }
    } catch (error) {
      console.error("Greška pri slanju zahtjeva:", error);
    }
    alert("User updated");
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
              <Form.Label>Staff ID</Form.Label>
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

      <Modal
        show={showViewStaffModal}
        onHide={handleClose}
        className="primarni-modal"
      >
        <Modal.Header>
          <Modal.Title>{modalTitle}</Modal.Title>
          <AiOutlineClose onClick={handleClose} className="dugme-x" />
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="naslov">ID</th>
                <th className="naslov">Ime</th>
                <th className="naslov">Prezime</th>
                <th className="naslov">Status</th>
                <th className="naslov">Akcije</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((staffItem) => (
                <tr key={staffItem.id}>
                  <td>{staffItem.id}</td>
                  <td>{staffItem.ime}</td>
                  <td>{staffItem.prezime}</td>
                  <td>{staffItem.status}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(staffItem.id)}
                      className="btn-delete"
                    >
                      <FaTrash />
                    </Button>
                    <Button
                      variant="info"
                      onClick={() => handleShowEdit(staffItem)}
                    >
                      <FaPencilAlt />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>

      <Modal
        show={showEditStaffModal}
        onHide={handleClose}
        className="primarni-modal"
      >
        <Modal.Header>
          <Modal.Title>Uredi osoblje</Modal.Title>
          <AiOutlineClose onClick={handleClose} className="dugme-x" />
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEdit}>
            <Form.Group controlId="editFirstName">
              <Form.Label>Ime</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesite ime"
                name="ime"
                value={formData.ime}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="editLastName">
              <Form.Label>Prezime</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesite prezime"
                name="prezime"
                value={formData.prezime}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="editStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                className="opcije-kontrola"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="CID">Krimi</option>
                <option value="NCO">Oficir</option>
                <option value="Admin">Admin</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleEdit}>
            Spremi
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showViewCasesModal}
        onHide={handleClose}
        className="osoblje-modal"
      >
        <Modal.Header>
          <Modal.Title>Popis slučajeva</Modal.Title>
          <AiOutlineClose onClick={handleClose} className="dugme-x" />
        </Modal.Header>
        <Modal.Body>
          <div>
            <table>
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
                    <td>
                      <Button variant="details" className="btn-details">
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
    </div>
  );
}

export default AdminHome;
