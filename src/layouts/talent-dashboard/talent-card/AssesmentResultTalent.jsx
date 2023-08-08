import React from "react";
import { Card, ProgressBar } from "react-bootstrap";
import Icon from "@mdi/react";
import {
  mdiBookEducationOutline as BookIcon,
  mdiArrowUp as ArrowIcon,
} from "@mdi/js";
import TableLegends from "../../../components/components/marketing/talent-dashboard/TableLegends";

const AssesementResultTalent = ({ selectedUid, data, isTalentDashboard }) => {
  const arrDefault = [
    {
      code: "QO",
      name: "Quality Oriented",
      point: 0,
    },
    {
      code: "AO",
      name: "Achievement Oriented",
      point: 0,
    },
    {
      code: "DO",
      name: "Developing Others",
      point: 0,
    },
    {
      code: "LO",
      name: "Leading Others",
      point: 0,
    },
    {
      code: "CA",
      name: "Creative Agility",
      point: 0,
    },
    {
      code: "ST",
      name: "Strategic Leadership",
      point: 0,
    },
    {
      code: "SL",
      name: "Strategic Leadership",
      point: 0,
    },
    {
      code: "RP",
      name: "Reliable Partner",
      point: 0,
    },
    {
      code: "TS",
      name: "Technology Savvy",
      point: 0,
    },
  ];

  const newData = data
    ? data?.assessment_chart?.sort((a, b) => b?.point - a?.point)
    : arrDefault?.sort((a, b) => b?.point - a?.point);
  const DataAlphabet = newData?.sort((a, b) => {
    if (a?.point === b?.point) return a.name.localeCompare(b.name);
  });

  const codeData = DataAlphabet?.sort((a, b) => {
    if (a?.name === b?.name) return a.code.localeCompare(b.code);
  });
  return (
    <Card className="mb-3 border-0 card-experience-outsite-era h-100">
      <Card.Header className="border-bottom px-3 py-3">
        <h4 className="fw-bold mb-4">Legends</h4>
      </Card.Header>
      <Card.Body className="p-0 table-custom h-100 d-flex flex-column justify-content-between ">
        <TableLegends arrDataTable={codeData} />
        {isTalentDashboard ? (
          <div className="d-flex w-100 justify-content-start">
            <div className="d-flex w-100 py-3 h-100 ps-5 pe-3 border-top">
              <div
                className={`icon-shape icon-md bg-light-primary text-dark-primary rounded-circle w-37 me-4`}
              >
                <Icon
                  path={ArrowIcon}
                  className="nav-icon text-primary"
                  size={0.8}
                />
              </div>
              <div>
                <p className="mb-0 text-kinda-light-dark h6 opacity-50">
                  Need to improve
                </p>
                <p className="mb-0 fw-bold h4 text-kinda-dark">
                  {data ? data?.need_to_improve : "-"}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="d-flex w-100 justify-content-center">
            <div className="d-flex w-50  py-3 ps-5 pe-3 border-end h-100 border-top">
              <div
                className={`icon-shape icon-md bg-light-primary text-dark-primary rounded-circle w-37 me-4`}
              >
                <Icon
                  path={BookIcon}
                  className="nav-icon text-primary "
                  size={0.8}
                />
              </div>
              <div>
                <p className="mb-0 text-kinda-light-dark h6 opacity-50">
                  Assessment Result
                </p>
                <p className="mb-0 fw-bold h4 text-kinda-dark">
                  {data ? data?.result : "-"}
                </p>
              </div>
            </div>
            <div className="d-flex w-50 py-3 h-100 ps-5 pe-3 border-top">
              <div
                className={`icon-shape icon-md bg-light-primary text-dark-primary rounded-circle w-37 me-4`}
              >
                <Icon
                  path={ArrowIcon}
                  className="nav-icon text-primary"
                  size={0.8}
                />
              </div>
              <div>
                <p className="mb-0 text-kinda-light-dark h6 opacity-50">
                  Need to improve
                </p>
                <p className="mb-0 fw-bold h4 text-kinda-dark">
                  {data ? data?.need_to_improve : "-"}
                </p>
              </div>
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default AssesementResultTalent;
