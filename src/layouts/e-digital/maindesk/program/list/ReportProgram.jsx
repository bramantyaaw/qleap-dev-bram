import React, { Fragment } from "react";
import { Card, Col, Row } from "react-bootstrap";
import {
  mdiClockTimeEightOutline,
  mdiAccountEyeOutline,
  mdiAccountGroupOutline,
  mdiBookCheckOutline,
} from "@mdi/js";
import StatRightCenterIcon from "../../../../../components/components/dashboard/common/stats/StatRightCenterIcon";
import StatRightBadge from "../../../../../components/common/StatRightBadge";
import StatLeftBGIcon from "../../../../../components/components/dashboard/common/stats/StatLeftBGIcon";
import StatLeftCenterIcon from "../../../../../components/components/dashboard/common/stats/StatLeftCenterIcon";
import { StatLeftInfo } from "../../../../../components/components/dashboard/common/stats/StatLeftInfo";
import GKAccordionActions from "../../../../../components/components/marketing/common/accordions/GKAccordionActions";

export const ReportProgram = (props) => {
  const { program_id, fetchSilabus, silabus } = props;

  return (
    <Fragment>
      <Card className="rounded-top-left-0 rounded-top-end-0 p-4">
        <Row>
          <Col lg={3} md={6} sm={12} className="mb-2">
            <StatLeftBGIcon
              title="Total views this pogram"
              value="2.241"
              iconName={mdiAccountGroupOutline}
              iconColorVariant="primary"
              classValue="h-100"
              classText="fw-bold"
              euniv
            />
          </Col>
          <Col lg={3} md={6} sm={12} className="mb-2">
            <StatLeftBGIcon
              title="The most visited"
              value="Eraspace"
              iconName={mdiAccountEyeOutline}
              iconColorVariant="warning"
              classValue="h-100"
              classText="fw-bold"
              euniv
              info="Based on business unit"
              summary="1.100 visited"
              spanClassName="fs-6 text-muted"
            />
          </Col>
          <Col lg={3} md={6} sm={12} className="mb-2">
            <StatLeftBGIcon
              title="Total completed the program"
              value="1.988"
              iconName={mdiBookCheckOutline}
              iconColorVariant="success"
              classValue="h-100"
              classText="fw-bold"
              euniv
            />
          </Col>
          <Col lg={3} md={6} sm={12} className="mb-2">
            <StatLeftBGIcon
              title="Average Time Access Program"
              value="00:23:34"
              iconName={mdiClockTimeEightOutline}
              iconColorVariant="success"
              classValue="h-100"
              classText="fw-bold"
              euniv
            />
          </Col>
        </Row>
      </Card>
      <Card className="p-4 pt-2 mt-3">
        <Row>
          <div className="bg-light p-4 mt-3">
            <GKAccordionActions
              accordionItem={silabus}
              fetchSilabus={fetchSilabus}
              report
            />
          </div>
        </Row>
      </Card>
    </Fragment>
  );
};
