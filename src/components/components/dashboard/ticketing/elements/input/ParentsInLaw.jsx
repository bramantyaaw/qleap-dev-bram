import React from "react";
import { Form } from "react-bootstrap";
import FillInput from "./FillInput";

const ParentsInLaw = ({ placeholder }) => {
  return (
    <Form.Group className="w-100 mertua-wrapper">
      <Form.Group className="left-side">
        <FillInput
          type="text"
          placeholder="Tuliskan Nama Lengkap (Jika yang bersangkutan telah meninggal, mohon klik checkbox disamping)"
          // setState={setStoreCode}
        />
      </Form.Group>
      <Form.Group className="right-side">
        <Form.Text>Meninggal Dunia</Form.Text>
        <Form.Check type="checkbox" />
      </Form.Group>
    </Form.Group>
  );
};

export default ParentsInLaw;
