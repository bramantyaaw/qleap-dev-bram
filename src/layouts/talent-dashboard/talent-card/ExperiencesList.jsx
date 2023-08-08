import React, { Fragment } from "react";
import { Card, Col, Nav, Row, Tab } from "react-bootstrap";
import ErajayaExperience from "../../../components/components/marketing/talent-dashboard/ErajayaExperience";
import OutsiteExperience from "../../../components/components/marketing/talent-dashboard/OutsiteExperience";
import DropdownRevision from "../../database-admin/ticket/elements/DropdownRevision";

const ExperiencesList = ({
  arrInsideEra,
  arrOutsiteEra,
  selectedUid,
  arrFilterSKType,
  setSelectedFilterSKType,
  selectedFilterSKType,
  hasMutationFilter,
}) => {
  const arrInsideFiltered = arrInsideEra?.filter((data) => {
    if (selectedFilterSKType === "" || selectedFilterSKType === "All") {
      return data;
    } else if (
      data?.sk_type?.toLowerCase().includes(selectedFilterSKType?.toLowerCase())
    ) {
      return data;
    } else {
      return null;
    }
  });

  return (
    <Fragment>
      <Col xl={12} lg={12} md={12} sm={12} className="px-0 mb-4">
        <Tab.Container defaultActiveKey="experience">
          <Card className="">
            <div
              className={`p-4 bg-white header-border-radius d-flex justify-content-between w-100`}
            >
              <div style={{ width: "85%" }}>
                <h4 className={`mb-0 fw-bold card-title `}>Job Experience</h4>
                <div className="d-flex justify-content-between mb-0">
                  <div>
                    <span>
                      This is based on experience working outside and within the
                      Erajaya
                    </span>
                  </div>
                </div>
              </div>
              <DropdownRevision
                setSelected={setSelectedFilterSKType}
                data={arrFilterSKType}
                className="wrapper-div py-0"
                defaultValue={
                  hasMutationFilter?.length > 0 ? "Mutation" : "Filter SK Type"
                }
                style={{ width: "20%" }}
              />
            </div>

            <Card.Header className="border-bottom-0 p-0 bg-white card-border-custom">
              <Nav className="nav-lb-tab">
                {/* <Nav.Item>
                  <Nav.Link eventKey="promotion" className="mb-sm-3 mb-md-0">
                    Erajaya Promotion Experience
                  </Nav.Link>
                </Nav.Item> */}
                <Nav.Item>
                  <Nav.Link eventKey="experience" className="mb-sm-3 mb-md-0">
                    Erajaya Experience
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="outsite" className="mb-sm-3 mb-md-0">
                    Outside Experience
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body className="p-0">
              <Tab.Content>
                {/* <Tab.Pane eventKey="promotion" className="pb-4 p-4">
                  <ErajayaPromotion
                    arrEmployeePromotion={arrEmployeePromotion}
                    selectedUid={selectedUid}
                  />
                </Tab.Pane> */}
                <Tab.Pane eventKey="experience" className="pb-4 p-4">
                  <ErajayaExperience
                    arrInsideEra={arrInsideFiltered}
                    selectedUid={selectedUid}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="outsite" className="pb-4 p-4">
                  <OutsiteExperience
                    arrOutsiteEra={arrOutsiteEra}
                    selectedUid={selectedUid}
                  />
                </Tab.Pane>
              </Tab.Content>
            </Card.Body>
          </Card>
        </Tab.Container>
      </Col>
    </Fragment>
  );
};

export default ExperiencesList;
