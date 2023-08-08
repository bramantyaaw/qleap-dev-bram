import React from "react";
import { Col, Row } from "react-bootstrap";
import TextForm from "../../../dashboard/ticketing/elements/text/TextForm";
import DisabledInput from "../../../dashboard/ticketing/elements/input/DisabledInput";

const NewTwoDisabledInputs = ({
  text1,
  value1,
  text2,
  value2,
  classNameDiv,
  isBiggerLeft,
}) => {
  return (
    <Row className={classNameDiv}>
      <Col
        xl={isBiggerLeft ? 8 : 4}
        lg={isBiggerLeft ? 8 : 4}
        md={isBiggerLeft ? 8 : 4}
        sm={12}
        xs={12}
      >
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
      <Col
        xl={isBiggerLeft ? 4 : 8}
        lg={isBiggerLeft ? 4 : 8}
        md={isBiggerLeft ? 4 : 8}
        sm={12}
        xs={12}
      >
        <div className="mt-2 mt-md-0">
          <TextForm text={text2} />
          <DisabledInput
            type="text"
            placeholder={value2}
            value={value2}
            className={`py-1`}
          />
        </div>
      </Col>
    </Row>
  );
};

export default NewTwoDisabledInputs;
