import { Fragment } from "react";
import { Col, Button } from "react-bootstrap";
import TicketPage from "../../hero/TicketPage";
import SuccessAlert from "../alerts/SuccessAlert";

const GKStepper = (props) => {
  const {
    currentStep,
    steps,
    success,
    text1,
    text2,
    text3,
    text4,
    link1,
    link2,
    link3,
    textsucc1,
    spansucc1,
    textsucc2,
    spansucc2,
    linksucc,
  } = props;

  return (
    <Fragment>
      <div className="pb-12 fragment-body">
        <div className="stepper bg-wrapper">
          <Col lg={{ span: 10, offset: 1 }} md={12} sm={12}>
            <TicketPage
              text1={text1}
              text2={text2}
              text3={text3}
              text4={text4}
              link1={link1}
              link2={link2}
              link3={link3}
            />
            {success ? (
              <SuccessAlert
                text1={textsucc1}
                span1={spansucc1}
                text2={textsucc2}
                span2={spansucc2}
                link={linksucc}
              />
            ) : (
              <div className="stepper">
                <div className="stepper-header">
                  {steps.map((step, index) => {
                    return (
                      <Fragment key={step.id}>
                        <div
                          className={`step ${
                            step.id === currentStep ? "active" : ""
                          }`}
                        >
                          <Button bsPrefix="step-trigger">
                            <span className="stepper-circle">{step.id}</span>
                            <span className="stepper-label">{step.title}</span>
                          </Button>
                        </div>
                        {steps.length > step.id ? (
                          <div className="stepper-line"></div>
                        ) : (
                          ""
                        )}
                      </Fragment>
                    );
                  })}
                </div>
                <div className="stepper-content">
                  <div className="stepper-pane fade active">
                    {steps[currentStep - 1].content}
                  </div>
                </div>
              </div>
            )}
          </Col>
        </div>
      </div>
    </Fragment>
  );
};

export default GKStepper;
