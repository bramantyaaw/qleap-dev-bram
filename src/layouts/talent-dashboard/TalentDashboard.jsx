import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Nav, Tab } from "react-bootstrap";
import EdigitalLayout from "../home/EDigitalLayout";
import TalentProfile from "./talent-card/TalentProfile";
import PerformanceCard from "../../components/components/dashboard/projects/single/budget/PerformanceCard";
import AssesementResultTalent from "./talent-card/AssesmentResultTalent";
import AssesmentSummaryTalent from "./talent-card/AssesmentSummaryTalent";
import AchievementList from "./talent-card/AchievementList";
import ProcessLoadingModal from "../../components/components/elements/modal/ProcessLoadingModal";
import ErrorAlert from "../../components/components/dashboard/ticketing/elements/alerts/ErrorAlert";
import ExperiencesList from "./talent-card/ExperiencesList";
import OrganizationTree from "./org-tree/OrganizationTree";
import { AssessmentData } from "../../data/talentdashboard/AssessmentData";
import StrengthWeakness from "./talent-card/StrengthWeakness";
const TalentDashboard = () => {
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [uid, setUid] = useState(localStorage.getItem("uid"));
  const [performance, setPerformance] = useState();
  const [modalLoading, setModalLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [selectedUid, setSelectedUid] = useState("");
  const [arrEmployee, setArrEmployee] = useState([]);

  const [arrGeneralData, setGeneralData] = useState([]);
  const [arrOutsiteEra, setArrOutsiteEra] = useState([]);
  const [arrInsideEra, setArrInsideEra] = useState([]);
  const [arrPerformances, setArrPerformances] = useState([]);
  const [arrEmployeeAwards, setArrEmployeeAwards] = useState([]);
  const [arrEmployeeTraining, setArrEmployeeTraining] = useState([]);
  const [arrEmployeePromotion, setArrEmployeePromotion] = useState([]);
  const [arrAssessment, setArrAssessment] = useState({});
  const [arrSW, setArrSW] = useState([]);
  const [arrFilterSKType, setArrFilterSKType] = useState([]);
  const [selectedFilterSKType, setSelectedFilterSKType] = useState("");
  const [hasMutationFilter, setHasMutationFilter] = useState([]);
  const [fetchOnClickData, setFetchOnClickData] = useState("");

  const [warning, setWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [isClickTree, setIsClickTree] = useState(false);

  const assessment = AssessmentData.find((data) => data.uid === selectedUid);
  const assesmentData = assessment ? assessment : null;

  const fetchDataEmployee = async () => {
    try {
      await axios
        .get(
          // `/talent-dashboard/search-employee?search=${search}&uid=${uid}`,
          // `/master/search-employee?search=${search}&type_search=td&uid=${uid}`,
          `/master/search-employee?search=${search}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          setIsClickTree(false);
          setFetchOnClickData("");
          const newData = res?.data?.data;

          const objData = newData?.map((data) => {
            return {
              value: data?.uid,
              label: `${data?.name} (${data?.nik})`,
            };
          });

          setArrEmployee(objData);
        });
    } catch (e) {
      return e;
    }
  };

  const fetchDetailEmployee = async () => {
    let newUid = isClickTree ? fetchOnClickData : selectedUid;
    try {
      setModalLoading(true);
      await axios
        .post(
          "/talent-dashboard/get-data",
          {
            uid: newUid,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          setModalLoading(false);
          if (res?.status === 200) {
            const newData = res?.data?.data;
            setGeneralData(newData?.employee_general_data);
            setArrOutsiteEra(newData?.employee_work_exp_external);
            setArrInsideEra(newData?.employee_work_exp_internal);
            setArrPerformances(newData?.employee_performance_record);
            setArrEmployeePromotion(newData?.employee_promotion);

            let award = newData?.employee_award;
            let filterWithoutReward = award?.filter(
              (data) => data?.award_name !== "Reward Trip"
            );
            setArrEmployeeAwards(filterWithoutReward);
            setArrEmployeeTraining(newData?.employee_trainning);

            // sk-type
            const uniqueSkTypes = [
              ...new Set(
                newData?.employee_work_exp_internal?.map(
                  (item) => item?.sk_type
                )
              ),
            ];
            const newArrFilter = uniqueSkTypes?.map((data) => {
              let obj = {
                name: data,
                id: data,
              };
              return obj;
            });
            let objAll = {
              name: "All",
              id: "All",
            };
            newData?.employee_work_exp_internal?.length > 0 &&
              newArrFilter?.push(objAll);
            const sortSKType = newArrFilter?.sort((a, b) =>
              a?.name?.localeCompare(b?.name)
            );
            const mutationType = newArrFilter?.filter(
              (data) => data?.id === "Mutation"
            );
            setHasMutationFilter(mutationType);
            setArrFilterSKType(sortSKType);
          } else if (res?.status === 500) {
            setModalLoading(false);
            setWarning(true);
            return setWarningMessage(res?.data?.message);
          }
        });
    } catch (e) {
      setModalLoading(false);
    }
  };
  const fetchDataList = async () => {
    let newUid = isClickTree ? fetchOnClickData : selectedUid;
    try {
      await axios
        .post(
          "/profile/get-performance",
          {
            uid: newUid,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )

        .then((res) => {
          if (res?.status === 200) {
            setPerformance(res?.data?.data);
          }
        });
    } catch (e) {
      return e;
    }
  };

  const fetchDataAssessment = async () => {
    let newUid = isClickTree ? fetchOnClickData : selectedUid;
    try {
      await axios
        .post(
          "/talent-dashboard/get-assessment",
          {
            uid: newUid,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )

        .then((res) => {
          if (res?.status === 200) {
            setArrAssessment(res?.data?.data);
            setArrSW(res?.data?.data_disc);
          }
        });
    } catch (e) {
      return e;
    }
  };

  useEffect(() => {
    fetchDataEmployee();
    // eslint-disable-next-line
  }, [search]);

  useEffect(() => {
    fetchDetailEmployee();
    fetchDataAssessment();
    fetchDataList();
    // eslint-disable-next-line
  }, [selectedUid, fetchOnClickData, isClickTree]);

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
    setUid(localStorage.getItem("uid"));
    // eslint-disable-next-line
  }, [localStorage]);

  useEffect(() => {
    hasMutationFilter?.length > 0 && setSelectedFilterSKType("Mutation");
  }, [hasMutationFilter]);

  const arrDataTable = [
    {
      talent: "Talent Confirmation",
      review: "Star Talent",
      isPass: true,
    },
    {
      talent: "Performance Appraisal",
      review: "AA+",
      isPass: true,
    },
    {
      talent: "Assesment Result",
      review: "Fit",
      isPass: true,
    },
    {
      talent: "History Development",
      review: "Technology Lifestyle",
      isPass: true,
    },
    {
      talent: "Has Successor",
      review: "No",
      isPass: false,
    },
    {
      talent: "Educational Background",
      review: "S1",
      isPass: true,
    },
  ];

  return (
    <EdigitalLayout className="p-lg-4 p-2">
      <Fragment>
        <Row>
          <Col lg={12} md={12} sm={12}>
            <div className="border-bottom pb-4 mb-4 d-flex align-items-center justify-content-between">
              <div className="mb-3 mb-md-0">
                <h1 className="mb-1 h2 fw-bold">Talent Dashboard</h1>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="d-flex flex-column flex-xl-row">
          {warning && (
            <div className="px-3">
              <ErrorAlert setState={setWarning} text1={warningMessage} />
            </div>
          )}
          <div className="w-100 w-xl-25 ">
            <TalentProfile
              arrEmployee={arrEmployee}
              setSearch={setSearch}
              setSelectedUid={setSelectedUid}
              selectedUid={selectedUid}
              arrGeneralData={arrGeneralData}
              search={search}
            />
          </div>
          <div className="w-100 w-xl-75">
            <Tab.Container defaultActiveKey="Details Data">
              <Nav className="nav-lb-tab">
                <Nav.Item>
                  <Nav.Link eventKey="Details Data" className="mb-sm-3 mb-md-0">
                    Details Data
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="Organization Tree"
                    className="mb-sm-3 mb-md-0"
                  >
                    Organization Tree
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content>
                <Tab.Pane eventKey="Details Data" className="pt-4">
                  <div>
                    <PerformanceCard
                      isSummary
                      title="Summary Result"
                      desc="Here is a summary of these talent"
                      classNameHeader="bg-light-primary rounded-top"
                      classNameTitle="text-dark-primary"
                      classNameDesc="text-primary"
                      arrData={arrDataTable}
                    />
                  </div>
                  <ExperiencesList
                    arrInsideEra={arrInsideEra}
                    arrOutsiteEra={arrOutsiteEra}
                    arrEmployeePromotion={arrEmployeePromotion}
                    selectedUid={selectedUid}
                    arrFilterSKType={arrFilterSKType}
                    setSelectedFilterSKType={setSelectedFilterSKType}
                    selectedFilterSKType={selectedFilterSKType}
                    hasMutationFilter={hasMutationFilter}
                  />
                  <div className="mt-2">
                    <PerformanceCard
                      data={performance}
                      isTalent={true}
                      arrPerformances={arrPerformances}
                      selectedUid={selectedUid}
                      title="Performance"
                      desc="Here is the last score based on Performance Appraisal Employee"
                    />
                  </div>
                  <AchievementList
                    arrEmployeeAwards={arrEmployeeAwards}
                    arrEmployeeTraining={arrEmployeeTraining}
                    selectedUid={selectedUid}
                  />
                  {arrSW?.length > 0 ? (
                    arrSW?.map((data, id) => {
                      return (
                        <div key={id}>
                          <StrengthWeakness
                            strength1={data?.strength1}
                            strength2={data?.strength2}
                            strength3={data?.strength3}
                            strength4={data?.strength4}
                            strength5={data?.strength5}
                            needImprove1={data?.needImprove1}
                            needImprove2={data?.needImprove2}
                            needImprove3={data?.needImprove3}
                            needImprove4={data?.needImprove4}
                            needImprove5={data?.needImprove5}
                          />
                        </div>
                      );
                    })
                  ) : (
                    <StrengthWeakness isNull />
                  )}

                  <div className="w-100 d-flex hc-fit flex-column flex-lg-row mb-4">
                    <div className="w-100 w-lg-50 me-lg-2">
                      <AssesmentSummaryTalent
                        selectedUid={selectedUid}
                        data={assesmentData}
                      />
                    </div>
                    <div className="w-100 w-lg-50 ms-lg-3">
                      <AssesementResultTalent
                        selectedUid={selectedUid}
                        data={assesmentData}
                        isTalentDashboard={true}
                      />
                    </div>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="Organization Tree" className="pt-4">
                  <OrganizationTree
                    selectedUid={selectedUid}
                    arrGeneralData={arrGeneralData}
                    setFetchOnClickData={setFetchOnClickData}
                    setIsClickTree={setIsClickTree}
                    isClickTree={isClickTree}
                    fetchOnClickData={fetchOnClickData}
                  />
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </div>
        </Row>
      </Fragment>
      {modalLoading && (
        <ProcessLoadingModal show={modalLoading} setShow={setModalLoading} />
      )}
    </EdigitalLayout>
  );
};

export default TalentDashboard;
