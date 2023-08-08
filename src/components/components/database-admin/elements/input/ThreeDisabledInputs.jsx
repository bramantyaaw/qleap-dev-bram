import React from "react";
import IssueDropdown from "../../../dashboard/ticketing/elements/dropdown/IssueDropdown";
import DisabledInput from "../../../dashboard/ticketing/elements/input/DisabledInput";
import TextForm from "../../../dashboard/ticketing/elements/text/TextForm";
import { Col, Row } from "react-bootstrap";

const ThreeDisabledInputs = ({
  text1,
  value1,
  text2,
  value2,
  text3,
  value3,
  isSecNull,
  isThirdNull,
  textDropdown,
  setStateDropdown,
  arrDropdown,
  disabledClassName1,
  className1,
  className2,
  classNameDiv,
}) => {
  return (
    <div className={classNameDiv}>
      <Row>
        <Col xl={4} lg={4} md={4} sm={12} xs={12}>
          <TextForm text={text1} />
          <DisabledInput
            type="text"
            placeholder={value1}
            value={value1}
            className={`py-1 ${disabledClassName1}`}
          />
        </Col>
        {isSecNull ? null : (
          <Col xl={4} lg={4} md={4} sm={12} xs={12} className="mt-2 mt-md-0">
            <TextForm text={text2} />
            <DisabledInput
              type="text"
              placeholder={value2}
              value={value2}
              className="py-1"
            />
          </Col>
        )}
        {isThirdNull ? null : (
          <>
            <Col xl={4} lg={4} md={4} sm={12} xs={12} className="mt-2 mt-md-0">
              <TextForm text={text3} />
              <DisabledInput
                type="text"
                placeholder={value3}
                value={value3}
                className="py-1"
              />
            </Col>
          </>
        )}
        {textDropdown && setStateDropdown && arrDropdown && (
          <>
            <Col xl={4} lg={4} md={4} sm={12} xs={12} className="mt-2 mt-md-0">
              <TextForm text={textDropdown} />
              <IssueDropdown
                setSelected={setStateDropdown}
                data={arrDropdown}
                className="py-1 text-kinda-dark"
              />
            </Col>
          </>
        )}
      </Row>
    </div>
  );
};

export default ThreeDisabledInputs;
