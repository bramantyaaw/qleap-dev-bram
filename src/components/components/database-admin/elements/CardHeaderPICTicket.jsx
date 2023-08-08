import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Form } from "react-bootstrap";
import ButtonBadgePIC from "../../../../layouts/database-admin/ticket/elements/ButtonBadgePIC";
import ModalPICTicket from "./ModalPICTicket";

const CardHeaderPICTicket = ({
  title,
}) => {

  return (
      <Card.Header className="border-bottom px-4 py-3 d-flex flex-column flex-lg-row justify-content-between align-items-center w-100">
        <p className="mb-0 fw-bold text-gray-900">{title}</p>
      </Card.Header>
  );
};

export default CardHeaderPICTicket;
