import React, { useEffect, useState, useRef } from "react";
import ReactQuill from "react-quill";
import ReactToPrint from "react-to-print";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { FaHome, FaUser, FaPrint } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Modal, Button, Container } from "react-bootstrap";
import { FaPencilAlt } from "react-icons/fa";
import $logoUser from "../images/mup.png";
import "../styles/InspektorNCO.css";
import Axios from "axios";

function InspektorNCO({ role, changeRole, loginStatus, handleLogin }) {
  const navigate = useNavigate();
  const [cases, setCases] = useState([]);
  const [opis, setOpis] = useState([]);
  const [krivicnoDjeloInput, setKrivicnoDjeloInput] = useState([]);

  const componentRef = useRef();

  useEffect(() => {
    console.log("loginStatus:", loginStatus);
    console.log("role:", role);

    if (!loginStatus) {
      navigate("/");
    } else if (role.role !== "NCO") {
      navigate("/");
    }

    Axios.get("http://localhost:4000/getCases")
      .then((response) => {
        setCases(response.data);
      })
      .catch((error) => {
        console.error("Greška pri dohvaćanju podataka: " + error);
      });

    Axios.get("http://localhost:4000/getCaseDetail")
      .then((response) => {
        setKrivicnoDjeloInput(response.data);
      })
      .catch((error) => {
        console.error("1111 " + error);
      });

    Axios.get("http://localhost:4000/getOpis")
      .then((response) => {
        setOpis(response.data);
      })
      .catch((error) => {
        console.error("BLA " + error);
      });
  }, [loginStatus, role, navigate]);
  const [showViewCasesModal, setShowViewCasesModal] = useState(false);
  const [EditStatementDetalji, setEditStatementDetalji] = useState("");
  const [viewStatementDetalji, setViewStatementDetalji] = useState("");
  const [pogledajstatusIstrage, setStatusIstrage] = useState("");

  const handleClose = () => {
    setShowViewCasesModal(false);
    setEditStatementDetalji(false);
    setViewStatementDetalji(false);
    setStatusIstrage(false);
  };

  const handleShowViewCases = () => {
    setShowViewCasesModal(true);
    setEditStatementDetalji(false);
  };

  const handleEditStatementDetalji = () => {
    setEditStatementDetalji(true);
    setViewStatementDetalji(false);
  };

  const handleViewStatementDetalji = () => {
    setViewStatementDetalji(true);
  };

  const handleStatusIstrage = () => {
    setStatusIstrage(true);
    setEditStatementDetalji(false);
    setViewStatementDetalji(false);
  };

  return (
    <div className="admin-home">
      <div className="logo" ref={componentRef}>
        <img src={$logoUser} alt="Slika" className="logotip" />
        <h2 className="title-logotip">Ministarstvo unutrašnjih poslova</h2>
      </div>
      <div className="header">
        <h4>Sistem Upravljanja Kriminalističkim Rekordima</h4>
      </div>
      <div className="user-home-buttons">
        <a href="http://localhost:3000">
          <button className="dugmad">
            <FaHome /> Home{" "}
          </button>
        </a>

        <button onClick={handleShowViewCases} className="dugmad">
          <FaUser />
          Pogledaj dodjenjene slučajeve
        </button>
      </div>

      {/* View Cases Modal */}
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
              {
                <tbody className="popis">
                  {cases.map((caseData) => (
                    <tr key={caseData.case_id}>
                      <td>{caseData.case_id}</td>
                      <td>{caseData.case_type}</td>
                      <td>{caseData.statement}</td>
                      <td>
                        <Button
                          variant="informacija"
                          className="btn-informacija"
                          onClick={handleEditStatementDetalji}
                        >
                          <FaPencilAlt />
                        </Button>
                        <Button
                          variant="detalji"
                          className="btn-detalji"
                          onClick={handleViewStatementDetalji}
                        >
                          Detalji
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              }
            </table>
          </div>
        </Modal.Body>
      </Modal>

      {/* TREBA SE DODATI DA SE MOZE UREDIVATI */}
      {/* Statement UREDI Modal */}
      <Modal
        show={EditStatementDetalji}
        className="modalno-ekran"
        onHide={handleClose}
      >
        <Modal.Header className="modal-gore">
          <Modal.Title className="modal-naslov">HI</Modal.Title>
          <AiOutlineClose onClick={handleClose} className="dugme-x" />
        </Modal.Header>
        <Container className="detaljiViewContainer">
          <Modal.Header className="detailsViewHeader">
            <Modal.Title className="detailsViewTitle">
              <FaUser className="korisnik-naslov" />
              Detalji HI
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {cases ? (
              <div className="custom-table">
                {cases.map((crimeDjelo) => (
                  <div className="popis" key={crimeDjelo.case_id}>
                    <div className="table-row">
                      <div className="header-cell">Broj Slučaja:</div>
                      <div className="data-cell" readOnly>
                        {crimeDjelo.case_id}{" "}
                      </div>
                    </div>
                    <div className="table-row">
                      <div className="header-cell">Ime i Prezime:</div>
                      <div className="data-cell">{crimeDjelo.comp_name}</div>
                    </div>
                    <div className="table-row">
                      <div className="header-cell">Spol:</div>
                      <div className="data-cell">{crimeDjelo.gender}</div>
                    </div>
                    <div className="table-row">
                      <div className="header-cell">Godine:</div>
                      <div className="data-cell">{crimeDjelo.age}</div>
                    </div>
                    <div className="table-row">
                      <div className="header-cell">Zanimanje:</div>
                      <div className="data-cell">{crimeDjelo.occupation}</div>
                    </div>
                    <div className="table-row">
                      <div className="header-cell">Regija:</div>
                      <div className="data-cell">{crimeDjelo.region}</div>
                    </div>
                    <div className="table-row">
                      <div className="header-cell">Lokacija:</div>
                      <div className="data-cell">{crimeDjelo.loc}</div>
                    </div>
                    <div className="table-row">
                      <div className="header-cell">Status</div>
                      <div className="data-cell">
                        <select className="select-cell form-control">
                          <option>Započeto</option>
                          <option>U toku</option>
                          <option>Završeno</option>
                        </select>
                      </div>
                    </div>
                    <div className="table-row">
                      <div className="header-cell">Napišite izvještaj</div>
                      <div className="quill-cell ">
                        <ReactQuill theme="snow" />
                      </div>
                    </div>
                    <Button className="btn-zaSlanje">Spremi</Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="data-cell">Podaci se učitavaju...</div>
            )}
          </Modal.Body>
        </Container>
      </Modal>

      {/* View Statement DETALJI Modal */}
      <Modal
        show={viewStatementDetalji}
        className="modalno-ekran"
        onHide={handleClose}
      >
        <div>
          {" "}
          <ReactToPrint
            trigger={() => (
              <Button className="ModalDugmad">
                <FaPrint />
              </Button>
            )}
            content={() => componentRef.current}
          />
          <Modal.Header className="modal-gore">
            <ReactToPrint />
            <Modal.Title className="detailsViewNaslov">
              Detalji Slučaja
            </Modal.Title>
            <AiOutlineClose onClick={handleClose} className="dugme-x" />
            <div className="modal-button-container">
              <Button className="ModalDugmad" onClick={handleStatusIstrage}>
                Izvještaj Istrage
              </Button>
            </div>
            <div ref={componentRef} style={{ margin: 10 }}>
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
                      {krivicnoDjeloInput.map((crimeDjelo) => (
                        <div className="popis" key={crimeDjelo.case_id}>
                          <div className="table-row">
                            <div className="header-cell">Broj Slučaja:</div>
                            <div className="data-cell">
                              {crimeDjelo.case_id}
                            </div>
                          </div>
                          <div className="table-row">
                            <div className="header-cell">Ime i Prezime:</div>
                            <div className="data-cell">
                              {crimeDjelo.comp_name}
                            </div>
                          </div>
                          <div className="table-row">
                            <div className="header-cell">Spol:</div>
                            <div className="data-cell">{crimeDjelo.gender}</div>
                          </div>
                          <div className="table-row">
                            <div className="header-cell">Godine:</div>
                            <div className="data-cell">{crimeDjelo.age}</div>
                          </div>
                          <div className="table-row">
                            <div className="header-cell">Zanimanje:</div>
                            <div className="data-cell">
                              {crimeDjelo.occupation}
                            </div>
                          </div>
                          <div className="table-row">
                            <div className="header-cell">Broj Telefona:</div>
                            <div className="data-cell">{crimeDjelo.tel}</div>
                          </div>
                          <div className="table-row">
                            <div className="header-cell">Distrikt:</div>
                            <div className="data-cell">
                              {crimeDjelo.district}
                            </div>
                          </div>
                          <div className="table-row">
                            <div className="header-cell">Regija:</div>
                            <div className="data-cell">{crimeDjelo.region}</div>
                          </div>
                          <div className="table-row">
                            <div className="header-cell">Lokacija:</div>
                            <div className="data-cell">{crimeDjelo.loc}</div>
                          </div>
                          <div className="table-row">
                            <div className="header-cell">Adresa:</div>
                            <div className="data-cell">{crimeDjelo.addrs}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="data-cell">Podaci se učitavaju...</div>
                  )}
                </Modal.Body>
              </Container>
              <div className="tabelaDiv">
                <h2 className="detailsViewTitle"> Detalji slučaja</h2>
                <table className="tabelaOpis">
                  <thead>
                    <tr>
                      <th className="naslov">Krivicno djelo</th>
                      <th className="naslov">Diary of Action</th>
                      <th className="naslov">Vrijeme prijave</th>
                      <th className="naslov">NCO</th>
                      <th className="naslov">CID</th>
                      <th className="naslov">Status</th>
                    </tr>
                  </thead>
                  <tbody className="popisZaOpis">
                    {opis.map((caseData) => (
                      <tr key={caseData.case_id}>
                        <td>{caseData.case_type}</td>
                        <td>{caseData.diaryofaction}</td>
                        <td>{caseData.date_added}</td>
                        <td>{caseData.staffid}</td>
                        <td>{caseData.cid}</td>
                        <td>{caseData.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Modal.Header>
        </div>
      </Modal>

      {/* Izvještaj Istrage Modal */}
      <Modal
        show={pogledajstatusIstrage}
        className="modalno-ekran"
        onHide={handleClose}
      >
        <div>
          {" "}
          <ReactToPrint
            trigger={() => (
              <Button className="ModalDugmad">
                <FaPrint />
              </Button>
            )}
            content={() => componentRef.current}
          />
          <Modal.Header className="modal-gore">
            <ReactToPrint />
            <Modal.Title className="detailsViewNaslov">
              Izvještaj Istrage
            </Modal.Title>
            <AiOutlineClose onClick={handleClose} className="dugme-x" />
            <div ref={componentRef} style={{ margin: 10 }}>
              <Container className="detailsViewContainer">
                <Modal.Header className="detailsViewHeader">
                  <Modal.Title className="detailsViewTitle">
                    <FaUser className="korisnik-naslov" />
                    Detalji o Osumnjičenom
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {krivicnoDjeloInput ? (
                    <div className="custom-table">
                      {krivicnoDjeloInput.map((crimeDjelo) => (
                        <div className="popis" key={crimeDjelo.case_id}>
                          <div className="table-row">
                            <div className="header-cell" readOnly>
                              Broj Slučaja:
                            </div>
                            <div className="data-cell" readOnly>
                              {crimeDjelo.case_id}
                            </div>
                          </div>
                          <div className="table-row">
                            <div className="header-cell" readOnly>
                              Ime i Prezime:
                            </div>
                            <div className="data-cell" readOnly>
                              {crimeDjelo.comp_name}
                            </div>
                          </div>
                          <div className="table-row">
                            <div className="header-cell" readOnly>
                              Spol:
                            </div>
                            <div className="data-cell" readOnly>
                              {crimeDjelo.gender}
                            </div>
                          </div>
                          <div className="table-row">
                            <div className="header-cell" readOnly>
                              Godine:
                            </div>
                            <div className="data-cell" readOnly>
                              {crimeDjelo.age}
                            </div>
                          </div>
                          <div className="table-row">
                            <div className="header-cell" readOnly>
                              Zanimanje:
                            </div>
                            <div className="data-cell" readOnly>
                              {crimeDjelo.occupation}
                            </div>
                          </div>

                          <div className="table-row">
                            <div className="header-cell" readOnly>
                              Regija:
                            </div>
                            <div className="data-cell" readOnly>
                              {crimeDjelo.region}
                            </div>
                          </div>
                          <div className="table-row">
                            <div className="header-cell" readOnly>
                              Lokacija:
                            </div>
                            <div className="data-cell" readOnly>
                              {crimeDjelo.loc}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="data-cell">Podaci se učitavaju...</div>
                  )}
                </Modal.Body>
              </Container>
            </div>
          </Modal.Header>
        </div>
      </Modal>
    </div>
  );
}

export default InspektorNCO;
