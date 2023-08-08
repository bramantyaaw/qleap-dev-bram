// import node module libraries
import React from "react";
import { Row, Col, Card, ListGroup } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiTrophy } from "@mdi/js";

// import data files

const Achievment = ({ data }) => {
  return (
    <Card style={{ height: "100%" }}>
      {/* Card header */}
      <Card.Header className="d-flex justify-content-between align-items-center">
        <div>
          <h4 className="mb-0 fw-bold">Achievement</h4>
          <p className="mb-0">Employee Award</p>
        </div>
        {/* <div>
          <Link to="#" className="btn btn-xs btn-outline-primary mt-1">
            View Detail
          </Link>
        </div> */}
      </Card.Header>

      {/* Card body */}
      <Card.Body>
        {/* List group */}
        <ListGroup variant="flush" className="">
          {data &&
            data.map((item, index) => {
              return (
                <ListGroup.Item className="px-0 pt-0 border-0 pb-5" key={index}>
                  <Row className="position-relative">
                    <Col xs="auto">
                      <div className="icon-shape icon-md bg-light-info text-dark-info rounded-circle">
                        {/* {item.icon} */}
                        <Icon
                          path={mdiTrophy}
                          className="nav-icon"
                          size={0.8}
                        />
                        ,
                      </div>
                    </Col>
                    <Col className="ms-n3">
                      <h4 className="mb-0 h5">{item.award_name}</h4>
                      <p
                        className="mb-0 text-body"
                        dangerouslySetInnerHTML={{ __html: item.emp_hon_note }}
                      ></p>
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
          {data?.length === 0 && (
            <h5 className="text-muted text-center fst-italic">
              No Data to Display
            </h5>
          )}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};
export default Achievment;
