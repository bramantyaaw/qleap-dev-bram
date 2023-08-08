// import node module libraries
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Col, Dropdown, Form, Row } from "react-bootstrap";
// import custom components
import ApexCharts from "../../../../../../components/components/elements/charts/ApexCharts";
import { mdiCloseCircleOutline, mdiCheckCircleOutline } from "@mdi/js";

// import data files
import {
  TicketingTaskStatusChartSeries,
  TicketingTaskStatusChartOptions,
} from "../../../../../../data/charts/ChartData";

import StatRightCenterIcon from "../../../common/stats/StatRightCenterIcon";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { FlatPickr } from "../../../ticketing/elements/date/FlatPickr";

const TaskCompletionStatusChart = ({
  isDatabase,
  isEPCN,
  data,
  setStartDate,
  setEndDate,
}) => {
  // The forwardRef is important!!
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

  const ActionMenu = () => {
    return (
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle}>
          <i className="fe fe-more-vertical text-muted"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu align="end">
          <Dropdown.Header>Settings</Dropdown.Header>
          <Dropdown.Item eventKey="1">Action</Dropdown.Item>
          <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
          <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  const traffic_type = data?.traffic_type;
  const submission = data?.submission_approve_reject;

  const approve =
    submission?.filter((item) => item?.status === "A")[0]?.count ?? 0;
  const reject =
    submission?.filter((item) => item?.status === "R")[0]?.count ?? 0;

  const chartTraffic = {
    series: traffic_type?.map((item) => Number(item?.count)) || [],
    options: {
      labels: traffic_type?.map((item) => item?.status) || [],
      dataLabels: {
        enabled: false,
      },
      chart: {
        width: 400,
        type: "donut",
      },
      plotOptions: {
        pie: {
          donut: {
            size: "50%",
          },
        },
      },
      legend: {
        position: "right",
        fontFamily: "Inter",
        fontWeight: 400,
        fontSize: "14px",
        markers: {
          width: 8,
          height: 8,
          strokeWidth: 0,
          strokeColor: "#fff",
          fillColors: undefined,
          radius: 12,
          customHTML: undefined,
          onClick: undefined,
          offsetX: -2,
          offsetY: 1,
        },
        itemMargin: {
          horizontal: 8,
          vertical: 0,
        },
      },
      tooltip: {
        theme: "light",
        marker: {
          show: true,
        },
        x: {
          show: false,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              height: 300,
            },
          },
        },
        {
          breakpoint: 5000,
          options: {
            chart: {
              height: 300,
            },
          },
        },
      ],
    },
  };

  return (
    <Card className="h-100">
      <Card.Header>
        <div className="d-flex justify-content-between">
          <div className="justify-content-start">
            <h4 className="mb-0 ">Trafic Type</h4>
          </div>
          <div className="d-flex justify-content-end">
            <ActionMenu />
            {/* <div className="d-flex justify-content-around">
              <Form.Control
                type="text"
                as={FlatPickr}
                setDate={setStartDate}
                placeholderText="Select date"
                className="form-control-sm"
              />
              <p className="mx-2 pt-1 fst-italic"> to </p>
              <Form.Control
                type="text"
                as={FlatPickr}
                setDate={setEndDate}
                placeholderText="Select date"
                className="form-control-sm"
              />
            </div> */}
          </div>
        </div>
      </Card.Header>
      {/* chart  */}
      <Card.Body className="pb-0 pe-0">
        {isEPCN ? (
          <Row className="d-flex flex-column">
            <Col md={8}>
              {chartTraffic.series.length > 0 ? (
                <ApexCharts
                  options={chartTraffic?.options}
                  series={chartTraffic?.series}
                  type="donut"
                />
              ) : (
                <p className="fst-italic align-item-middle">
                  {" "}
                  No data to display
                </p>
              )}
            </Col>
            <Col className="d-flex justify-content-end w-100">
              <div className="d-flex">
                <StatRightCenterIcon
                  title={reject}
                  value="Submission Reject"
                  iconName={mdiCloseCircleOutline}
                  iconColorVariant="danger"
                  classValue="border px-2 w-100"
                  isDatabase={isDatabase}
                />
                <StatRightCenterIcon
                  title={approve}
                  value="Submission Approve"
                  iconName={mdiCheckCircleOutline}
                  iconColorVariant="success"
                  classValue="border px-2 w-100"
                  isDatabase={isDatabase}
                />
              </div>
            </Col>
          </Row>
        ) : (
          <Row className="d-flex flex-column">
            <Col md={8}>
              <ApexCharts
                options={TicketingTaskStatusChartOptions}
                series={TicketingTaskStatusChartSeries}
                type="donut"
              />
            </Col>
            <Col className="d-flex justify-content-end w-100">
              <div className="d-flex">
                <StatRightCenterIcon
                  title="23"
                  value="Submission Reject"
                  iconName={mdiCloseCircleOutline}
                  iconColorVariant="danger"
                  classValue="border px-2 w-100"
                  isDatabase={isDatabase}
                />
                <StatRightCenterIcon
                  title="23"
                  value="Submission Approve"
                  iconName={mdiCheckCircleOutline}
                  iconColorVariant="success"
                  classValue="border px-2 w-100"
                  isDatabase={isDatabase}
                />
              </div>
            </Col>
          </Row>
        )}
      </Card.Body>
    </Card>
  );
};
export default TaskCompletionStatusChart;
