// import node module libraries
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";
import TicketingBadges from "./TicketingBadges";

export const OverviewBadges = (props) => {
  const { arrOpen, arrProcess, arrDone, arrClose } = props;

  return (
    <>
      {arrProcess && (
        <Card>
          <Card.Body className="p-0">
            <div className="p-4 overview-card">
              <span className="fs-6 text-uppercase fw-semi-bold">
                MY TICKET - <span className={`text-warning`}>process</span>
              </span>

              <div className="mt-4 mb-1 d-flex align-items-center justify-content-center desc-overview">
                <h2 className="h1 lh-1 fw-bold ">{arrProcess.length}</h2>
                <span className="d-flex justify-content-between">
                  <span className="text-secondary mx-3">New This Month</span>

                  <TicketingBadges
                    colorVariant="warning"
                    className="ms-2"
                    badgeValue="1"
                  />
                </span>
              </div>
            </div>
          </Card.Body>
        </Card>
      )}
      {arrDone && (
        <Card>
          <Card.Body className="p-0">
            <div className="p-4 overview-card">
              <span className="fs-6 text-uppercase fw-semi-bold">
                MY TICKET - <span className={`text-success`}>done</span>
              </span>

              <div className="mt-4 mb-1 d-flex align-items-center justify-content-center desc-overview">
                <h2 className="h1 lh-1 fw-bold ">{arrDone.length}</h2>
                <span className="d-flex justify-content-between">
                  <span className="text-secondary mx-3">New This Month</span>

                  <TicketingBadges
                    colorVariant="success"
                    className="ms-2"
                    badgeValue="1"
                  />
                </span>
              </div>
            </div>
          </Card.Body>
        </Card>
      )}
      {arrOpen && (
        <Card>
          <Card.Body className="p-0">
            <div className="p-4 overview-card">
              <span className="fs-6 text-uppercase fw-semi-bold">
                MY TICKET - <span className={`text-info`}>open</span>
              </span>

              <div className="mt-4 mb-1 d-flex align-items-center justify-content-center desc-overview">
                <h2 className="h1 lh-1 fw-bold ">{arrOpen.length}</h2>
                <span className="d-flex justify-content-between">
                  <span className="text-secondary mx-3">New This Month</span>

                  <TicketingBadges
                    colorVariant="info"
                    className="ms-2"
                    badgeValue="1"
                  />
                </span>
              </div>
            </div>
          </Card.Body>
        </Card>
      )}
      {arrClose && (
        <Card>
          <Card.Body className="p-0">
            <div className="p-4 overview-card">
              <span className="fs-6 text-uppercase fw-semi-bold">
                MY TICKET - <span className={`text-secondary`}>closed</span>
              </span>

              <div className="mt-4 mb-1 d-flex align-items-center justify-content-center desc-overview">
                <h2 className="h1 lh-1 fw-bold ">{arrClose.length}</h2>
                <span className="d-flex justify-content-between">
                  <span className="text-secondary mx-3">New This Month</span>

                  <TicketingBadges
                    colorVariant="secondary"
                    className="ms-2"
                    badgeValue="1"
                  />
                </span>
              </div>
            </div>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

// Specifies the default values for props
OverviewBadges.defaultProps = {
  classValue: "",
};

// Typechecking With PropTypes
OverviewBadges.propTypes = {
  classValue: PropTypes.string,
};

export default OverviewBadges;
