import React, { Fragment } from "react";
import { Card, Col, Nav, Row, Tab } from "react-bootstrap";
import ProductSold from "./ProductSold";
import ProductIncentive from "./ProductIncentive";

const SalesProductList = ({ className, data, incentive }) => {
  return (
    <Tab.Container defaultActiveKey="Product Sold">
      <Card className={className}>
        <Card.Header className="border-bottom-0 p-0 bg-white">
          <Nav className="nav-lb-tab">
            <Nav.Item>
              <Nav.Link eventKey="Product Sold" className="mb-sm-3 mb-md-0">
                Product Sold
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="Product Incentive"
                className="mb-sm-3 mb-md-0"
              >
                Product Incentive
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body className="p-0">
          <Tab.Content>
            <Tab.Pane eventKey="Product Sold" className="py-1 px-4">
              <ProductSold data={data} />
            </Tab.Pane>
            <Tab.Pane eventKey="Product Incentive" className="py-1 px-4">
              <ProductSold data={incentive} />
            </Tab.Pane>
          </Tab.Content>
        </Card.Body>
      </Card>
    </Tab.Container>
  );
};

export default SalesProductList;
