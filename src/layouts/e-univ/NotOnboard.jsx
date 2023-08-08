import React, { useEffect, useState } from "react";
import {
  Card,
  Nav,
  Image,
  Tab,
  ProgressBar,
  Col,
  Button,
  Row,
} from "react-bootstrap";

import Illustration from "../../assets/images/icon/learning_illustration.svg";
import Curr1 from "../../assets/images/svg/curriculum1.svg";
import Curr2 from "../../assets/images/svg/curriculum2.svg";
import award from "../../assets/images/icon/award_weekly.svg";
import CardOnBoard from "../../components/components/dashboard/e-univ/on-board/CardOnBoard";
import UpgradeExploreCard from "../../components/components/dashboard/e-univ/on-board/UpgradeExploreCard";
import { mdiHeadSnowflakeOutline, mdiLaptop, mdiToolboxOutline } from "@mdi/js";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ChangeLocationModal } from "./ChangeLocationModal";

const NotOnboard = (props) => {
  const { data, token, setImage, uid } = props;
  const notDisabled = true;
  const [location, setLocation] = useState([]);
  const [show, setShow] = useState(false);

  const fetchLocation = async () => {
    try {
      await axios
        .post(
          "/euniv/get-latest-location",
          {
            uid: uid,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => setLocation(res?.data?.data));
      setImage(location?.image);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    fetchLocation();
  }, [uid, token, data]);

  return (
    <>
      <ChangeLocationModal
        show={show}
        setShow={setShow}
        token={token}
        uid={uid}
        setLocation={setLocation}
      />
      <Card className="">
        <Card.Body className="d-flex justify-content-between">
          <div className="justify-content-start pe-5 w-100 w-xl-60">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="text-dark mb-0 fw-semi-bold">
                  {location?.location}
                </p>
              </div>
              <div className="d-flex align-items-center">
                <span className="mb-0 ">
                  <Button
                    variant="outline-primary"
                    className="me-1"
                    onClick={() => {
                      setShow(true);
                      // fetchLocation();
                    }}
                  >
                    Change Location
                  </Button>
                </span>
              </div>
            </div>
            <div className="d-flex mt-3 justify-content-between align-items-center">
              <Col lg={3} md={3} sm={6} className="mb-2 mb-lg-0">
                <span className="fs-6">Your</span>
                <h6 className="text-dark fw-semi-bold mb-0">Last Score</h6>
              </Col>{" "}
              <div className="d-flex mt-4 align-items-center">
                <h5 className="mb-0 text-body">
                  <span className="text-primary">80</span>/100{" "}
                </h5>
                <Link className="text-primary fs-7 fst-italic ps-1 text-decoration-underline">
                  See details
                </Link>
              </div>
            </div>
            <div className="d-flex my-3 justify-content-between align-items-center">
              <div>
                <span className="">Learning Journey</span>
              </div>
              <div className="d-flex align-items-center">
                <h5 className="mb-0 text-body">
                  {" "}
                  <span className="text-primary" style={{ fontSize: "20px" }}>
                    2
                  </span>
                  /7 module
                </h5>
              </div>
            </div>
            <ProgressBar
              now={25}
              striped
              variant="info"
              style={{
                height: "6px",
              }}
            />
          </div>
          <Image
            src={Illustration}
            className="justify-content-end w-50 w-xl-25"
          />
        </Card.Body>
      </Card>
      <Card className="mt-4 blue-primary">
        <Card.Body className="d-flex justify-content-between">
          <Col lg={3} md={3} sm={3}>
            <Image src={award} />
          </Col>
          <div className="justify-content-start pe-5 w-100 w-xl-60">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span className="text-white font-weight-normal">
                  Special Task
                </span>
              </div>
              <div className="d-flex align-items-center">
                <span className="fw-bold text-white font-weight-normal">
                  12/03/2023 - 19/04/2023
                </span>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h4 className="text-white fw-bold ">
                  Talent Development Program{" "}
                </h4>
              </div>
              <div className="d-flex align-items-center">
                <p
                  className="text-white font-weight-light"
                  style={{ fontSize: "12px" }}
                >
                  1 bulan lagi
                </p>
              </div>
            </div>
            <Row>
              <Col lg={9} md={9}>
                <div className="d-flex my-3 justify-content-between align-items-center">
                  <div>
                    <span className="text-white">Development Journey</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <h5 className="mb-0 text-white">
                      {" "}
                      <span className="text-white" style={{ fontSize: "20px" }}>
                        2
                      </span>
                      /7 module
                    </h5>
                  </div>
                </div>
                <ProgressBar
                  now={25}
                  striped
                  variant="info"
                  style={{
                    height: "6px",
                  }}
                />
              </Col>
              <Col lg={3} md={3}>
                <Button
                  className="me-1 p-2"
                  variant="outline-info"
                  style={{ backgroundColor: "white" }}
                >
                  <span className="text-primary">See Competency</span>
                </Button>
              </Col>
            </Row>
          </div>
        </Card.Body>
      </Card>
      {/* <div className="mt-5 d-flex flex-column flex-xl-row w-100"> */}
      <Row className="pt-4">
        <Col lg={6} md={12} sm={12} className="pb-4">
          <CardOnBoard
            icon={mdiHeadSnowflakeOutline}
            title="General Leadership and Management Academy"
            text1="Mempelajari hal teknis mengenai pengenalan product "
            img={Curr2}
            notDisabled
          />
        </Col>
        <Col lg={6} md={12} sm={12} className="pb-4">
          <CardOnBoard
            icon={mdiToolboxOutline}
            img={Curr1}
            title="Technical Expert Academy "
            text1="Mempelajari softskill, pengembangan diri dan penerapannya di perusahaan"
            linkName="/learning/tech-competency"
            notDisabled
          />
        </Col>
      </Row>
      {/* </div> */}
      {/* <div>
        <p className="text-center text-kinda-light-dark">
          Upgrade and Explore more your skill here
        </p>
        <UpgradeExploreCard notDisabled />
      </div>
      <div className="text-center">
        {" "}
        <Button
          variant="primary btn-xs"
          className="align-items-center text-center"
        >
          Go to Library
        </Button>
      </div> */}
    </>
  );
};

export default NotOnboard;
