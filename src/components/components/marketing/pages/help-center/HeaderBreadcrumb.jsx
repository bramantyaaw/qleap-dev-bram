// import node module libraries
import React, { Fragment } from "react";
import { Col, Row, Container } from "react-bootstrap";

// import custom components

import GKBreadcrumb from "../../common/breadcrumb/GKBreadcrumb";

const HeaderBreadcrumb = ({ title, breadcrumb, desc }) => {

  return (
    <Fragment>
      {/* page title  */}
      <div className="py-6 bg-colors-gradient-reversed">
        <Container>
          <Row>
            <Col md={{ offset: 2, span: 8 }} xs={12}>
              <h1 className="fw-bold mb-0 text-left white-font">{title}</h1>
              <p className="text-left white-font">{desc}</p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* breadcrumb  */}
      <div className="pt-3">
        <Container>
          <Row>
            <Col md={{ offset: 2, span: 8 }} xs={12}>
              <GKBreadcrumb breadcrumb={breadcrumb} />
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};
export default HeaderBreadcrumb;
