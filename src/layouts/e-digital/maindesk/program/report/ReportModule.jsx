import React, { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import StatLeftBGIcon from "../../../../../components/components/dashboard/common/stats/StatLeftBGIcon";
import {
  mdiClockTimeEightOutline,
  mdiAccountEyeOutline,
  mdiAccountGroupOutline,
} from "@mdi/js";
import axios from "axios";
import LoadingComponent from "../../../../../components/components/elements/loading/LoadingComponent";

export const ReportModule = (props) => {
  const { show, setShow, onHide, className, id } = props;
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [dataList, setDataList] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [warning, setWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  const fetchModule = async () => {
    try {
      setSpinner(true);
      await axios
        .post(
          "/euniv/get-report-module",
          {
            id: parseInt(id),
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          if (res?.status === 200) {
            setSpinner(false);
            setDataList(res?.data?.data);
          } else if (res?.status === 500) {
            setSpinner(false);
            setWarning(true);
            setWarningMessage(res?.data?.message);
          } else {
            setSpinner(false);
          }
        });
    } catch (e) {
      return e;
    }
  };

  useEffect(() => {
    fetchModule();
  }, []);

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
  }, [localStorage]);

  return (
    <Modal
      size="xl"
      show={show}
      onHide={onHide ? onHide : () => setShow(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title className={`text-darkest fw-bold ${className}`}>
          Report Module
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {spinner ? (
          <LoadingComponent />
        ) : (
          <Row>
            <Col lg={4} md={12} sm={12} className="mb-2">
              <StatLeftBGIcon
                title="Finish viewing the module"
                value={dataList?.finish_viewing_module}
                iconName={mdiAccountGroupOutline}
                iconColorVariant="primary"
                classValue="h-100"
                classText="fw-bold"
                euniv
              />
            </Col>
            <Col lg={4} md={12} sm={12} className="mb-2">
              <StatLeftBGIcon
                title="The most visited"
                value={dataList?.bu ? dataList?.bu : "-"}
                iconName={mdiAccountEyeOutline}
                iconColorVariant="warning"
                classValue="h-100"
                classText="fw-bold"
                euniv
                info="Based on business unit"
                summary={
                  dataList?.total_bu_visited ? dataList?.total_bu_visited : "-"
                }
                spanClassName="fs-6 text-muted"
              />
            </Col>
            <Col lg={4} md={12} sm={12} className="mb-2">
              <StatLeftBGIcon
                title="Average Time Access Module"
                value={dataList?.avg_time ? dataList?.avg_time : "-"}
                iconName={mdiClockTimeEightOutline}
                iconColorVariant="success"
                classValue="h-100"
                classText="fw-bold"
                euniv
              />
            </Col>
          </Row>
        )}

        <div className="d-flex justify-content-end mt-3">
          <Button
            variant="outline-primary"
            size="md"
            className="rounded-3"
            disabled
          >
            Export Exam Report
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
