import { Fragment, useState } from "react";
import { Col, Row } from "react-bootstrap";
import {
  mdiListBoxOutline,
  mdiAccountRemove,
  mdiAirplane,
  mdiAccountSwitch,
} from "@mdi/js";
import StatRightBGIcon from "../../../components/components/dashboard/common/stats/StatRightBGIcon";
import { Link } from "react-router-dom";
export const CreateSubmission = () => {
  const [showAll, setShowAll] = useState(false);

  const items = [
    {
      value: "EPCN",
      summary: "Electronic Personal Change Notification",
      iconName: mdiAccountSwitch,
      iconColorVariant: "primary",
      classValue: "mb-4",
      linkName: "/submission/create-epcn",
    },
    {
      value: "Offboarding",
      summary: "Employee Resignation Function",
      iconName: mdiAccountRemove,
      iconColorVariant: "primary",
      classValue: "mb-4",
      linkName: "/maintenance-mode/",
    },
    {
      value: "Reward trip",
      summary: "A trip for Employee Achievement ",
      iconName: mdiAirplane,
      iconColorVariant: "primary",
      classValue: "mb-4",
      linkName: "/maintenance-mode/",
    },
    {
      value: "Allowance",
      summary: "Cash Advance for subordinate",
      iconName: mdiListBoxOutline,
      iconColorVariant: "primary",
      classValue: "mb-4",
      linkName: "/maintenance-mode/",
    },
  ];

  const numToShow = showAll ? items.length : 4;

  return (
    <Fragment>
      {/* <h4 className="mb-0 h4 pb-3 fw-bold">Submission</h4> */}
      <Row className="d-flex justify-content-between">
        {items.slice(0, numToShow).map((item, index) => (
          <Col key={index} xl={3} lg={6} md={6} sm={12} className="mb-4">
            <StatRightBGIcon {...item} />
          </Col>
        ))}
      </Row>
      {/* {!showAll ? (
        <div className="text-end mt-0 mb-4">
          <Link
            className="fst-italic text-decoration-underline"
            onClick={() => setShowAll(true)}
          >
            Show More Submission
          </Link>
        </div>
      ) : (
        <div className="text-end mt-0 mb-4">
          <Link
            className="fst-italic text-decoration-underline"
            onClick={() => setShowAll(false)}
          >
            Show Less Submission
          </Link>
        </div>
      )} */}
    </Fragment>
  );
};
