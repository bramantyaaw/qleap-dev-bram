// import node module libraries

import { Row, Col, Card } from "react-bootstrap";

// import custom components
import StatRightCenterIcon from "../../../common/stats/StatRightCenterIcon";
import TableSummaryResult from "../../../../../../layouts/talent-dashboard/talent-card/TableSummaryResult";
import Icon from "@mdi/react";
import { mdiCardAccountDetailsOutline as talentIcon } from "@mdi/js";

const PerformanceCard = ({
  data,
  isTalent,
  arrPerformances,
  selectedUid,
  isSummary,
  title,
  desc,
  classNameHeader,
  classNameTitle,
  classNameDesc,
  arrData,
  classValue,
}) => {
  const arrDummy = [
    {
      title: "-",
    },
    {
      title: "-",
    },
  ];

  let sortArrPerform = arrPerformances?.sort((a, b) => {
    let split = a?.pap_program?.split(" ");
    let thirdElement = split ? split?.slice(-1)[0] : "0";
    let int = parseInt(thirdElement);

    let splitB = b?.pap_program?.split(" ");
    let thirdElementB = splitB ? splitB?.slice(-1)[0] : "0";
    let intB = parseInt(thirdElementB);
    return int - intB;
  });

  return (
    <Row>
      <Col md={12} className="mb-4">
        <Card>
          <Row>
            <Col md={12}>
              <div
                className={`border-bottom p-4 ${classNameHeader} d-flex justify-content-between`}
              >
                <div>
                  <h4 className={`mb-0 fw-bold card-title ${classNameTitle}`}>
                    {title}
                  </h4>
                  <div className="d-flex justify-content-between mb-0">
                    <div>
                      <span className={classNameDesc}>{desc}</span>
                    </div>
                  </div>
                </div>
                {isSummary && (
                  <div className="bg-white d-flex rounded flex-row align-items-center px-3">
                    <div
                      className={`icon-shape icon-xs bg-primary text-white rounded-circle w-37`}
                    >
                      <Icon
                        path={talentIcon}
                        size={0.5}
                        className="nav-icon text-white"
                      />
                    </div>
                    <p
                      className="mb-0 font-xsssss text-black"
                      style={{ fontWeight: "500" }}
                    >
                      &nbsp; Talent Category: &nbsp;
                    </p>
                    <p className="mb-0 fw-bold text-black">Future Talent</p>
                  </div>
                )}
              </div>
            </Col>
            {isSummary ? (
              <div className="">
                <TableSummaryResult arrDataTable={arrData} />
              </div>
            ) : (
              <>
                {isTalent
                  ? selectedUid !== ""
                    ? arrPerformances?.length !== 0
                      ? sortArrPerform?.map((data, id) => {
                          return (
                            <Col lg={6} md={6} xs={12} key={id}>
                              <div className="border-end">
                                <StatRightCenterIcon
                                  title={`Score Evaluation : ${data?.grade}`}
                                  value={
                                    isTalent
                                      ? data?.pap_program
                                      : "Period : 12 June 2023"
                                  }
                                  classValue="pt-3 pb-2 ps-5  ps-sm-15"
                                />
                              </div>
                            </Col>
                          );
                        })
                      : arrDummy?.map((data, id) => {
                          return (
                            <Col lg={6} md={6} xs={12} key={id}>
                              <div className="border-end">
                                <StatRightCenterIcon
                                  title={`Score Evaluation : ${data?.title}`}
                                  value={data?.title}
                                  classValue="pt-3 pb-2 ps-5  ps-sm-15"
                                />
                              </div>
                            </Col>
                          );
                        })
                    : arrDummy?.map((data, id) => {
                        return (
                          <Col lg={6} md={6} xs={12} key={id}>
                            <div className="border-end">
                              <StatRightCenterIcon
                                title={`Score Evaluation : ${data?.title}`}
                                value={data?.title}
                                classValue="pt-3 pb-2 ps-5  ps-sm-15"
                              />
                            </div>
                          </Col>
                        );
                      })
                  : data &&
                    data?.map((performance) => {
                      return (
                        <Col lg={6} md={12} sm={12}>
                          <div className="border-end">
                            <StatRightCenterIcon
                              title={
                                performance?.pap_program +
                                " : " +
                                performance?.grade
                              }
                              value={
                                isTalent
                                  ? "12/06/2023"
                                  : "Period : 12 June 2023"
                              }
                              classValue={
                                classValue
                                  ? classValue
                                  : "pt-3 pb-2 ps-5 ps-sm-15"
                              }
                            />
                          </div>
                        </Col>
                      );
                    })}
              </>
            )}
          </Row>
        </Card>
      </Col>
    </Row>
  );
};
export default PerformanceCard;
