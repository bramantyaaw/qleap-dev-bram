import React from "react";
import { Form, Button } from "react-bootstrap";
import TextForm from "../text/TextForm";
import DisabledInput from "./DisabledInput";

const ViewFileClick = ({ text, setShow, placeholder, value, className }) => {
  return (
    <>
      <TextForm text={text} />
      <Form.Group className="d-flex preview-file-btn preview-file-btn-custom ">
        <Button onClick={() => setShow(true)} className="input-default">
          Lihat File
        </Button>
        <DisabledInput type="text" placeholder={placeholder} value={value} />
      </Form.Group>
    </>
  );
};

export default ViewFileClick;
