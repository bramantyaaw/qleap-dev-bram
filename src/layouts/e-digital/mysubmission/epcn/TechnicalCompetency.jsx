import Icon from "@mdi/react";
import React, { Fragment, useEffect, useState } from "react";
import { Button, Card, Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { mdiCloseCircle } from "@mdi/js";

export const TechnicalCompetency = ({ setTotal }) => {
  const [newCompetencyName, setNewCompetencyName] = useState("");
  const [competencies, setCompetencies] = useState([]);

  const handleOptionChange = (competencyId, optionValue) => {
    const updatedCompetencies = competencies.map((competency) => {
      if (competency.id === competencyId) {
        return {
          ...competency,
          score_com: optionValue,
          // name_com: newCompetencyName,
        };
      }
      return competency;
    });
    setCompetencies(updatedCompetencies);
  };

  const handleNameChange = (competencyId, competencyName) => {
    const updatedCompetencies = competencies.map((competency) => {
      if (competency.id === competencyId) {
        setNewCompetencyName(competencyName);
        return {
          ...competency,
          name_com: competencyName,
        };
      }
      return competency;
    });
    setCompetencies(updatedCompetencies);
  };

  const addRow = () => {
    const newCompetency = {
      // id: competencies.length + 1,
      id:
        competencies.length > 0
          ? competencies[competencies.length - 1].id + 1
          : 1,
      name_com: "",
      score_com: null,
      type_com: "Technical",
    };
    setCompetencies([...competencies, newCompetency]);
  };
  const handleRemoveLastRow = () => {
    setCompetencies(competencies.slice(0, -1));
  };

  const handleRemoveRow = (competencyId) => {
    const updatedCompetencies = competencies.filter(
      (competency) => competency.id !== competencyId
    );
    setCompetencies(updatedCompetencies);
  };

  useEffect(() => {
    setTotal(competencies);
  }, [competencies]);

  return (
    <Fragment>
      <Card>
        <Card.Header>
          <h4 style={{ fontFamily: "Roboto" }}>
            Job Evaluation (Technical Competency)
          </h4>
        </Card.Header>
        <div className="overflow-y-hidden table-responsive">
          <Table responsive="sm" className="table mb-0 text-nowrap">
            <thead className="table-light">
              <tr>
                <th scope="col" className="border-top-0 text-start ">
                  Competency
                </th>
                <th
                  scope="col"
                  className="border-top-0 px-3 text-center text-wrap"
                >
                  (1) Below
                </th>
                <th
                  scope="col-lg-1"
                  className="border-top-0 px-3 text-center text-middle text-wrap"
                >
                  (2) Near
                </th>
                <th
                  scope="col"
                  className="border-top-0 px-3 text-center text-wrap"
                >
                  (3) Meet
                </th>
                <th
                  scope="col"
                  className="border-top-0 px-2 text-center text-wrap"
                >
                  (4) Exceed
                </th>
                <th
                  scope="col"
                  className="border-top-0 px-0 text-center text-wrap"
                >
                  {" "}
                </th>
              </tr>
            </thead>
            <tbody>
              {competencies.map((competency) => (
                <tr key={competency.id}>
                  <td>
                    <input
                      type="text"
                      value={competency.name_com}
                      onChange={(event) =>
                        handleNameChange(competency.id, event.target.value)
                      }
                    />
                  </td>
                  {[1, 2, 3, 4].map((optionValue) => (
                    <td
                      className="align-middle justify-content-center"
                      key={optionValue}
                    >
                      <Form.Check className="align-middle text-center ">
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
                  <td>
                    <Link onClick={() => handleRemoveRow(competency.id)}>
                      <i className="fe fe-trash-2 h3 text-danger"></i>
                    </Link>
                  </td>
                </tr>
              ))}
              <tr>
                <td>
                  {" "}
                  <Button onClick={addRow} size="xs" variant="primary">
                    Add
                  </Button>
                  {/* <Button
                    onClick={handleRemoveLastRow}
                    size="xs"
                    variant="secondary"
                    className="ms-1"
                  >
                    Remove
                  </Button> */}
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Card>
    </Fragment>
  );
};
