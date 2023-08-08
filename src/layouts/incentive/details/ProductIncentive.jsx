import React, { useState } from "react";
import { Card, Col, Nav, Row, Tab } from "react-bootstrap";
import SearchInput from "../../../components/components/dashboard/ticketing/elements/search/SearchInput";
import TableProductSold from "./TableProductSold";
import TableProductIncentive from "./TableProductIncentive";

const ProductIncentive = () => {
  const [search, setSearch] = useState("");

  const arrData = [
    {
      No: 1,
      Product_Name: "IT1 20 CHARGER WHT",
      Posting_Date: "2023-03-29",
      Quantity: 1,
      Incentive_Product: 0,
      Sales_Amount: 199000,
      Total_Incentive: 0,
      POS_Number: "SS0222303000477",
      Store: "SES LOTTE SHOPPING AVENUE",
    },
    {
      No: 1,
      Product_Name: "IT1 DUAL PORT CAR CHARGER PD 20W - BLK",
      Posting_Date: "2023-03-12",
      Quantity: 1,
      Incentive_Product: 0,
      Sales_Amount: 199000,
      Total_Incentive: 0,
      POS_Number: "SS0222303000477",
      Store: "SES LOTTE SHOPPING AVENUE",
    },
    {
      No: 1,
      Product_Name: "IT1 20 CHARGER WHT",
      Posting_Date: "2023-03-29",
      Quantity: 1,
      Incentive_Product: 0,
      Sales_Amount: 199000,
      Total_Incentive: 0,
      POS_Number: "SS0222303000477",
      Store: "SES LOTTE SHOPPING AVENUE",
    },
    {
      No: 1,
      Product_Name: "IT1 DUAL PORT CAR CHARGER PD 20W - BLK",
      Posting_Date: "2023-03-12",
      Quantity: 1,
      Incentive_Product: 0,
      Sales_Amount: 199000,
      Total_Incentive: 0,
      POS_Number: "SS0222303000477",
      Store: "SES LOTTE SHOPPING AVENUE",
    },
    {
      No: 1,
      Product_Name: "IT1 20 CHARGER WHT",
      Posting_Date: "2023-03-29",
      Quantity: 1,
      Incentive_Product: 0,
      Sales_Amount: 199000,
      Total_Incentive: 0,
      POS_Number: "SS0222303000477",
      Store: "SES LOTTE SHOPPING AVENUE",
    },
    {
      No: 1,
      Product_Name: "IT1 DUAL PORT CAR CHARGER PD 20W - BLK",
      Posting_Date: "2023-03-12",
      Quantity: 1,
      Incentive_Product: 0,
      Sales_Amount: 199000,
      Total_Incentive: 0,
      POS_Number: "SS0222303000477",
      Store: "SES LOTTE SHOPPING AVENUE",
    },
  ];
  return (
    <Card className={` border-0 w-100`}>
      <Card.Header className="border-bottom px-3 py-3 d-flex justify-content-end align-items-center">
        <div className="d-flex">
          <SearchInput setSearch={setSearch} />
        </div>
      </Card.Header>
      <Card.Body>
        <TableProductIncentive arrData={arrData} />
      </Card.Body>
    </Card>
  );
};

export default ProductIncentive;
