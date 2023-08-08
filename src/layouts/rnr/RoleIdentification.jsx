import React from "react";
import { Col, Row } from "react-bootstrap";
import DisabledInput from "../../components/components/dashboard/ticketing/elements/input/DisabledInput";
import TextForm from "../../components/components/dashboard/ticketing/elements/text/TextForm";

const RoleIdentification = () => {
  const arr = [
    {
      title: "Role Title",
      value: "HC System Design Supervisor",
    },
    {
      title: "Manager Accountable for Output of this Role",
      value: "HRIS & System Development Lead",
    },
    {
      title: "Manager One-Up",
      value: "Workforce & Analytic Manager",
    },
    {
      title: "Group Directorate",
      value: "",
    },
    {
      title: "Directorate",
      value: "",
    },
    {
      title: "Division",
      value: "",
    },
    {
      title: "Date / Version",
      value: "",
    },
  ];
  return (
    <div>
      <Row>
        {arr?.map((data, id) => {
          return (
            <Col xl={6} lg={6} md={6} sm={6} xs={6} key={id}>
              <div className={`d-flex flex-column ${id + 1 > 2 && "mt-3"} `}>
                <TextForm text={data?.title} />
                <DisabledInput
                  type="text"
                  placeholder={data?.value}
                  value={data?.value}
                  withOutClassName
                />
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default RoleIdentification;
