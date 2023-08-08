import React, { Fragment, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import {
  mdiCheckboxMarkedCircleOutline,
  mdiClockOutline,
  mdiCloseCircleOutline,
  mdiCheckAll,
  mdiCogOutline as SettingsIcon,
  mdiCloseCircleOutline as RevisionIcon,
} from "@mdi/js";
import StatLeftBGIcon from "../common/stats/StatLeftBGIcon";
import { Link } from "react-router-dom";

export const CMSReuse = ({ data, setStatus }) => {
  const formatter = new Intl.NumberFormat("ID", {
    style: "currency",
    currency: "IDR",
  });

  const totalSalesIDR = formatter.format(data?.totalSales);
  const totalIncentiveIDR = formatter.format(data?.totalIncentive);

  const salesString = data?.totalSales?.toString();

  return (
    <Fragment>
      <Row>
        <Col xl={3} lg={6} md={12} sm={12}>
          <StatLeftBGIcon
            title="TOTAL BALANCE"
            value={data?.totalIncentive ? totalIncentiveIDR : "0"}
            span="*"
            classValue="mb-4 bg-primary text-white"
            classText={`${
              salesString?.length >= 7 ? "h2" : "h1"
            } fw-bold mb-0 text-white`}
            spanClassName="h6 text-white"
            info={true}
          />
        </Col>
        <Col xl={3} lg={6} md={12} sm={12}>
          <StatLeftBGIcon
            title="PRODUCT SOLD"
            value={data?.totalQuantity ? data?.totalQuantity : "0"}
            classValue="mb-4"
            classText={`${salesString?.length >= 7 ? "h2" : "h1"} fw-bold mb-0`}
            spanClassName="h6 text-kinda-light-dark"
          />
        </Col>
        <Col xl={3} lg={6} md={12} sm={12}>
          <StatLeftBGIcon
            title="TOTAL INCENTIVE MTD"
            value={data?.totalIncentive ? totalIncentiveIDR : "0"}
            classValue="mb-4"
            classText={`${salesString?.length >= 7 ? "h2" : "h1"} fw-bold mb-0`}
            spanClassName="h6 text-kinda-light-dark"
          />
        </Col>
        <Col xl={3} lg={6} md={12} sm={12}>
          <StatLeftBGIcon
            title="TOTAL SALES MTD"
            value={data?.totalSales ? totalSalesIDR : "0"}
            classValue="mb-4"
            classText={`${salesString?.length >= 7 ? "h2" : "h1"} fw-bold mb-0`}
            spanClassName="h6 text-kinda-light-dark"
          />
        </Col>
      </Row>
    </Fragment>
  );
};
