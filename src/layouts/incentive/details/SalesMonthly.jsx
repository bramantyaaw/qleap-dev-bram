import React from "react";
import { Card } from "react-bootstrap";
import ApexCharts from "../../../components/components/elements/charts/ApexCharts";

const SalesMonthly = ({
  isMobile,
  mobileOptions,
  options,
  series,
  mobileSeries,
  dailyData,
  weeklyData,
}) => {
  return (
    <Card>
      <Card.Header>
        <p className="mb-0 h4">Sales Monthly Report</p>
      </Card.Header>
      <Card.Body>
        <ApexCharts
          options={isMobile ? mobileOptions : options}
          series={isMobile ? mobileSeries : series}
          type="area"
          height={350}
        />
      </Card.Body>
    </Card>
  );
};

export default SalesMonthly;
