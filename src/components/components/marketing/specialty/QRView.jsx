import React, { useEffect, useState } from "react";
import axios from "axios";
import ProcessFlow from "../common/process/ProcessFlow";
import ProcessLoadingModal from "../../elements/modal/ProcessLoadingModal";
import TicketingFlow from "../common/process/TicketingFlow";

const QRView = ({ search }) => {
  let splitSearch = search?.split("?data=");
  let searchData = splitSearch ? splitSearch[1] : "";

  const [duration, setDuration] = useState(0);
  const [trackingType, setTrackingType] = useState("");
  const [employeeData, setEmployeeData] = useState({});
  const [progressData, setProgressData] = useState([]);

  const [arrRejected, setRejected] = useState([]);
  const [arrApproved, setApproved] = useState([]);

  const [modalLoading, setModalLoading] = useState(false);

  const fetchTrackingApproval = async () => {
    try {
      setModalLoading(true);
      await axios
        .post("/tracking-approval", {
          encrypt_data: searchData,
        })
        .then((data) => {
          setModalLoading(false);
          if (data?.status === 200) {
            const newData = data?.data?.data;

            setDuration(newData?.duration);
            setTrackingType(newData?.type);
            setEmployeeData(newData?.employee_data);
            setProgressData(newData?.progress_data);

            const arrRejected = newData?.progress_data?.filter(
              (data) => data?.result === "rejected"
            );
            const arrApproved = newData?.progress_data?.filter(
              (data) => data?.result === "approved"
            );
            setRejected(arrRejected);
            setApproved(arrApproved);
          }
        });
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    fetchTrackingApproval();
  }, []);

  const progressDataDummy = [
    {
      result: "open",
      created_date: "08/12/2022, 14:30",
    },
    {
      result: "process",
      created_date: "08/12/2022, 14:30",
    },
    {
      result: "revision",
      created_date: "08/12/2022, 14:30",
    },
    {
      result: "Solved",
    },
  ];

  return (
    <>
      <ProcessFlow
        duration={duration}
        trackingType={trackingType}
        employeeData={employeeData}
        progressData={progressData}
        arrApproved={arrApproved}
        arrRejected={arrRejected}
        link="/"
      />
      {/* <TicketingFlow progressData={progressDataDummy} link="/" /> */}
      {modalLoading && (
        <ProcessLoadingModal show={modalLoading} setShow={setModalLoading} />
      )}
    </>
  );
};

export default QRView;
