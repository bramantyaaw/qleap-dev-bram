import React, { Fragment, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import CoomingList from "../../../../components/components/dashboard/projects/single/overview/CoomingList";
import { OverdueList } from "../../../../components/components/dashboard/projects/single/overview/OverdueList";
import TaskCompletionStatusChart from "../../../../components/components/dashboard/projects/single/task/TaskCompletionStatusChart";
import axios from "axios";
import NotifSuccessModal from "../../../../components/components/elements/modal/NotifSuccessModal";
import ErrorAlert from "../../../../components/components/dashboard/ticketing/elements/alerts/ErrorAlert";

export const Overview = ({ isDatabase, isEPCN }) => {
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [uid, setUid] = useState(localStorage.getItem("uid"));
  const [dataList, setDataList] = useState([]);

  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const cooming_list = dataList?.coming_list;
  const overdue_list = dataList?.overdue_list;

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchData = async () => {
    try {
      await axios
        .post(
          "/epcn/overview",
          {
            uid,
            date_start: startDate,
            date_end: endDate,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          if (res?.status === 200) {
            setDataList(res?.data?.data);
          } else if (res?.status === 429) {
            setErrorModal(true);
            setErrorMessage(
              "Too many request at one moment, please try again later.."
            );
          } else {
            setErrorModal(true);
            setErrorMessage(res?.data?.message);
          }
        });
    } catch (e) {
      return e;
    }
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
    setUid(localStorage.getItem("uid"));
  }, []);

  return (
    <Fragment>
      {errorModal && (
        <ErrorAlert
          setState={setErrorModal}
          text1={errorMessage}
          className="mb-4"
        />
      )}
      <Row>
        <Col xl={8} md={12} xs={12} className="mb-4">
          {/* task completion status chart  */}
          <TaskCompletionStatusChart
            isDatabase={isDatabase}
            isEPCN={isEPCN}
            data={dataList}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
        </Col>

        <Col xl={4} md={12} xs={12} className="mb-4">
          {/* task summary chart  */}
          <OverdueList data={overdue_list} />
        </Col>
      </Row>
      <Row>
        <Col xl={8} md={12} xs={12} className="mb-4">
          <CoomingList data={cooming_list} />
        </Col>
      </Row>
    </Fragment>
  );
};
