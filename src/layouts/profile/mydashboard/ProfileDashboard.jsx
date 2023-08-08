import { Row, Col, Card } from "react-bootstrap";
import { ProfileLayout } from "../ProfileLayout";
import { Fragment, useEffect, useState } from "react";
import IncentiveCard from "../../../components/components/dashboard/projects/single/budget/IncentiveCard";
import AttendanceCard from "../../../components/components/dashboard/projects/single/budget/AttendanceCard";
import ProgressCard from "../../../components/components/dashboard/projects/single/budget/ProgressCard";
import PerformanceCard from "../../../components/components/dashboard/projects/single/budget/PerformanceCard";
import AssessmentTable from "../../../components/components/dashboard/projects/single/overview/AssessmentTable";
import MainLayout from "../../home/MainLayout";
import { attendanceAction } from "../../../redux/action/profileAction";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Achievment from "../../../components/components/dashboard/projects/single/overview/Achievment";

export const ProfileDashboard = () => {
  const dispatch = useDispatch();

  const { attendanceData } = useSelector((state) => state.profileReducer);
  const dataAttendance = attendanceData?.data?.data?.detail;
  const detailAttendance = attendanceData?.data?.data;
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [uid, setUid] = useState(localStorage.getItem("uid"));
  const [bu, setBu] = useState(localStorage.getItem("bu"));

  const [month] = useState(
    new Date().toLocaleString("en-US", { month: "2-digit" })
  );
  const [currYear] = useState(new Date().getFullYear());
  const year = currYear.toString();

  const [performance, setPerformance] = useState();
  const [achievment, setAchievment] = useState([]);
  const [learning, setLearning] = useState();

  const fetchDataList = async () => {
    try {
      await axios
        .post(
          "profile/get-performance",
          {
            uid,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )

        .then((res) => setPerformance(res?.data?.data));
    } catch (e) {
      return e;
    }
  };

  const fetchDataAchievment = async () => {
    try {
      await axios
        .post(
          "/profile/get-employee-award",
          {
            uid,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => setAchievment(res?.data?.data));
    } catch (e) {
      return e;
    }
  };

  const fetchDataLearning = async () => {
    try {
      await axios
        .post(
          "/profile/get-journey",
          {
            uid,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )

        .then((res) => setLearning(res?.data?.data));
    } catch (e) {
      return e;
    }
  };

  useEffect(() => {
    fetchDataList();
    fetchDataAchievment();
    fetchDataLearning();
  }, []);

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
    setUid(localStorage.getItem("uid"));
    setBu(localStorage.getItem("bu"));
    dispatch(attendanceAction(token, uid, month, year));
  }, [month, year]);

  return (
    <MainLayout>
      <ProfileLayout>
        <Fragment>
          <Card className="mb-4">
            <Card.Body>
              <div className="mb-2 mb-lg-0">
                <h3 className="mb-0 card-title">Main Dashboard</h3>
                <p className="mb-0">Here is your summary</p>
              </div>
            </Card.Body>
          </Card>
          {bu === "Commercial" && <IncentiveCard />}
          <AttendanceCard
            data={dataAttendance}
            month={month}
            year={year}
            absen={detailAttendance}
          />
          <ProgressCard data={learning} />
          <Row className="mb-4">
            <Col xl={6} xs={12} className="mb-4 mb-xl-0">
              <Achievment data={achievment} />
            </Col>
            <Col xl={6} xs={12}>
              <AssessmentTable />
            </Col>
          </Row>
          <PerformanceCard
            data={performance}
            title="Performance"
            desc="Here is the last score based on Performance Appraisal Employee"
          />
        </Fragment>
      </ProfileLayout>
    </MainLayout>
  );
};
