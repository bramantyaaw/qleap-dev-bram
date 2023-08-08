import axios from "axios";
import React, { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Col, Row, Container, Image, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const EventPart = (props) => {
  const { token } = props;
  const [dataEvent, getDataEvent] = useState([]);

  const fetchLatestEvent = async () => {
    try {
      await axios
        .get(`/get-event`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res?.status === 200) {
            getDataEvent(res?.data?.data);
          }
        });
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    fetchLatestEvent();
    // eslint-disable-next-line
  }, [token]);
  return (
    <Fragment>
      <div className="py-lg-5 pt-8 py-10 px-5 bg-gray-100">
        <Row className="mx-5">
          <Col xl={10} md={12} className="col-12 offset-xl-1">
            <Row className="text-center">
              <Col md={12} className="px-md-16 mb-8 mt-6">
                <span className="text-uppercase text-primary fw-semi-bold ls-md">
                  EVENT
                </span>
                <h2 className="fsc-32 fw-bold mt-3 mb-2">Upcoming Event</h2>
              </Col>
            </Row>
            <Row className="align-items-center text-center text-sm-start">
              <Col lg={7} md={12} className="col-12">
                <div className="mb-8 mb-lg-0 me-lg-4">
                  <div>
                    <p className="py-4 fsc-24 mb-0 fw-bold">
                      {dataEvent && dataEvent[0]?.event_name}
                    </p>
                    <p className=" fsc-24 fw-bold mb-4 lh-2">
                      {dataEvent && dataEvent[0]?.event_sdescription}
                    </p>
                  </div>
                  <div className="py-3">
                    <Row>
                      <Col>
                        <span>
                          <i className="fe fe-calendar pr-3" />
                          &nbsp;
                          {dataEvent && dataEvent[0]?.event_date}
                        </span>
                      </Col>
                      <Col>
                        <span>
                          <i className="fe fe-user pr-3"></i>
                          &nbsp;
                          {dataEvent && dataEvent[0]?.speaker_name}
                        </span>
                      </Col>
                    </Row>
                  </div>
                  <div>
                    <Link to="/ezone/event" className="btn btn-primary mx-2">
                      Register
                    </Link>
                    <Link
                      to="/ezone/event"
                      className="btn btn-outline-secondary mx-2"
                    >
                      View All Event
                    </Link>
                  </div>
                </div>
              </Col>
              <Col lg={5} md={12} className="col-12">
                <div>
                  <Image
                    src={dataEvent && dataEvent[0]?.event_banner}
                    className="d-3 w-100"
                  />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default EventPart;
