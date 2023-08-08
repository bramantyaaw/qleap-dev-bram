// import node module libraries
import React, { Fragment } from "react";
import { Row, Col, Container, ListGroup, Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

// import MDI icons
import Icon from "@mdi/react";
import { mdiArrowRight } from "@mdi/js";

// import custom components

// import data files
import GKBreadcrumb from "../../../components/components/marketing/common/breadcrumb/GKBreadcrumb";
import GuidesResourcesData from "../../../data/guides/GuidesResourcesData";
import MainNavbar from "../../navbars/MainNavbar";
import MainLayout from "../../home/MainLayout";
import HelpCenterLayout from "../HelpCenterLayout";

const HelpCenterGuideSingle = () => {
  const guideInfo = useParams();
  const categoryslug = guideInfo.categoryslug;
  const articleslug = guideInfo.articleslug;

  return (
    <HelpCenterLayout>
      <Fragment>
        {GuidesResourcesData.filter(function (dataSource) {
          return dataSource.categoryslug === categoryslug;
        }).map((item, index) => {
          return (
            <Fragment key={index}>
              {item.articles
                .filter(function (dataSource) {
                  return dataSource.articleslug === articleslug;
                })
                .map((article, index) => {
                  return (
                    <Fragment key={index}>
                      <section className="pt-3">
                        <Container>
                          <Row>
                            {/* breadcrumb */}
                            <Col md={{ offset: 2, span: 8 }} xs={12}>
                              <div>
                                <GKBreadcrumb
                                  breadcrumb={[
                                    {
                                      page: "Help Center",
                                      link: "/help",
                                    },
                                    {
                                      page: "Guides & Resources",
                                      link: "/help/guide",
                                    },
                                    {
                                      page: article.articletitle,
                                      link: "#",
                                    },
                                  ]}
                                />
                              </div>
                            </Col>
                          </Row>
                        </Container>
                      </section>

                      {/* article content */}
                      <section className="py-10">
                        <Container>
                          <Row>
                            <Col md={{ offset: 2, span: 8 }} xs={12}>
                              <div className="mb-8">
                                <h1 className="display-4 fw-semi-bold">
                                  {article.articletitle}
                                </h1>
                                <div
                                  className="mt-3"
                                  dangerouslySetInnerHTML={{
                                    __html: article.content,
                                  }}
                                ></div>
                                <br />
                                {/* was this article helpful ? */}
                                <div className="d-md-flex justify-content-between align-items-center">
                                  <div className="mb-2 mb-md-0">
                                    <p className="mb-0 fs-6">
                                      Last updated 2 months ago
                                    </p>
                                  </div>
                                  <div>
                                    <h5 className="mb-0">
                                      Was this article helpful?
                                      <Link to="#" className="text-muted ms-2">
                                        <i className="fe fe-thumbs-up"></i>
                                      </Link>
                                      <Link to="#" className="text-muted ms-2">
                                        <i className="fe fe-thumbs-down"></i>
                                      </Link>
                                    </h5>
                                  </div>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </Container>
                      </section>
                    </Fragment>
                  );
                })}
            </Fragment>
          );
        })}
      </Fragment>
    </HelpCenterLayout>
  );
};
export default HelpCenterGuideSingle;
