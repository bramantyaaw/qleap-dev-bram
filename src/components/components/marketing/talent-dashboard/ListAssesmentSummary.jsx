import { Row, Col, ListGroup } from "react-bootstrap";
import Icon from "@mdi/react";

const ListAssesmentSummary = ({ source, title, desc }) => {
  return (
    <ListGroup.Item className="px-4 pt-0 border-0 ">
      <div className="d-flex w-100 h-100 align-items-center">
        <div>
          <div
            className={`icon-shape icon-xs bg-light-primary text-dark-primary rounded-circle`}
          >
            <Icon path={source} size={0.5} className="text-primary" />
          </div>
        </div>
        <div className="ms-3 w-100 h-100 ">
          <div className="d-flex align-items-center justify-content-between h-100 w-100">
            <h4 className="mb-0 h5 text-kinda-dark">{title}</h4>
            <p className="mb-0 text-kinda-dark h6 text-end">{desc}</p>
          </div>
        </div>
      </div>
    </ListGroup.Item>
  );
};

export default ListAssesmentSummary;
