import React from "react";
import { Col, Row } from "react-bootstrap";
import TextForm from "../../../dashboard/ticketing/elements/text/TextForm";
import DisabledInput from "../../../dashboard/ticketing/elements/input/DisabledInput";

const SingleDisableInput = ({ text1, value1, classNameDiv }) => {
  return (
    <Row className={classNameDiv}>
      <Col xl={12} lg={12} md={12} sm={12} xs={12}>
        <div>
          <TextForm text={text1} />
          <DisabledInput
            type="text"
            placeholder={value1}
            value={value1}
            className={`py-1`}
          />
        </div>
      </Col>
    </Row>
  );
};

export default SingleDisableInput;
