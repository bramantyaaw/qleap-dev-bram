import axios from "axios";
import React, { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Col, Row, Container, Image, Form } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

import FeatureTopIconWithLink from "../../components/components/marketing/common/features/FeatureTopIconWithLink";

import LearningJourneyMain from "../../data/learningjourney/LearningJourneyMain";

import task_muted from "../../assets/images/icon/vector_task_muted.svg";

import { cutString } from "../../config/helper/utils";

const LearningJourneyPart = (props) => {
  const { token, uid, isHome } = props;
  const [dataLj, getDataLj] = useState([]);
  const [isDisabled, setDisabled] = useState("");

  const fetchLatestModule = async () => {
    try {
      const { data } = await axios.post(
        `/get-latest-module`,
        {
          uid: uid,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      getDataLj(data?.data);
      setDisabled("secondary disabled");
    } catch (err) {
      return err;
    }
  };

  LearningJourneyMain?.map((item, index) => {
    switch (index) {
      case 0:
        item.title = dataLj ? dataLj[0]?.score : null + "/100";

        item.description = dataLj
          ? "Your last score from module : " + dataLj[0]?.description
          : "";
        break;
      case 1:
        item.title = cutString(dataLj ? dataLj[0]?.description : null, 35);
        break;
      case 2:
        if (isDisabled != null) {
          item.icon = task_muted;
          item.description = "This feature is not available right now";
        }
        break;
      default:
        return null;
    }
  });

  const isPhone = useMediaQuery({
    query: "(max-width: 746px)",
  });

  const border = (index) => {
    let items = " d-flex align-items-stretch";
    if (isPhone) {
      if (index === 0) {
        return "";
      } else {
        return "border-top" + items;
      }
    } else {
      if (index === 0) {
        return "";
      } else {
        return "border-start" + items;
      }
    }
  };

  useEffect(() => {
    fetchLatestModule();
  }, [token, uid]);

  return (
    <Fragment>
      <div className="py-lg-5 pt-8 py-10 px-5 bg-white">
        <Row>
          <Col xl={10} md={12} className="col-12 offset-xl-1">
            <Row className="text-center">
              <Col md={12} className="px-md-16 mb-8 mt-6">
                <span className="text-uppercase text-primary fw-semi-bold ls-md">
                  LEARNING JOURNEY
                </span>
                <h2 className="fsc-32 fw-bold mt-3  mb-2">
                  Here is an Update for Learning
                </h2>
              </Col>
            </Row>
            <Row className="mt-5 pb-8">
              <div>
                <Container>
                  <div className="bg-white border-dark rounded-5 shadow-lg px-3">
                    <Row>
                      {LearningJourneyMain?.map((item, index) => {
                        return (
                          <Col
                            md={4}
                            xs={12}
                            className={border(index)}
                            key={index}
                          >
                            <Container>
                              {item?.isButton === true ? (
                                <FeatureTopIconWithLink
                                  item={item}
                                  buttonVariant={isDisabled}
                                  isButton
                                  isHome={isHome}
                                />
                              ) : (
                                <FeatureTopIconWithLink
                                  item={item}
                                  isHome={isHome}
                                />
                              )}
                            </Container>
                          </Col>
                        );
                      })}
                    </Row>
                  </div>
                </Container>
              </div>
            </Row>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default LearningJourneyPart;
