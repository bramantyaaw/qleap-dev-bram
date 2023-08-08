import { Col, Image, Row } from "react-bootstrap";
import DotBadge from "../../../elements/bootstrap/DotBadge";

export const WeeklyNotification = ({ data }) => {
  return (
    <>
      <Row>
        <Col lg={2} md={2} sm={2}>
          <Image src={data.src} />
        </Col>
        <Col lg={10} md={10} sm={10}>
          <div className="justify-content-start pe-5 w-100 w-xl-60">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5
                  className={`font-weight-bold ${
                    data.isNew ? "" : "text-muted"
                  }`}
                >
                  {data.title}
                </h5>
              </div>
              <div className="d-flex align-items-center">
                {data.isNew && <DotBadge bg="primary" />}
              </div>
            </div>
            <br />
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span className=" font-weight-normal">{data.notification}</span>
              </div>
              <div className="d-flex align-items-center">
                <span className="font-weight-normal">{data.date}</span>
              </div>
            </div>
          </div>
          <hr />
        </Col>
      </Row>
    </>
  );
};
