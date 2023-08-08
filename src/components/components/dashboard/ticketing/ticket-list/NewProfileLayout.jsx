import React, { Fragment } from "react";
import { Row, Container } from "react-bootstrap";
import MySubmittionHeader from "./MySubmittionHeader";
import SubmissionSectionLayout from "./SubmissionSectionLayout";

const NewProfileLayout = ({ children }) => {
  return (
    <Fragment>
      <div className="pt-5 pb-5">
        <Container>
          <MySubmittionHeader />
          <Row className="content-profile-wrapper">
            {/* <SidebarTicket /> */}
            <SubmissionSectionLayout>{children}</SubmissionSectionLayout>
            {/* <Col className="card-content-wrapper">{props.children}</Col> */}
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};
export default NewProfileLayout;
