import { Button, Col, Image, ProgressBar, Row } from "react-bootstrap";

export const WeeklyTask = ({ data }) => {
  return (
    <div className="p-3">
      <Row>
        <Col lg={2} md={2} sm={2}>
          <Image src={data.src} />
        </Col>
        <Col lg={10} md={10} sm={10}>
          <div className="justify-content-start pe-5 w-100 w-xl-60">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className={`font-weight-bold`}>{data.title}</h5>
              </div>
              <div className="d-flex align-items-center">
                <Button class="btn btn-primary btn-circle btn-sm">
                  <i class="fa fa-arrow-right" aria-hidden="true"></i>
                </Button>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span className=" font-weight-normal">Period: {data.date}</span>
              </div>
              <div className="d-flex align-items-center">
                {data?.progress && (
                  <ProgressBar
                    striped
                    variant="success"
                    now={data?.now}
                    className="mb-2"
                  />
                )}
                {data?.progress ? data?.progress : ""}
              </div>
            </div>
          </div>
          <hr />
        </Col>
      </Row>
    </div>
  );
};
