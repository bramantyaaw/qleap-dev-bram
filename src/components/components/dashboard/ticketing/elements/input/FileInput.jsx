import React from "react";
import { Form } from "react-bootstrap";

const FileInput = ({ handleChange, disable, accept }) => {
  return (
    <>
      {disable ? (
        <Form.Control
          className="form-control form-photoform-control-lg form-photo input-default"
          type="file"
          id="formFileLg"
          accept="image/png, image/jpg, image/jpeg"
          disabled
        />
      ) : (
        <Form.Control
          className="form-control form-photoform-control-lg form-photo input-default"
          type="file"
          id="formFileLg"
          accept={accept}
          onChange={(e) => handleChange(e)}
        />
      )}
    </>
  );
};

export default FileInput;
