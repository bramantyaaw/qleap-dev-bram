import React from "react";
import { Image, Form } from "react-bootstrap";

const SignatureComp = ({ src, name, position, date, className }) => {
  return (
    <Form.Group className={className}>
      <div className="photo-signature mb-3 d-flex align-items-center justify-content-center">
        <Image src={src} />
      </div>
      <div className="photo-signature d-flex flex-column align-items-center justify-content-center bg-signature">
        <p>{name}</p>
        <p>{position}</p>
        <p>{date}</p>
      </div>
    </Form.Group>
  );
};

export default SignatureComp;
