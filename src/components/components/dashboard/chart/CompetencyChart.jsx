// import node module libraries
import React from "react";
import { Link } from "react-router-dom";
import { Card, Dropdown } from "react-bootstrap";
import ApexCharts from "../../elements/charts/ApexCharts";
import {
  TaskSectionChartOptions,
  TaskSectionChartSeries,
} from "../../../../data/charts/ChartData";

const CompetencyChart = ({
  dataOption,
  dataSeries,
  cardHeader,
  type,
  height,
}) => {
  // The forwardRef is important!!,
  // Dropdown needs access to the DOM node in order to position the Menu
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Link
      to=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </Link>
  ));

  return (
    <div style={{ height: "fit-content" }}>
      <Card>
        <Card.Header>
          <div className="d-flex justify-content-between">
            <div className="">
              <h4 style={{ fontFamily: "Roboto" }} className="mb-0 fw-bold">
                {cardHeader}
              </h4>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          {/* chart  */}
          <ApexCharts
            options={dataOption}
            series={dataSeries}
            type={type}
            height={height}
          />
        </Card.Body>
      </Card>
    </div>
  );
};
export default CompetencyChart;
