import React from "react";
import { Col, Form, Row, Image } from "react-bootstrap";
import BannerWellings from "../../../assets/images/card/banner-wellings.png";
export const CardPopup = ({ itemId }) => {
  return (
    <Form>
      <Row>
        <Row className="mb-3">
          <Col lg={5} md={6} sm={12}>
            <Image
              src={itemId?.CardImg}
              alt=""
              className=" card-img-top rounded"
            />
          </Col>
          <Col lg={7} md={6} sm={12}>
            <Form.Label>Point</Form.Label>
            <Form.Control type="text" value={itemId.Point} className="mb-3" />
            <Form.Label>Date & Time</Form.Label>
            <Form.Control type="text" value={new Date().toLocaleString()} />
          </Col>
        </Row>
        <Row className="d-flex pt-3">
          <h4>{itemId.CardName} Promo</h4>
          <Image
            src={BannerWellings}
            alt=""
            className=" card-img-top rounded"
          />
        </Row>
      </Row>
    </Form>
  );
};
