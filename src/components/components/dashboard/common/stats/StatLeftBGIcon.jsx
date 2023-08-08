// import node module libraries
import { Card } from "react-bootstrap";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiInformationOutline as infoIcon } from "@mdi/js";

const StatLeftBGIcon = (props) => {
  const {
    value,
    summary,
    summary2,
    iconName,
    span,
    iconColorVariant,
    classValue,
    title,
    classText,
    spanClassName,
    info,
    euniv,
  } = props;

  return (
    <Card border="light" className={`${classValue} position-relative`}>
      {euniv ? (
        <Card.Body className="d-flex flex-column justify-content-between">
          <div className="d-flex justify-content-between">
            <span className="text-secondary fw-semi-bold">{title}</span>
            <span className="fs-6 text-muted">{info}</span>
          </div>
          <p className="fs-6 text-muted">{summary2}</p>
          <div className="m-0 d-flex justify-content-between align-items-center">
            <div className="lh-1">
              <h2 style={{ fontFamily: "Roboto" }} className={`${classText}`}>
                {value}
              </h2>
              <span className={spanClassName}>{summary}</span>
            </div>
            <div>
              <span
                className={`icon-shape icon-xl rounded-3 text-${iconColorVariant}`}
              >
                <Icon path={iconName} size={1.3} />
              </span>
            </div>
          </div>
        </Card.Body>
      ) : (
        <Card.Body>
          <span className="fs-6 text-uppercase fw-semi-bold">
            {title}
            <span className="text-danger"> {span}</span>
            {info && (
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip
                    className="position-absolute"
                    style={{ top: "0", right: "0" }}
                  >
                    <p className="mb-0 text-start">
                      <span className="text-danger">*</span>Exclude :
                    </p>
                    <ul className="text-start">
                      <li>PPH</li>
                      <li>Deposit 20%</li>
                      <li>Validation Principle</li>
                    </ul>
                  </Tooltip>
                }
              >
                <div>
                  <Icon
                    role="button"
                    path={infoIcon}
                    size={0.7}
                    className="position-absolute"
                    style={{ top: "20", right: "20" }}
                  />
                </div>
              </OverlayTrigger>
            )}
          </span>
          <div className="mt-2 d-flex justify-content-between align-items-center">
            <div className="lh-1">
              <h2 className={`${classText}`}>{value}</h2>
              <span className={spanClassName}>{summary}</span>
            </div>
            <div>
              <span
                className={`bg-light-${iconColorVariant} icon-shape icon-xl rounded-3 text-dark-${iconColorVariant}`}
              >
                <Icon path={iconName} size={1.3} />
              </span>
            </div>
          </div>
        </Card.Body>
      )}
    </Card>
  );
};

export default StatLeftBGIcon;
