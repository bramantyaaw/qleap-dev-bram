import React, { Fragment, useState, useEffect } from "react";
import { Card, Form, Table } from "react-bootstrap";
import { Radio } from "react-feather";
import { CoreCompetencyData } from "../../../../data/mysubmission/epcn/CompetencyData";
export const CoreCompetency = ({ setTotal }) => {
  const [competencies, setCompetencies] = useState(CoreCompetencyData);

  const handleOptionChange = (competencyId, optionValue) => {
    const updatedCompetencies = competencies.map((competency) => {
      if (competency.id === competencyId) {
        return {
          ...competency,
          score_com: optionValue,
        };
      }
      return competency;
    });
    setCompetencies(updatedCompetencies);
  };

  // useEffect(() => {
  //   // Check if any of the score_com values are null
  //   const hasNullScore = competencies.some(
  //     (competency) => competency.score_com === null
  //   );
  //   if (hasNullScore) {
  //     alert("Core Competency can't be null");
  //   } else {
  //     setTotal(competencies);
  //   }
  // }, [competencies, setTotal]);
  useEffect(() => {
    setTotal(competencies);
  }, [competencies]);

  return (
    <Fragment>
      <Card>
        <Card.Header>
          <h4 style={{ fontFamily: "Roboto" }}>
            Job Evaluation (Core Competency)
          </h4>
        </Card.Header>
        <div className=" overflow-y-hidden">
          <Table className="table mb-0 text-nowrap">
            <thead className="table-light">
              <tr>
                <th scope="col" className="border-top-0 align-items-stretch">
                  Competency
                </th>
                <th scope="col" className="border-top-0 text-center text-wrap">
                  (1) Below
                </th>
                <th
                  scope="col-lg-1"
                  className="border-top-0 text-center text-wrap"
                >
                  (2) Near
                </th>
                <th scope="col" className="border-top-0 text-center text-wrap">
                  (3) Meet
                </th>
                <th scope="col" className="border-top-0 text-center text-wrap">
                  (4) Exceed
                </th>
              </tr>
            </thead>
            <tbody>
              {competencies.map((competency) => (
                <tr key={competency.id}>
                  <td>{competency.name_com}</td>
                  {[1, 2, 3, 4].map((optionValue) => (
                    <td
                      className="align-item-middle justify-content-center"
                      key={optionValue}
                    >
                      <Form.Check className="text-center ">
                        <input
                          type="radio"
                          value={optionValue}
                          checked={competency.score_com === optionValue}
                          onChange={() =>
                            handleOptionChange(competency.id, optionValue)
                          }
                        />
                      </Form.Check>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card>
    </Fragment>
  );
};
