import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaUser } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Modal } from "react-bootstrap";
/* import { FaPencilAlt } from "react-icons/fa";
 */ import $logoUser from "../images/mup.png";
import "../styles/InspektorNCO.css";
/* import Axios from "axios";
 */
function InspektorNCO({ role, changeRole, loginStatus, handleLogin }) {
  const navigate = useNavigate();
  /*   const [cases, setCases] = useState([]);
   */
  useEffect(() => {
    console.log("loginStatus:", loginStatus);
    console.log("role:", role);

    if (!loginStatus) {
      navigate("/");
    } else if (role.role !== "NCO") {
      navigate("/");
    }
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
              {/* <tbody className="popis">
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
              </tbody> */}
            </table>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default InspektorNCO;
