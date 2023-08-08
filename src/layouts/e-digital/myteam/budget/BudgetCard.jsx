// import node module libraries
import { Row, Col, Card, ProgressBar } from "react-bootstrap";
import StatLeftCenterIcon from "../../../../components/components/dashboard/common/stats/StatLeftCenterIcon";
import StatRightCenterIcon from "../../../../components/components/dashboard/common/stats/StatRightCenterIcon";

// import custom components

const BudgetCard = ({ summary }) => {
  const formatter = new Intl.NumberFormat("ID", {
    style: "currency",
    currency: "IDR",
  });

  const totalSalesIDR = formatter.format(summary?.totalSales);
  const totalIncentiveIDR = formatter.format(summary?.totalIncentive);

  const salesString = summary?.totalSales?.toString();

  return (
    <Row>
      <Col md={12} className="mb-4">
        <Card>
          <Row>
            <Col md={12}>
              <div className="border-bottom p-4">
                <h3 className="mb-4 card-title">Sales </h3>
                <div className="d-flex justify-content-between mb-3">
                  <div>
                    <span>
                      <span className="text-dark fw-bold">
                        {summary?.totalSales ? totalSalesIDR : "0"}{" "}
                      </span>
                      (Total)
                    </span>
                  </div>
                  <div>
                    <span>
                      <span className="text-dark fw-bold">
                        {summary?.totalIncentive ? totalIncentiveIDR : "0"}{" "}
                      </span>
                      Incentive
                    </span>
                  </div>
                </div>
                <ProgressBar style={{ height: "8px" }}>
                  <ProgressBar now={50} style={{ width: "15%" }} />
                  <ProgressBar
                    variant="success"
                    now={50}
                    style={{ width: "18%" }}
                  />
                  <ProgressBar
                    variant="danger"
                    now={50}
                    style={{ width: "10%" }}
                  />
                  <ProgressBar
                    variant="warning"
                    now={50}
                    style={{ width: "16%" }}
                  />
                  <ProgressBar
                    variant="info"
                    now={50}
                    style={{ width: "22%" }}
                  />
                </ProgressBar>
              </div>
            </Col>
            <Col lg={4} md={12} xs={12}>
              <StatLeftCenterIcon
                title="Total Sales"
                value={summary?.totalSales ? totalSalesIDR : "0"}
                iconName="dollar-sign"
                iconColorVariant="primary"
                customFont={salesString?.length >= 10 ? "h2" : "h1"}
              />
            </Col>
            <Col lg={4} md={12} xs={12} className="border-start">
              <StatLeftCenterIcon
                title="Total Quantity"
                value={summary?.totalQuantity ? summary?.totalQuantity : "0"}
                iconName="shopping-cart"
                iconColorVariant="danger"
                customFont={salesString?.length >= 10 ? "h2" : "h1"}
              />
            </Col>
            <Col lg={4} md={12} xs={12} className="border-start">
              <StatLeftCenterIcon
                title="Total Incentive"
                value={summary?.totalIncentive ? totalIncentiveIDR : "0"}
                iconName="pie-chart"
                iconColorVariant="success"
                customFont={salesString?.length >= 10 ? "h2" : "h1"}
              />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};
export default BudgetCard;
