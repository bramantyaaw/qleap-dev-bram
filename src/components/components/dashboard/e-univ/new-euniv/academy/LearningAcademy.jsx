import React, { Fragment, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  ProgressBar,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import MainNavbar from "../../../../../../layouts/navbars/MainNavbar";
// import Illustration from "../../../../../../assets/images/icon/pana.svg";
import Illustration from "../../../../../../assets/images/svg/LearningJourney.svg";

import BootstrapCoursesData from "../../../../../../data/learningjourney/BootstrapCoursesData";
import CourseCard from "../card/CourseCard";
import { ModuleCard } from "../card/ModuleCard";
import axios from "axios";

import LoadingComponent from "../../../../elements/loading/LoadingComponent";
import { IdleCard } from "../card/IdleCard";
import EUnivLayout from "../../../../../../layouts/navbars/EUnivLayout";
import ErrorAlert from "../../../ticketing/elements/alerts/ErrorAlert";

export const LearningAcademy = () => {
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [uid, setUid] = useState(localStorage.getItem("uid"));
  const [dataList, setDataList] = useState([]);
  const [lastProgramId, setLastProgramId] = useState("");
  const [lastProgram, setLastProgram] = useState([]);
  const [modalLoading, setModalLoading] = useState(false);
  const [warning, setWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  const [elapsedTime, setElapsedTime] = useState(0);

  const fetchLastProgram = async () => {
    try {
      await axios
        .post(
          "/euniv/get-last-access-program",
          {
            uid,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          if (res?.status === 200) {
            setLastProgram(res?.data?.data[0]);
          }
        });
    } catch (e) {
      return e;
    }
  };

  const fetchData = async () => {
    try {
      setModalLoading(true);
      await axios
        .post(
          "/euniv/get-program-matrix",
          {
            uid,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          if (res?.status === 200) {
            // const sortedDataList = res?.data?.data.sort((a, b) => {
            //   if (a.syllabus_end_date === null) return 1; // Move 'null' values to the end
            //   if (b.syllabus_end_date === null) return -1; // Move 'null' values to the end

            //   const dateA = new Date(a.syllabus_end_date);
            //   const dateB = new Date(b.syllabus_end_date);
            //   const currentDate = new Date();

            //   const diffA = Math.abs(dateA - currentDate);
            //   const diffB = Math.abs(dateB - currentDate);

            //   if (diffA === diffB) {
            //     const endDateA = new Date(a.end_date);
            //     const endDateB = new Date(b.end_date);
            //     return endDateA - endDateB; // Compare the end_date values if the differences are the same
            //   }

            //   return diffA - diffB;
            // });
            // setDataList(sortedDataList);
            setDataList(res?.data?.data);
            setModalLoading(false);
          } else if (res?.status === 500) {
            setWarning(true);
            setModalLoading(false);
            return setWarningMessage(res?.data?.message);
          } else if (res?.status === 429) {
            setWarning(true);
            setModalLoading(false);
            return setWarningMessage(
              "Too many request at one moment, please try again later.."
            );
          } else {
            setModalLoading(false);
          }
        });
    } catch (e) {
      return e;
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const groupedData = dataList?.reduce((acc, item) => {
    if (!acc[item.category_name]) {
      acc[item.category_name] = [];
    }
    acc[item.category_name].push(item);
    return acc;
  }, {});

  const CategorySection = ({ categoryName, items, index }) => (
    <section className={`py-9 ${index % 2 === 0 ? "bg-body" : "bg-white"}`}>
      <div className="px-10">
        <Row>
          <Col lg={12} className="d-flex justify-content-between">
            <div className="mb-5">
              <h2 className="mb-1">
                {capitalizeFirstLetter(categoryName)} Learning
              </h2>
              <p>
                Online video courses with new additions published every month.
              </p>
            </div>
            <div>
              <Link
                className="btn btn-light-primary btn-sm text-primary rounded-3"
                to={`/e-univ/learning/${categoryName}`}
                state={items}
              >
                Show more program
              </Link>
            </div>
          </Col>
        </Row>
        <Row>
          {items?.slice(0, 4).map((item, index) => (
            <Col lg={3} md={6} sm={12} key={index} className="mb-4">
              <CourseCard item={item} />
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );

  useEffect(() => {
    fetchData();
    fetchLastProgram();
  }, []);

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
    setUid(localStorage.getItem("uid"));
  }, [localStorage]);

  return (
    <Fragment>
      <EUnivLayout>
        <section className="pt-9 pb-9 bg-white ">
          <Container>
            <Row>
              <Col md={12} sm={12}>
                <div className="mb-5 d-flex justify-content-between">
                  <h3 className=" fw-bold">
                    Here's{" "}
                    <span className="text-primary">your last learning</span>
                  </h3>
                </div>
              </Col>
            </Row>
            {lastProgram ? <ModuleCard data={lastProgram} /> : <IdleCard />}
          </Container>
        </section>

        {groupedData && Object.entries(groupedData).length > 0 ? (
          Object.entries(groupedData).map(([categoryName, items], index) => (
            <CategorySection
              key={categoryName}
              categoryName={categoryName}
              items={items}
              index={index}
            />
          ))
        ) : modalLoading ? (
          <LoadingComponent className="mt-3" />
        ) : warning ? (
          <ErrorAlert setState={setWarning} text1={warningMessage} />
        ) : (
          <div className="bg-body py-10 text-center">
            No available programs yet.
          </div>
        )}
        <section
          className={`py-9 ${
            groupedData && groupedData.length % 2 === 0 ? "bg-body" : "bg-white"
          }`}
        >
          <Container>
            <div className="bg-primary mx-4 rounded-5">
              <div className="col-auto flex-md-row flex-column d-flex justify-content-between px-6">
                <div className=" py-5">
                  <h2 className="display-5 text-white mb-0">
                    Let’s find your Learning Journey{" "}
                  </h2>
                  <div className="d-flex mt-3 justify-content-between align-items-center">
                    <p className="text-white text-wrap mb-0">
                      Saat ini kamu bisa mengakses Learning Journey dengan
                      menekan button dibawah ini
                    </p>
                  </div>
                  <div className="mt-5">
                    <Link
                      className="btn btn-dark btn-sm text-white rounded-3"
                      to="https://qleap.erajaya.com/qleapci/courses/courses/learningjourney"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Go to Learning Journey{" "}
                    </Link>
                  </div>
                </div>
                <Image
                  src={Illustration}
                  className="col-auto align-self-center p-0 "
                  width={250}
                  height={200}
                />
              </div>
            </div>
          </Container>
        </section>
      </EUnivLayout>
    </Fragment>
  );
};
