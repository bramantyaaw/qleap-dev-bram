// import node module libraries
import { Card } from "react-bootstrap";
import Icon from "@mdi/react";
import { Link } from "react-router-dom";

const StatRightBGIcon = (props) => {
  const {
    title,
    value,
    summary,
    iconName,
    iconColorVariant,
    classValue,
    linkName,
    classText,
  } = props;

  return (
    <Link to={linkName} className="text-dark">
      <Card className={`card-hover ${classValue}`} style={{ height: "100%" }}>
        <div className="d-flex justify-content-between align-items-center px-4 pt-3">
          <div className="d-flex">
            <span
              className={`bg-light-${iconColorVariant} icon-shape icon-md rounded-3 text-dark-${iconColorVariant}`}
            >
              <Icon path={iconName} size={0.8} />
            </span>
            <div className="lh-1 ms-3">
              <h4 className={`fw-bold mb-1 text-inherit ${classText}`}>
                {value}
              </h4>
              <p className="mb-0 fs-6">
                <span className="me-1 text-wrap">{summary}</span>
              </p>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default StatRightBGIcon;
