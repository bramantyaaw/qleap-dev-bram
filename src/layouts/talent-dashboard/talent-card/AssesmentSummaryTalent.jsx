import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import Icon from "@mdi/react";
import {
  mdiCalendarRange as iconAssesmentDate,
  mdiBriefcaseOutline as levelIcon,
  mdiHeadLightbulbOutline as IntelligenceIcon,
  mdiAccountOutline as dicsIcon,
  mdiBookEducationOutline as assesmentIcon,
  mdiArrowUp as needIcon,
} from "@mdi/js";
import ListAssesmentSummary from "../../../components/components/marketing/talent-dashboard/ListAssesmentSummary";
import ApexCharts from "../../../components/components/elements/charts/ApexCharts";
import {
  BudgetExpenseChartOptions,
  BudgetExpenseChartSeries,
} from "../../../data/charts/ChartData";

const AssesmentSummaryTalent = ({ selectedUid, data }) => {
  // const [checkerFilterColor, setCheckerFilterColor] = useState(null);

  // const dataArr = [3, 3, 2, 1, 3, 2, 1, 3, 2];
  // const BudgetExpenseChartSeries = [
  //   { name: "Chart Point", data: dataArr },
  //   // {
  //   //   name: "Series 2",
  //   //   data: [0, 0, 0, 0, 0, 0, 0, 0],
  //   // },
  // ];
  // const filterColor = () => {
  //   const data = dataArr?.forEach((data) => {
  //     switch (data) {
  //       case 1:
  //         return "#e53f3c";
  //       case 2:
  //         return "#e5e23c";
  //       case 3:
  //         return "#3ce55b";
  //       default:
  //         return "#3c96e5";
  //     }
  //   });
  //   setCheckerFilterColor(data);
  // };

  // const BudgetExpenseChartOptions = {
  //   dataLabels: {
  //     enabled: true,
  //     background: {
  //       enabled: true,
  //       borderRadius: 2,
  //       backgroundColor: "#d42c26",
  //     },
  //     style: {
  //       fontSize: "12px",
  //       fontWeight: "bold",
  //       colors: ["#3c96e5"],
  //     },
  //     event: {
  //       click: (e) => console.log({ e }),
  //     },
  //   },
  //   chart: { height: 350, type: "radar", toolbar: { show: false } },
  //   colors: ["#162674"],

  //   plotOptions: {
  //     radar: {
  //       size: 150,
  //       offsetX: 0,
  //       offsetY: 0,
  //       polygons: {
  //         strokeColors: "#e0e6ed",
  //         strokeWidth: 1,
  //         connectorColors: "#e0e6ed",
  //         fill: {
  //           colors: ["#fff", "#fff"],
  //         },
  //       },
  //     },
  //   },
  //   fill: {
  //     colors: "#2642CA",
  //     opacity: 0.3,
  //   },
  //   xaxis: {
  //     max: 6,
  //     categories: ["QO", "AO", "DO", "LO", "CA", "ST", "SL", "RP", "TS"],
  //     labels: {
  //       show: true,
  //       style: {
  //         colors: "#a8a3b9",
  //         fontSize: "14px",
  //         fontFamily: "Inter",
  //         fontWeight: 600,
  //       },
  //     },
  //   },
  //   yaxis: {
  //     show: true,
  //     showAlways: true,
  //     showForNullSeries: true,
  //     seriesName: undefined,
  //     opposite: false,
  //     reversed: false,
  //     logarithmic: false,
  //     logBase: 10,
  //     tickAmount: 3,
  //     min: 0,
  //     max: 3,
  //     forceNiceScale: false,
  //     floating: false,
  //     decimalsInFloat: undefined,
  //   },

  //   responsive: [
  //     {
  //       breakpoint: 480,
  //       options: {
  //         chart: {
  //           height: 400,
  //         },
  //       },
  //     },
  //     {
  //       breakpoint: 5000,
  //       options: {
  //         chart: {
  //           height: 350,
  //         },
  //       },
  //     },
  //   ],
  // };

  // useEffect(() => {
  //   filterColor();
  // }, [, BudgetExpenseChartOptions]);

  const chartData = {
    series: [
      // { name: "Chart Point", data: dataArr },
      {
        name: "Chart Point",
        data: data?.assessment_chart?.map((item) => Number(item.point)),
      },
    ],
    options: {
      dataLabels: {
        enabled: true,
        background: {
          enabled: true,
          borderRadius: 2,
          backgroundColor: "#d42c26",
        },
        style: {
          fontSize: "12px",
          fontWeight: "bold",
          colors: ["#2642CA"],
        },
      },
      chart: { height: 350, type: "radar", toolbar: { show: false } },
      colors: ["#162674"],
      plotOptions: {
        radar: {
          size: 150,
          offsetX: 0,
          offsetY: 0,
          polygons: {
            strokeColors: "#e0e6ed",
            strokeWidth: 1,
            connectorColors: "#e0e6ed",
            fill: {
              colors: ["#fff", "#fff"],
            },
          },
        },
      },
      fill: {
        colors: "#2642CA",
        opacity: 0.3,
      },
      xaxis: {
        max: 6,
        categories: data?.assessment_chart?.map((item) => item.code),
        labels: {
          show: true,
          style: {
            colors: "#a8a3b9",
            fontSize: "14px",
            fontFamily: "Inter",
            fontWeight: 600,
          },
        },
      },
      yaxis: {
        show: true,
        showAlways: true,
        showForNullSeries: true,
        seriesName: undefined,
        opposite: false,
        reversed: false,
        logarithmic: false,
        logBase: 10,
        tickAmount: 3,
        min: 0,
        max: 3,
        forceNiceScale: false,
        floating: false,
        decimalsInFloat: undefined,
      },

      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              height: 400,
            },
          },
        },
        {
          breakpoint: 5000,
          options: {
            chart: {
              height: 350,
            },
          },
        },
      ],
    },
  };

  return (
    <Card className="mb-3 border-0 h-100">
      <Card.Header className="border-bottom px-3 py-3">
        <h4 className="mb-0 fw-bold">Assessment Chart</h4>
        <p className="h6 text-gray-700">Chart Point</p>
      </Card.Header>
      <Card.Body className="d-flex flex-column justify-content-around p-0">
        <div className="w-100  ">
          <ApexCharts
            options={data ? chartData.options : BudgetExpenseChartOptions}
            series={data ? chartData.series : BudgetExpenseChartSeries}
            type="radar"
            width="100%"
            height="300"
          />
        </div>
        <div>
          <div className="border-bottom px-0 w-100 pb-2">
            <p className="mb-0 text-gray-700 h6 ms-4">Summary Information</p>
          </div>
          <div className="py-3-5 border-bottom px-0 w-100">
            <ListAssesmentSummary
              source={iconAssesmentDate}
              title="Assessment date"
              desc={data ? data?.date : "-"}
            />
          </div>
          <div className="py-3-5 border-bottom px-0 w-100">
            <ListAssesmentSummary
              source={levelIcon}
              title="Level assessment"
              desc={data ? data?.level : "-"}
            />
          </div>
          <div className="py-3-5 px-0 w-100">
            <ListAssesmentSummary
              source={dicsIcon}
              title="DISC"
              desc={data ? data?.disc : "-"}
            />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default AssesmentSummaryTalent;
