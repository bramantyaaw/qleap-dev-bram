import React from "react";
import { Col } from "react-bootstrap";
const TicketHero = ({ title, desc, classText, classTitle }) => {
  return (
    <div className={`py-5 py-lg-6 ${classText}`}>
      <div className="fragment-header">
        <Col lg={{ span: 10, offset: 1 }}>
          <div className="d-lg-flex align-items-center justify-content-between">
            <div className="mb-4 mb-lg-0">
              <h1 className={`text-white fw-bold mb-3 `}>{title}</h1>
              <p className="mb-0 text-white font-weight-normal">{desc}</p>
            </div>
          </div>
        </Col>
      </div>
    </div>
  );
};

export default TicketHero;
