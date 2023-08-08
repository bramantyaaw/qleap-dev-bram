// import node module libraries
import { Row, Col, Card, Button } from "react-bootstrap";

// import custom components
import StatRightCenterIcon from "../../../common/stats/StatRightCenterIcon";
import Icon from "@mdi/react";
import { mdiCash, mdiCart } from "@mdi/js";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const IncentiveCard = () => {
  const [uid, setUid] = useState(localStorage.getItem("uid"));
  const [token, setToken] = useState(localStorage.getItem("access_token"));

  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const startDate = firstDayOfMonth.toISOString().slice(0, 10);
  const endDate = today.toISOString().slice(0, 10);

  const [summary, setSummary] = useState({});

  const formatter = new Intl.NumberFormat("ID", {
    style: "currency",
    currency: "IDR",
  });

  const totalSalesIDR = formatter.format(summary?.totalSales);
  const totalIncentiveIDR = formatter.format(summary?.totalIncentive);

  const salesString = summary?.totalSales?.toString();

  const handleGetIncentive = async () => {
    try {
      await axios
        .post(
          "/sales/get-incentive",
          {
            uid: uid,
            from_date: startDate,
            to_date: endDate,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((data) => {
          setSummary(data?.data?.data?.summary);
        });
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    handleGetIncentive();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setUid(localStorage.getItem("uid"));
    setToken(localStorage.getItem("access_token"));
    // eslint-disable-next-line
  }, [localStorage]);

  return (
    <Row>
      <Col md={12} className="mb-4">
        <Card>
          <Row>
            <Col md={12}>
              <div className="border-bottom p-4">
                <div className="d-flex justify-content-between">
                  <div>
                    <h4 className="mb-0 fw-bold card-title">Incentive</h4>
                    <span>
                      Here is a your incentives sales summary based on this
                      month
                    </span>
                  </div>
                  <Link
                    to="/profile/incentive"
                    className="btn btn-xs btn-outline-primary mt-3"
                  >
                    View Detail
                  </Link>
                </div>
              </div>
            </Col>
            <Col lg={3} md={6} xs={6} className="border-end">
              <StatRightCenterIcon
                title={summary?.totalIncentive ? totalIncentiveIDR : "0"}
                value="Total Incentive"
                iconName={mdiCash}
                iconColorVariant="primary"
                classValue="mt-3 mb-2 ps-4"
              />
            </Col>
            <Col lg={3} md={6} xs={6} className="border-end">
              <StatRightCenterIcon
                title={summary?.totalQuantity ? summary?.totalQuantity : "0"}
                value="Product Sold"
                iconName={mdiCart}
                iconColorVariant="success"
                classValue="mt-3 mb-2 ps-2"
              />
            </Col>
            <Col lg={3} md={6} xs={6} className="border-end">
              <StatRightCenterIcon
                title={summary?.totalIncentive ? totalIncentiveIDR : "0"}
                value="Total Incentive MTD"
                iconName={mdiCash}
                iconColorVariant="warning"
                classValue="mt-3 mb-2 ps-2"
              />
            </Col>
            <Col lg={3} md={6} xs={6}>
              <StatRightCenterIcon
                title={summary?.totalSales ? totalSalesIDR : "0"}
                value="Sales MTD"
                iconName={mdiCash}
                iconColorVariant="info"
                classNameTitle="h5"
                classValue="mt-3 mb-2 pe-3"
              />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};
export default IncentiveCard;
