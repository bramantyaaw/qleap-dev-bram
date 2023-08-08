import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiNote } from "@mdi/js";
import GKAccordionQuestion from "../../../../../components/components/marketing/common/accordions/GKAccordionQuestion";
import LoadingComponent from "../../../../../components/components/elements/loading/LoadingComponent";

export const QuestionList = (props) => {
  const { id, title, items, spinner } = props;

  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [questionExisting, setQuestionExisting] = useState([]);

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
  }, [localStorage]);

  return (
    <div className="bg-body mt-2 rounded-2 p-4">
      <Card>
        <Card.Body className="p-0">
          <div className="d-flex justify-content-between align-items-center p-4">
            <span>
              {" "}
              <Icon
                path={mdiNote}
                size={0.8}
                className="text-white bg-info p-1 me-1 icon-md icon-shape rounded-2"
              />
              <span className="fw-bold text-black">{title}</span>
            </span>
            <span>{items?.length} Questions</span>
          </div>

          <div className="pt-2 p-5">
            {" "}
            {spinner ? (
              <LoadingComponent className="mt-3" />
            ) : (
              <GKAccordionQuestion accordionItems={items} report />
            )}
          </div>

          {/* {item.map((item) => (
            <div key={item.id} className="pt-3 p-5">
              <p className="d-flex justify-content-between text-inherit">
                <span className="pe-2">{item.id}.</span> {item.title}
              </p>
              {item?.files?.length > 0 && (
                <Image
                  src={item.files ? item.files[0]?.url : ""}
                  alt=""
                  height={100}
                  width={200}
                  className="rounded ps-2"
                />
              )}
              <Form.Group className="mb-0 mt-2 ps-2">
                <TextForm text="Answer" />
                <Row>
                  {item?.option?.map((answer, subindex) => (
                    <Col md={12} key={subindex}>
                      {item?.type == "mr" ? (
                        <InputGroup className="mb-3">
                          <InputGroup.Checkbox
                            checked={answer.is_correct}
                            disabled={!answer.is_correct}
                            readOnly
                          />
                          <Form.Control
                            value={answer.option_text}
                            disabled={!answer.is_correct}
                            readOnly
                          />
                        </InputGroup>
                      ) : (
                        <InputGroup className="mb-3">
                          <InputGroup.Radio
                            checked={answer.is_correct}
                            disabled={!answer.is_correct}
                            readOnly
                          />
                          <Form.Control
                            value={answer.option_text}
                            disabled={!answer.is_correct}
                            readOnly
                          />
                        </InputGroup>
                      )}
                    </Col>
                  ))}
                </Row>
              </Form.Group>
            </div>
          ))} */}
        </Card.Body>
      </Card>
    </div>
  );
};
