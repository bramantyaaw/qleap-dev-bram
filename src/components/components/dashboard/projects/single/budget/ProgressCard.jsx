// import node module libraries
import { Row, Col, Card, ProgressBar, Button } from "react-bootstrap";

// import custom components
import StatRightCenterIcon from "../../../common/stats/StatRightCenterIcon";
import {
  mdiLightbulbOn,
  mdiAccountGroup,
  mdiAccountMultiplePlus,
  mdiSpeedometer,
  mdiMonitorCellphone,
  mdiTallyMark5,
} from "@mdi/js";
import { Link } from "react-router-dom";
const ProgressCard = ({ data }) => {
  return (
    <Row>
      <Col md={12} className="mb-4">
        <Card>
          <Row>
            <Col md={12}>
              <div className="border-bottom p-4">
                <div className="d-flex justify-content-between mb-3">
                  <div>
                    <h4 className="card-title fw-bold ">
                      Learning Final Score
                    </h4>
                    <span>
                      Here is your Final Score Learning based on E University
                    </span>
                  </div>
                  {/* <Link
                    to="#"
                    className="btn btn-xs btn-outline-primary pt-2 mt-3"
                  >
                    View Detail
                  </Link> */}
                </div>
                <ProgressBar style={{ height: "8px" }}>
                  <ProgressBar
                    now={data?.avg_assignment ? data?.avg_assignment : 0}
                    // style={{ width: "15%" }}
                  />
                  <ProgressBar
                    variant="success"
                    now={data?.avg_module ? data?.avg_module : 0}
                    // style={{ width: "18%" }}
                  />
                  <ProgressBar
                    variant="danger"
                    now={data?.avg_supplementary ? data?.avg_supplementary : 0}
                    // style={{ width: "10%" }}
                  />
                  <ProgressBar
                    variant="warning"
                    now={0}
                    // style={{ width: "16%" }}
                  />
                </ProgressBar>
              </div>
            </Col>
            <Row className="ps-4">
              <Col lg={4} md={4} sm={12} className="border-bottom">
                <StatRightCenterIcon
                  title={data?.avg_assignment ? data?.avg_assignment : "-"}
                  value="Avg Assignment"
                  iconName={mdiLightbulbOn}
                  iconColorVariant="primary"
                  classValue="mt-3 mb-2 ps-2"
                />
              </Col>
              <Col lg={4} md={4} sm={12} className="border-start border-bottom">
                <StatRightCenterIcon
                  title={data?.avg_module ? data?.avg_module : "-"}
                  value="Avg Module"
                  iconName={mdiAccountGroup}
                  iconColorVariant="success"
                  classValue="mt-3 mb-2 ps-2"
                />
              </Col>
              <Col lg={4} md={4} sm={12} className="border-start border-bottom">
                <StatRightCenterIcon
                  title={
                    data?.avg_supplementary ? data?.avg_supplementary : "-"
                  }
                  value="Avg Suplementary"
                  iconName={mdiAccountMultiplePlus}
                  iconColorVariant="danger"
                  classValue="mt-3 mb-2 ps-2"
                />
              </Col>
              <Col lg={4} md={4} sm={12}>
                <StatRightCenterIcon
                  title={data?.final_score ? data?.final_score : "-"}
                  value="Final Score Learning Journey"
                  iconName={mdiSpeedometer}
                  iconColorVariant="warning"
                  classValue="mt-3 mb-2 ps-2"
                />
              </Col>
              <Col lg={4} md={4} sm={12} className="border-start">
                <StatRightCenterIcon
                  title="-"
                  value="Digital"
                  iconName={mdiMonitorCellphone}
                  iconColorVariant="info"
                  classValue="mt-3 mb-2 ps-2"
                />
              </Col>
              <Col lg={4} md={4} sm={12} className="border-start">
                <StatRightCenterIcon
                  title="-"
                  value="Total Score"
                  iconName={mdiTallyMark5}
                  iconColorVariant="secondary"
                  classValue="mt-3 mb-2 ps-2"
                />
              </Col>
            </Row>
            {/* <Col md={12}>
              <div className="border-bottom">
                <div className="d-flex justify-content-between">
                  <Col lg={4} md={4} xs={6}>
                    <StatRightCenterIcon
                      title="90/90"
                      value="Innovation"
                      iconName={mdiLightbulbOn}
                      iconColorVariant="primary"
                      classValue="px-4 py-2"
                    />
                  </Col>
                  <Col lg={4} md={4} xs={6} className="border-start">
                    <StatRightCenterIcon
                      title="90/90"
                      value="Leadership"
                      iconName={mdiAccountGroup}
                      iconColorVariant="success"
                      classValue="px-4 py-2"
                    />
                  </Col>
                  <Col lg={4} md={4} xs={6} className="border-start">
                    <StatRightCenterIcon
                      title="90/90"
                      value="Excellent Customer Service"
                      iconName={mdiAccountMultiplePlus}
                      iconColorVariant="danger"
                      classValue="px-4 py-2"
                    />
                  </Col>
                </div>
              </div>
            </Col>
            <Col md={12}>
              <div className="border-bottom ">
                <div className="d-flex justify-content-between">
                  <Col lg={4} md={4} xs={6}>
                    <StatRightCenterIcon
                      title="70/90"
                      value="Agility"
                      iconName={mdiSpeedometer}
                      iconColorVariant="warning"
                      classValue="px-4 py-2"
                    />
                  </Col>
                  <Col lg={4} md={4} xs={6} className="border-start">
                    <StatRightCenterIcon
                      title="90/90"
                      value="Digital"
                      iconName={mdiMonitorCellphone}
                      iconColorVariant="info"
                      classValue="px-4 py-2"
                    />
                  </Col>
                  <Col lg={4} md={4} xs={6} className="border-start">
                    <StatRightCenterIcon
                      title="430/450"
                      value="Total Score"
                      iconName={mdiTallyMark5}
                      iconColorVariant="secondary"
                      classValue="px-4 py-2"
                    />
                  </Col>
                </div>
              </div>
            </Col> */}
          </Row>
        </Card>
      </Col>
    </Row>
  );
};
export default ProgressCard;
