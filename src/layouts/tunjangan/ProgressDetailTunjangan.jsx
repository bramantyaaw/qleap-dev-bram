import React from "react";
import { Card, Col, Row, Image } from "react-bootstrap";
import ImgDoneSubmittion from "../../assets/images/svg/tunjangan-submittion-done.svg";
import ImgProgressSubmittion from "../../assets/images/svg/tunjangan-submittion-progress.svg";
import ImgPendingSubmittion from "../../assets/images/svg/tunjangan-submittion-pending.svg";
import ImgRejectSubmittion from "../../assets/images/svg/tunjangan-submittion-reject.svg";
import FlowProgress from "../../components/components/dashboard/ticketing/elements/flow-progress/FlowProgress";

const ProgressDetailTunjangan = ({ textcolor, className }) => {
  return (
    <Card className={`${className} border-0 flow-progress`}>
      <Card.Header>
        <div className="mb-3 mb-lg-0">
          <h3 className="mb-0">Flow Progress Submission</h3>
        </div>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col>
            <FlowProgress
              src={ImgDoneSubmittion}
              text1="Employee Submit"
              text2="Employee submit Tunjangan"
              textcolor="text-success"
              status="Done"
            />
            <div className="line-between-flow"></div>
            <FlowProgress
              src={ImgDoneSubmittion}
              text1="Superior Approval"
              text2="Approve by Superior"
              textcolor="text-success"
              status="Done"
            />
            <div className="line-between-flow"></div>
            <FlowProgress
              src={ImgProgressSubmittion}
              text1="HCBP Approval"
              text2="Approval by HCBP"
              textcolor="text-warning"
              status="Process"
            />
            <div className="line-between-flow"></div>
            {/* <FlowProgress
              src={ImgRejectSubmittion}
              text1="HCBP Approval"
              text2="Approval by HCBP"
              textcolor="text-danger"
              status="Reject"
            />
            <div className="line-between-flow"></div> */}
            <FlowProgress
              src={ImgPendingSubmittion}
              text1="HC Benefit Approval"
              text2="Approval by HC Benefit"
              textcolor="text-secondary"
              status="Pending"
            />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ProgressDetailTunjangan;
