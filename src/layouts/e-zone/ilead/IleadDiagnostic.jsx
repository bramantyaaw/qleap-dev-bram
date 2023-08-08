import React, { useEffect, useState } from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
// import { useMediaQuery } from "react-responsive";
import axios from "axios";
import IleadImg from "../../../assets/ezone/images/svg/ilead-img.svg";
import LeaderBoardCol from "./room/LeaderBoardCol";
import RightMenuDiagnostic from "./room/RightMenuDiagnostic";
// import LeaderBoardTable from "./room/LeaderBoardTable";
import DropdownRevision from "../../database-admin/ticket/elements/DropdownRevision";
import {
  arrFilterDropdown,
  arrColEmployee,
  arrColDivision,
} from "../../../data/ezone/DataILEADDiagnostic";
import LeaderBoardDivision from "./room/LeaderBoardDivision";
import LoadingComponent from "../../../components/components/elements/loading/LoadingComponent";

const IleadDiagnostic = ({
  token,
  uid,
  setModalLoading,
  setErrorModal,
  setErrorMessage,
  modalLoading,
}) => {
  const [arrIleadExam, setArrIleadExam] = useState([]);
  const [arrIsNotDoneYet, setArrIsNotDoneYet] = useState([]);

  const [filterSelected, setFilterSelected] = useState("By Employee");
  const [score, setScore] = useState([]);

  const [arrLeaderBoardEmployee, setArrLeaderBoardEmployee] = useState([]);
  const [arrLeaderBoardDiv, setArrLeaderBoardDiv] = useState([]);
  const [isStatus, setIsStatus] = useState("");

  const [loading, setLoading] = useState(false);

  const fetchFileDownload = async () => {
    try {
      setModalLoading(true);
      await axios
        .post(
          "/ezone/get-ilead-exam",
          {
            uid,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((data) => {
          setModalLoading(false);
          if (data?.status === 200) {
            const newData = data?.data?.data;

            let active = newData?.filter((data) => data?.isActive === "active");
            setArrIleadExam(active);

            let isDoneYet = newData?.filter((data) => data?.isDone === 0);
            setArrIsNotDoneYet(isDoneYet);
          } else {
            setErrorModal(true);
            setErrorMessage(data?.data?.message);
          }
        });
    } catch (err) {
      return err;
    }
  };

  const fetchEmployeeScore = () => {
    try {
      axios
        .post(
          "/ezone/get-ilead-score",
          {
            uid,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((data) => {
          if (data?.status === 200) {
            setScore(data?.data?.data);
          }
        });
    } catch (err) {
      return err;
    }
  };

  const fetchEmployeeLeaderBoard = () => {
    try {
      setLoading(true);
      axios
        .get(
          "/ezone/get-ilead-leaderboard",

          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((data) => {
          setLoading(false);
          if (data?.status === 200) {
            const newData = data?.data?.data;
            setArrLeaderBoardEmployee(newData?.employee);
            setArrLeaderBoardDiv(newData?.division);
          }
        });
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    fetchFileDownload();
    fetchEmployeeScore();
    fetchEmployeeLeaderBoard();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    arrIleadExam?.map((data) => {
      if (data?.isActive === "active" && data?.retries <= 3) {
        return setIsStatus("on going");
      } else if (data?.isActive === "active" && data?.retries > 3) {
        return setIsStatus("done");
      } else if (data?.isActive === "inactive") {
        return setIsStatus("coming soon");
      } else {
        return setIsStatus("coming soon");
      }
    });
  }, [arrIleadExam]);

  return (
    <>
      <Card className="p-0">
        <Card.Body className="pt-0 pe-2 ps-0 pb-0">
          {modalLoading ? (
            <LoadingComponent className="my-4" />
          ) : (
            <Row className="align-items-end">
              <Col lg={4} md={12} className={`h-100 align-items-center`}>
                <div className={`d-flex h-100`}>
                  <div className="d-flex align-items-end">
                    <Image src={IleadImg} height={100} />
                  </div>
                  <div className="d-flex flex-column justify-content-align mb-0 mb-md-4 ms-5 mt-3 mt-md-0">
                    <p
                      className="mb-0 h6 text-kinda-dark"
                      style={{ fontWeight: "600" }}
                    >
                      Your Score :
                    </p>
                    {score?.map((data, id) => {
                      return (
                        <div
                          className="d-flex flex-column align-items-start justify-content-start"
                          key={id}
                        >
                          <h1
                            className={`mb-0 ${
                              data?.score >= 90
                                ? "text-dark-success"
                                : data?.score >= 80 && data?.score < 90
                                ? "text-warning"
                                : "text-danger"
                            }`}
                            style={{ fontWeight: "700" }}
                          >
                            {data?.score}
                            <span className="h4 ms-1 text-secondary">
                              {data?.score < 2 ? "Point" : "Points"}
                            </span>
                          </h1>
                          {data?.score >= 90 ? (
                            <p
                              className="text-dark-success mb-0"
                              style={{ fontWeight: "500" }}
                            >
                              (EXCELLENT)
                            </p>
                          ) : data?.score >= 80 && data?.score < 90 ? (
                            <p
                              className="text-warning mb-0"
                              style={{ fontWeight: "500" }}
                            >
                              (GOOD)
                            </p>
                          ) : (
                            <p
                              className="text-danger mb-0"
                              style={{ fontWeight: "500" }}
                            >
                              (NEED TO IMPROVE)
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Col>
              <Col lg={8} md={12} className="px-4 py-3 border-start ">
                <RightMenuDiagnostic
                  isStatus={isStatus}
                  arrIleadExam={arrIleadExam}
                  modalLoading={modalLoading}
                  arrIsNotDoneYet={arrIsNotDoneYet}
                />
              </Col>
            </Row>
          )}
        </Card.Body>
      </Card>
      <Card className="p-0 mt-3 pb-2">
        <Card.Body>
          <div className="d-flex justify-content-center justify-content-sm-end mb-3 mb-sm-0 ">
            <DropdownRevision
              setSelected={setFilterSelected}
              data={arrFilterDropdown}
              className="wrapper-div py-0"
              defaultValue={filterSelected}
              style={{ width: "20%" }}
            />
          </div>
          <h3 style={{ fontWeight: "800" }} className="text-center mb-5">
            LEADERBOARD ILEAD DIAGNOSTIC
          </h3>
          {filterSelected === "By Division" ? (
            <LeaderBoardDivision
              arrDummy={arrLeaderBoardDiv}
              arrColumn={arrColDivision}
              length={5}
              loading={loading}
            />
          ) : (
            <LeaderBoardCol
              arrDummy={arrLeaderBoardEmployee}
              arrColumn={arrColEmployee}
              length={5}
              loading={loading}
            />
          )}

          {/* <LeaderBoardTable arrDummy={arrDummy} /> */}
        </Card.Body>
      </Card>
    </>
  );
};

export default IleadDiagnostic;
