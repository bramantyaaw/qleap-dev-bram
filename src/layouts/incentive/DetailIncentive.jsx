import React, { Fragment, useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import HelpCenterLayout from "../helpcenter/HelpCenterLayout";
import { CMSReuse } from "../../components/components/dashboard/cms/CMSReuse";
import SalesMonthly from "./details/SalesMonthly";
import SalesProductList from "./details/SalesProductList";
import FlatPickrRange from "../../components/components/dashboard/ticketing/elements/date/FlatPickrRange";
import SortByStatus from "../../components/components/dashboard/ticketing/elements/dropdown/SortByStatus";
import SelfServiceMenuHeader from "../header/SelfServiceMenuHeader";
import axios from "axios";

const Incentive = () => {
  const [selectedItem, setSelectedItem] = useState("");

  const [isMobile, setIsMobile] = useState(false);

  const [uid, setUid] = useState(localStorage.getItem("uid"));
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const start = firstDayOfMonth.toISOString().slice(0, 10);
  const end = today.toISOString().slice(0, 10);

  const [startDate, setStartDate] = useState(start);
  const [endDate, setEndDate] = useState(end);
  const [summary, setSummary] = useState({});
  const [detail, setDetail] = useState([]);
  const [incentive, setIncentive] = useState([]);
  const [brand, setBrand] = useState({});
  const [sumWeek, setSumWeek] = useState({});

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
          setDetail(data?.data?.data?.detil);
          setBrand(data?.data?.data?.brand);
          setIncentive(data?.data?.data?.incentive);
          setSumWeek(data?.data?.data?.sumWeek);
        });
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    handleGetIncentive();
  }, [startDate, endDate]);

  useEffect(() => {
    setUid(localStorage.getItem("uid"));
    setToken(localStorage.getItem("access_token"));
  }, [localStorage]);

  const incentives = sumWeek
    ? Object.values(sumWeek).map((week) => week.incentive)
    : [];
  const sales = sumWeek ? Object.values(sumWeek).map((week) => week.sales) : [];
  const week = sumWeek ? Object.values(sumWeek).map((week) => week.week) : [];

  const chartData = {
    series: [
      {
        name: "Incentives",
        data: incentives,
      },
      {
        name: "Sales",
        data: sales,
      },
    ],
    options: {
      xaxis: {
        categories: week,
        title: {
          text: "Week",
        },
      },
      yaxis: {
        title: {
          text: "Value",
        },
      },
    },
  };

  const options = {
    xaxis: {
      categories: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      title: {
        text: "Weekdays",
      },
    },
    yaxis: {
      title: {
        text: "Value",
      },
    },
    // other options
  };
  const mobileOptions = {
    xaxis: {
      categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
      title: {
        text: "Weekdays",
      },
    },
    yaxis: {
      title: {
        text: "Value",
      },
    },
    // other options
  };

  const series = [
    {
      name: "Daily Sales",
      data: [0, 0, 0, 0, 0, 0, 0],
    },
  ];

  const mobileSeries = [
    {
      name: "Weekly Sales",
      data: [80, 70, 30, 80],
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // adjust the breakpoint as needed
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <HelpCenterLayout>
      <div className="bg-wrapper">
        <Fragment>
          <SelfServiceMenuHeader
            title="Incentive"
            sub="Here is a list of incentive from your sales"
          />
          <div className="pt-5 pb-2 ">
            <Container>
              <div className="pb-2 mb-4 d-flex align-items-end justify-content-end w-100">
                <div className="d-flex ">
                  <FlatPickrRange
                    className="py-2 ps-3 pe-6 wc-250 "
                    top="10.3"
                    right="12"
                    setNewStartDate={setStartDate}
                    setNewEndDate={setEndDate}
                    placeholderText={`${start} - ${end}`}
                  />
                  <SortByStatus
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                    title="Filter by Brand"
                    dataArrSort={[
                      "All",
                      "Open",
                      "Revision",
                      "Edited",
                      "Process",
                      "Closed",
                    ]}
                    className="bg-white ms-3 wc-100"
                  />
                </div>
              </div>
              <CMSReuse data={summary} />
              <SalesMonthly
                isMobile={isMobile}
                // mobileOptions={mobileOptions}
                options={chartData.options}
                series={chartData.series}
                // mobileSeries={mobileSeries}
                // dailyData={dailyData}
                // weeklyData={weeklyData}
              />
              <SalesProductList
                className="my-4"
                data={detail}
                incentive={incentive}
              />
            </Container>
          </div>
        </Fragment>
      </div>
    </HelpCenterLayout>
  );
};

export default Incentive;
