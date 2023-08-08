// import node module libraries
import { Col, Row, Container } from "react-bootstrap";
import React, { Fragment, useEffect, useState } from "react";

// import custom components
import GKAccordionBox from "../../components/components/marketing/common/accordions/GKAccordionBox";
// import data files
import { useSelector, useDispatch } from "react-redux";
import { faqAction } from "../../redux/action/faqAction";

const HelpCenterFAQs = () => {
  const dispatch = useDispatch();

  const { faqData } = useSelector((state) => state.faqReducer);
  const items = faqData?.data?.data;

  const win = window.localStorage;

  useEffect(() => {
    const token = win.getItem("access_token");
    dispatch(faqAction(token));
  }, []);

  return (
    <div className="mt-5 py-lg-16 py-10">
      <Container>
        <Row>
          <Col lg={{ offset: 2, span: 6 }} xs={12}>
            <div className="mb-8 pe-lg-14">
              <h2 className="pe-lg-12 mb-4 fsc-32 text-center text-sm-start fw-semi-bold text-left">
                Most frequently asked questions
              </h2>
              <p className="lead text-center text-sm-start">
                Here are the most frequently asked questions you may check
                before getting started
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={{ offset: 2, span: 8 }} xs={12}>
            <GKAccordionBox accordionItems={items} itemClass="px-0" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default HelpCenterFAQs;
