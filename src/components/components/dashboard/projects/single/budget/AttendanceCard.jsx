// import node module libraries
import { Row, Col, Card, Button } from "react-bootstrap";
import {
  mdiClockMinus,
  mdiClockAlert,
  mdiClockCheck,
  mdiClockPlus,
} from "@mdi/js";
// import custom components
import StatRightCenterIcon from "../../../common/stats/StatRightCenterIcon";
import { Link } from "react-router-dom";
import {
  getMonthValue,
  getTimeValue,
} from "../../../../../../config/helper/utils";

const AttendanceCard = ({ absen, data, month, year }) => {
  const filteredData = data?.filter((item) => item.valid === true);
  const lastItem = filteredData?.slice(-1)[0];

  return (
    <Row>
      <Col md={12} className="mb-4">
        <Card className="d-flex justify-content-between">
          {month !== "" && year !== "" ? (
            <Row>
              <Col md={12}>
                <div className="border-bottom p-4">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4 className="mb-0 card-title fw-bold ">Attendance</h4>
                      <span>
                        Here is your attendance based on {getMonthValue(month)}{" "}
                      </span>
                    </div>
                    <Link
                      to="/self-service/attendance"
                      className="btn btn-xs btn-outline-primary mt-3"
                    >
                      View Detail
                    </Link>
                  </div>
                </div>
              </Col>
              <Row className="ps-4 pe-0">
                <Col lg={3} md={12} xs={12}>
                  <StatRightCenterIcon
                    title={getTimeValue(lastItem?.time_start)}
                    value="Last day Clock In"
                    iconName={mdiClockPlus}
                    iconColorVariant="primary"
                    classValue="mt-3 mb-2 ps-2"
                  />
                </Col>
                <Col lg={3} md={12} xs={12} className="border-start">
                  <StatRightCenterIcon
                    title={getTimeValue(lastItem?.time_end)}
                    value="Last day Clock Out"
                    iconName={mdiClockMinus}
                    iconColorVariant="success"
                    classValue="mt-3 mb-2 ps-2"
                  />
                </Col>
                <Col lg={3} md={12} xs={12} className="border-start">
                  <StatRightCenterIcon
                    title={absen?.total_attend}
                    value="Total attendance"
                    iconName={mdiClockCheck}
                    iconColorVariant="warning"
                    classValue="mt-3 mb-2 ps-2"
                  />
                </Col>
                <Col lg={3} md={12} xs={12} className="border-start">
                  <StatRightCenterIcon
                    title={absen?.total_absent}
                    value="Absent/Leave"
                    iconName={mdiClockAlert}
                    iconColorVariant="info"
                    classValue="mt-3 mb-2  ps-2"
                  />
                </Col>
              </Row>
            </Row>
          ) : (
            <Col md={12}>
              <div className="border-bottom p-4">
                <div className="d-flex justify-content-between">
                  <div>
                    <h4 className="mb-0 card-title fw-bold ">Attendance</h4>
                    <span>Here is your attendance based on this month </span>
                  </div>
                  <Link
                    to="/self-service/attendance"
                    className="btn btn-xs btn-outline-primary mt-3"
                  >
                    View Detail
                  </Link>
                </div>
              </div>
            </Col>
          )}
        </Card>
      </Col>
    </Row>
  );
};
export default AttendanceCard;
