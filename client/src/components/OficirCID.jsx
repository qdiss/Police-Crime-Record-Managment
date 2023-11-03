import React, { useState, useEffect } from "react";
import $logoUser from "../images/mup.png";
import "../styles/User.css";
import { useNavigate } from "react-router-dom";
import { FaHome, FaUser, FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Button, Modal, Form, Container } from "react-bootstrap";

import Axios from "axios";

function OficirCID({ role, changeRole, loginStatus, handleLogin, username }) {
  const navigate = useNavigate();
  const [cases, setCases] = useState([]);
  const [kriminalniTip, setCrimeType] = useState([]);
  const [krivicnoDjeloInput, setKrivicnoDjeloInput] = useState([]);
  const [randomCaseNumber, setRandomCaseNumber] = useState("");

  useEffect(() => {
    if (loginStatus === false) {
      navigate("/");
    }
    if (role !== "cid") {
      navigate("/");
    }
    // OVO RADI
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
        console.error("Greska je nastala: " + error);
      });

    Axios.get("http://localhost:4000/getCaseDetail")
      .then((response) => {
        setKrivicnoDjeloInput(response.data);
      })
      .catch((error) => {
        console.error("1111 " + error);
      });

    // Generiraj jedinstveni 6-cifreni broj
    const generateUniqueRandomNumber = () => {
      let randomSixDigitNumber;
      do {
        randomSixDigitNumber = Math.floor(
          100000 + Math.random() * 900000
        ).toString();
      } while (localStorage.getItem(randomSixDigitNumber)); // Provjeri je li broj već generiran
      localStorage.setItem(randomSixDigitNumber, true); // Označi broj kao generiran
      return randomSixDigitNumber;
    };

    // Generiraj jedinstveni 6-cifreni broj
    const uniqueRandomNumber = generateUniqueRandomNumber();
    setRandomCaseNumber(uniqueRandomNumber);
  }, [loginStatus, role, navigate]);
  const [showViewCasesModal, setShowViewCasesModal] = useState(false);
  const [showAddCaseModal, setShowAddCaseModal] = useState(false);
  const [detailsAction, setDetailsAction] = useState(false);
  const [detaljiView, setDetaljiViewCaseModala] = useState(false);
  const [selectedCrime, setSelectedCrime] = useState("");

  const handleClose = () => {
    setShowViewCasesModal(false);
    setShowAddCaseModal(false);
    setDetailsAction(false);
    setDetaljiViewCaseModala(false);
  };

  const handleShowViewCases = () => {
    setShowViewCasesModal(true);
    setShowAddCaseModal(false);
    setDetailsAction(false);
  };

  const handleDetaljiViewCaseModala = () => {
    setDetaljiViewCaseModala(true);
    setShowViewCasesModal(false);
  };

  const handleShowAddCase = () => {
    setShowAddCaseModal(true);
  };

  const handleDetailsAction = () => {
    const krivicnoDjelo = document.getElementById("formKrivicnoDjelo").value;
    setSelectedCrime(krivicnoDjelo);
    setDetailsAction(true);
  };

  // Dodavanje u bazu podataka slučaj
  const handleSubmit = (event) => {
    event.preventDefault();

    const imeOsudjenika = document.getElementById("formImeOsudjenika").value;
    const brojTelefona = document.getElementById("formBrojTelefona").value;
    const okupacija = document.getElementById("formOkupacija").value;
    const godine = document.getElementById("formGodine").value;
    const spol = document.getElementById("formSpol").value;
    const adresa = document.getElementById("formAdresa").value;
    const regija = document.getElementById("formRegija").value;
    const distrikt = document.getElementById("formDistrikt").value;
    const lokacija = document.getElementById("formLokacija").value;
    const brojSlucaja = document.getElementById("formBrojSlucaja").value;

    Axios.post("http://localhost:4000/postCases", {
      case_id: brojSlucaja,
      comp_name: imeOsudjenika,
      tel: brojTelefona,
      occupation: okupacija,
      region: regija,
      district: distrikt,
      loc: lokacija,
      addrs: adresa,
      age: godine,
      gender: spol,
    }).then((response) => {
      alert("Uspješno ste dodali novi slučaj!");
    });

    setShowAddCaseModal(false);
    setDetailsAction(false);
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

      {/* VIEW CASES MODAL */}
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
                      <Button
                        variant="detalji"
                        className="btn-detalji"
                        onClick={handleDetaljiViewCaseModala}
                      >
                        Detalji
                      </Button>
                      <Button variant="informacija" className="btn-informacija">
                        <FaPencilAlt />
                      </Button>
                      <Button variant="obrisi" className="btn-obrisi">
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={detaljiView} className="modalni-ekran" onHide={handleClose}>
        <Modal.Header className="modal-gore">
          <Modal.Title className="detailsViewNaslov">
            Detalji Slučaja
          </Modal.Title>
          <AiOutlineClose onClick={handleClose} className="dugme-x" />
          <div className="modal-button-container">
            <Button className="ModalDugmad">Print</Button>
            <Button className="ModalDugmad">Status istrage</Button>
            <Button className="ModalDugmad">Dodijeli Slučaj Drugom</Button>
          </div>

          <Container className="detailsViewContainer">
            <Modal.Header className="detailsViewHeader">
              <Modal.Title className="detailsViewTitle">
                <FaUser className="korisnik-naslov" />
                Detalji Osumnjičenog
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {krivicnoDjeloInput ? (
                <div className="custom-table">
                  {krivicnoDjeloInput.map((caseData) => (
                    <div className="popis" key={caseData.case_id}>
                      <div className="table-row">
                        <div className="header-cell">Broj Slučaja:</div>
                        <div className="data-cell">{caseData.case_id}</div>
                      </div>
                      <div className="table-row">
                        <div className="header-cell">Ime i Prezime:</div>
                        <div className="data-cell">{caseData.comp_name}</div>
                      </div>
                      <div className="table-row">
                        <div className="header-cell">Spol:</div>
                        <div className="data-cell">{caseData.gender}</div>
                      </div>
                      <div className="table-row">
                        <div className="header-cell">Godine:</div>
                        <div className="data-cell">{caseData.age}</div>
                      </div>
                      <div className="table-row">
                        <div className="header-cell">Zanimanje:</div>
                        <div className="data-cell">{caseData.occupation}</div>
                      </div>
                      <div className="table-row">
                        <div className="header-cell">Broj Telefona:</div>
                        <div className="data-cell">{caseData.tel}</div>
                      </div>
                      <div className="table-row">
                        <div className="header-cell">Distrikt:</div>
                        <div className="data-cell">{caseData.district}</div>
                      </div>
                      <div className="table-row">
                        <div className="header-cell">Regija:</div>
                        <div className="data-cell">{caseData.region}</div>
                      </div>
                      <div className="table-row">
                        <div className="header-cell">Lokacija:</div>
                        <div className="data-cell">{caseData.loc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="data-cell">Podaci se učitavaju...</div>
              )}
            </Modal.Body>
          </Container>
        </Modal.Header>
      </Modal>

      {/* Zavrseno ADD MODAL*/}
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
          <Form
            className="forma-osudjenik flex-container"
            onSubmit={handleSubmit}
          >
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
                <Form.Label>Zanimanje</Form.Label>
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
                  <option>Federacija BiH</option>
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
                  {kriminalniTip.map((kriminalData, index) => (
                    <option key={index}>{kriminalData.des}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </div>
          </Form>
        </Modal.Body>
        <Button
          variant="primary"
          className="btn-salji"
          onClick={handleDetailsAction}
        >
          Nastavi
        </Button>
      </Modal>

      {/* Zavrseno Detalji ADD MODALA */}
      <Modal show={detailsAction} onHide={handleClose} className="glavni-modal">
        <Modal.Header className="modal-zaglavlje">
          <Modal.Title className="modalni-naslov">Detalji Akcije</Modal.Title>
          <AiOutlineClose onClick={handleClose} className="dugme-x" />
        </Modal.Header>
        <Modal.Body className="modalno-tijelo">
          <Form
            className="forma-osudjenik flex-container"
            onSubmit={handleSubmit}
          >
            <div className="form-row">
              <Form.Group controlId="formBrojSlucaja" className="form-col">
                <Form.Label>Broj Slučaja</Form.Label>
                <Form.Control value={randomCaseNumber} readOnly />{" "}
              </Form.Group>

              <Form.Group controlId="formKrivicnoDjelo" className="form-col">
                <Form.Label>Krivično Djelo</Form.Label>
                <Form.Control value={selectedCrime} readOnly />{" "}
              </Form.Group>
            </div>
            <div className="form-row">
              <Form.Group controlId="formDiaryOfAction">
                <Form.Label>Diary of Action</Form.Label>
                <Form.Control as="textarea" />
              </Form.Group>
              <Button className="btn-posalji" onClick={handleSubmit}>
                Spremi
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
export default OficirCID;
