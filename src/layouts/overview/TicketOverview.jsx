import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Row, Col } from "react-bootstrap";
import OverviewBadges from "../../components/components/dashboard/ticketing/elements/bagdes/OverviewBadges";

const TicketOverview = () => {
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [uid, setUid] = useState(localStorage.getItem("uid"));
  const [arrPage, setArrPage] = useState([]);
  const [arrOpen, setArrOpen] = useState([]);
  const [arrProcess, setArrProcess] = useState([]);
  const [arrDone, setArrDone] = useState([]);
  const [arrClose, setArrClose] = useState([]);
  const [arrReject, setArrReject] = useState([]);

  const fetchListTicket = async () => {
    try {
      const { data } = await axios.get(
        `/services/ticketing/get-ticket-list/${uid}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setArrPage(data?.data);
    } catch (err) {
      return err;
    }
  };
  const currentDate = new Date();
  const oneMonthAgo = new Date(
    currentDate.getTime() - 30 * 24 * 60 * 60 * 1000
  );

  const filteredData = arrPage?.filter((item) => {
    const itemDate = new Date(item?.created_date);
    return itemDate >= oneMonthAgo;
  });

  const filterTicket = () => {
    const arrO = [];
    const arrP = [];
    const arrD = [];
    const arrC = [];

    filteredData?.filter((data) => {
      switch (data?.status) {
        case "O":
          arrO.push(data);
          return setArrOpen(arrO);
        case "P":
          arrP.push(data);
          return setArrProcess(arrP);
        case "D":
          arrD.push(data);
          return setArrDone(arrD);
        case "C":
          arrC.push(data);
          return setArrClose(arrC);
        default:
          return null;
      }
    });
  };

  useEffect(() => {
    fetchListTicket();
  }, []);

  useEffect(() => {
    filterTicket();
  }, [arrPage]);

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
    setUid(localStorage.getItem("uid"));
  }, [localStorage]);

  return (
    <Card className="border-0 mt-4">
      <Card.Header>
        <div className="mb-3 mb-lg-0">
          <h3 className="mb-0">My Ticket Overview</h3>
          <p className="mb-0">
            Here is a overview list of ticket that you submitted
          </p>
        </div>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col className="overview-card-body">
            <OverviewBadges
              arrOpen={arrOpen}
              arrProcess={arrProcess}
              arrDone={arrDone}
              arrClose={arrClose}
            />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default TicketOverview;
