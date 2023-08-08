import React, { Fragment, useEffect, useState } from "react";
import { Col, Container, Row, Tab } from "react-bootstrap";
import LearningLayout from "./LearningLayout";
import NotOnboard from "./NotOnboard";
import NewJoiner from "./NewJoiner";
import RightSideNotOnBoard from "./RightSideNotOnBoard";
import RightSideNewJoiner from "./RightSideNewJoiner";
import axios from "axios";
import NewNavbar from "../navbars/NewNavbar";
import LogoEUniv from "../../assets/ezone/images/svg/logo-header-euniv.svg";

const Learning = () => {
  const isDisable = true;
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [uid, setUid] = useState(localStorage.getItem("uid"));
  const [data, setData] = useState([]);
  const [imageLocation, setImage] = useState([]);

  const navs = [
    { title: "Landings", link: "/e-univ" },
    { title: "Learning", link: "/e-univ/learning" },
    { title: "Development", link: "/e-univ/development" },
    // { title: "Dashboard", link: "#" },
    { title: "ELTV Channel", link: "/e-univ/eltv" },
  ];

  const fetchData = async () => {
    try {
      await axios
        .post(
          "/euniv/get-program",
          {
            uid: uid,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )

        .then((res) => setData(res?.data?.data));
    } catch (e) {
      return e;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
    setUid(localStorage.getItem("uid"));
  }, [localStorage]);

  return (
    <>
      {/* <MainNavbar /> */}
      <NewNavbar
        bg="transparent"
        className="navbar-transparent"
        navs={navs}
        logoSectionImg={LogoEUniv}
        logoSize={20}
      />
      <LearningLayout
        isDisable={isDisable}
        pagetitle="Welcome to E-University"
        briefinfo1="E-University merupakan laman bagi karyawan untuk mengembangkan "
        briefinfo2=" dan capai "
        briefinfo3=" kamu, Yuk belajar!"
        span1="knowledge, skill,"
        span2="goal learning"
        imageLocation={imageLocation}
      >
        <Fragment>
          {/* Page content */}
          <div className="pb-10">
            <Container>
              <Row className="ps-0">
                <Col lg={8} md={12} sm={12} className="mt-0 mb-4 mb-lg-0">
                  <Tab.Container defaultActiveKey="contents">
                    {isDisable ? (
                      <NewJoiner />
                    ) : (
                      <NotOnboard
                        data={data}
                        token={token}
                        uid={uid}
                        setImage={setImage}
                      />
                    )}
                  </Tab.Container>
                </Col>
                <Col lg={4} md={12} sm={12} className="mt-n0 mb-4 mb-lg-0">
                  {isDisable ? (
                    <RightSideNewJoiner />
                  ) : (
                    <RightSideNotOnBoard data={data} />
                  )}
                </Col>
              </Row>
            </Container>
          </div>
        </Fragment>
      </LearningLayout>
    </>
  );
};
export default Learning;
