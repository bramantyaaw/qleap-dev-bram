import React, { Fragment, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import ArticlesCategoryCard from "../../../layouts/helpcenter/guide/ArticlesCategoryCard";
import GuidesResourcesData from "../../../data/guides/GuidesResourcesData";
import HelpCenterLayout from "../HelpCenterLayout";
import GuideTemplate from "../GuideTemplate";

const GuideCenter = () => {
  const [filteredList, setFilteredList] = new useState(GuidesResourcesData);

  const filterBySearch = (event) => {
    // Access input value
    const query = event.target.value;
    // Create copy of item list
    var updatedList = [...GuidesResourcesData];
    // Include all elements which includes the search query
    updatedList = updatedList.filter((item) => {
      return (
        item.title.toString().toLowerCase().indexOf(query.toLowerCase()) !==
          -1 ||
        item.description
          .toString()
          .toLowerCase()
          .indexOf(query.toLowerCase()) !== -1
      );
    });
    // Trigger render with updated values
    setFilteredList(updatedList);
  };

  return (
    // <HelpCenterLayout>
    //   <Fragment>
    //     <HeaderBreadcrumb title="Guides & Resources" breadcrumb={breadcrumb} />
    <GuideTemplate>
      <div className="py-3">
        <Container>
          <Row>
            <Col md={{ offset: 2, span: 4 }} xs={12}>
              <input
                type="text"
                placeholder="Search program name"
                onChange={filterBySearch}
                className="py-3 smooth-shadow-md form-control float-left"
              />
            </Col>
          </Row>
        </Container>
      </div>

      {/* articles category listing cards */}
      {/* <FAQ setPost={setPost} /> */}
      <div className="py-10">
        <Container>
          <Row>
            <Col md={{ offset: 2, span: 8 }} xs={12}>
              <Row>
                {filteredList.map((item, index) => {
                  return (
                    <Col
                      lg={6}
                      xs={12}
                      key={index}
                      className="d-flex align-items-stretch"
                    >
                      <ArticlesCategoryCard item={item} />
                    </Col>
                  );
                })}
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </GuideTemplate>
    //   </Fragment>
    // </HelpCenterLayout>
  );
};
export default GuideCenter;
