import React from "react";
import { Card, Image } from "react-bootstrap";
import ImgDeadline from "../../assets/images/svg/warning-onboard.svg";

const RightSideNewJoiner = () => {
  return (
    <>
      <Card className="mb-3 mb-4 attention-onboard">
        <Card.Header>
          <div className="mb-3 mb-lg-0">
            <h3 className="mb-0 fw-bold">Attention</h3>
          </div>
        </Card.Header>

        <Card.Body className="pt-3 d-flex flex-column justify-content-center align-items-center ">
          <Image src={ImgDeadline} className="mb-4" width="197" height="105" />
          <p className="mb-2 text-kinda-dark">Deadline On Boarding hingga :</p>
          <h1 className="text-kinda-dark fw-bold mb-2">24 Des 2022</h1>
          <p className="text-kinda-dark mb-0 text-center">
            *Jika melewati tanggal mohon menghubungi Superior anda
          </p>
        </Card.Body>
      </Card>
    </>
  );
};

export default RightSideNewJoiner;
