// import node module libraries
import { Row, Col, Card } from "react-bootstrap";
import { mdiServerSecurity, mdiAccountTie, mdiKey } from "@mdi/js";

// import custom components
import StatRightCenterIcon from "../../../../components/components/dashboard/common/stats/StatRightCenterIcon";

const BudgetSection = () => {
  return (
    <Card>
      <Card.Header className="card-header">
        <h4 className="mb-0">Focus One Task </h4>
      </Card.Header>
      <Row>
        <Col lg={4} md={12} xs={12}>
          <StatRightCenterIcon
            title="90%"
            value="STO 2023"
            iconName={mdiServerSecurity}
            iconColorVariant="primary"
            classValue="mt-3 mb-2 ps-4"
          />
        </Col>
        <Col lg={4} md={12} xs={12} className="border-start-md">
          <StatRightCenterIcon
            title="50%"
            value="Role and Responsibility"
            iconName={mdiAccountTie}
            iconColorVariant="danger"
            classValue="mt-3 mb-2 ps-2"
          />
        </Col>
        <Col lg={4} md={12} xs={12} className="border-start-md">
          <StatRightCenterIcon
            title="80%"
            value="KPI 2023"
            iconName={mdiKey}
            iconColorVariant="success"
            classValue="mt-3 mb-2 ps-2 pe-4"
          />
        </Col>
      </Row>
    </Card>
  );
};
export default BudgetSection;
