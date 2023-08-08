import React, { Fragment, useState } from "react";

// import node module libraries
import { Col, Row, Container } from "react-bootstrap";

// import custom components
import GKAccordionBox from "../../../components/components/marketing/common/accordions/GKAccordionBox";
import HelpCenterFAQsData, {
  BPJSKesehatan,
  BPJSKetenagakerjaan,
} from "../../../data/FAQ/HelpCenterFAQsData";

const AllFAQsList = () => {
  return (
    <div className="py-5">
      <Container>
        <Row>
          <Col md={{ offset: 2, span: 8 }} xs={12}>
            <div className="mb-4">
              <h2 className="mb-0 fw-semi-bold">BPJS Kesehatan</h2>
            </div>
            <GKAccordionBox accordionItems={BPJSKesehatan} itemClass="px-0" />
          </Col>
        </Row>

        <Row>
          <Col md={{ offset: 2, span: 8 }} xs={12}>
            <div className="mb-4 mt-6">
              <h2 className="mb-0 fw-semi-bold">BPJS Ketenagakerjaan</h2>
            </div>
            <GKAccordionBox
              accordionItems={BPJSKetenagakerjaan}
              itemClass="px-0"
            />
          </Col>
        </Row>

        {/* general inquiries faqs accordion  */}
        {/* <Row>
					<Col md={{ offset: 2, span: 8 }} xs={12}>
						<div className="mb-4 mt-6">
							<h2 className="mb-0 fw-semi-bold">General inquiries</h2>
						</div>
						<GKAccordionBox
							accordionItems={GeneralInquiriesFAQs}
							itemClass="px-0"
						/>
					</Col>
				</Row> */}

        {/* support faqs accordion  */}
        {/* <Row>
					<Col md={{ offset: 2, span: 8 }} xs={12}>
						<div className="mb-4 mt-6">
							<h2 className="mb-0 fw-semi-bold">Support</h2>
						</div>
						<GKAccordionBox accordionItems={SupportFAQs} itemClass="px-0" />
					</Col>
				</Row> */}
      </Container>
    </div>
  );
};
export default AllFAQsList;
