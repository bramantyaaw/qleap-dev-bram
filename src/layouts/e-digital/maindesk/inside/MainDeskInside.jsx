import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { Breadcrumb, Col, Row, Card } from "react-bootstrap";
import ProjectCard from "../../../../components/components/dashboard/projects/grid/ProjectCard";
import {
  MainDeskData,
  MainDeskData2,
} from "../../../../data/maindesk/MainDeskData";
import { Link } from "react-router-dom";

const MainDeskInside = () => {
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [uid, setUid] = useState(localStorage.getItem("uid"));
  const [arrListMainDesk, setArrListMainDesk] = useState([]);
  const [AplicationCard] = useState(MainDeskData2);

  const fetchPermissionsList = async () => {
    try {
      await axios
        .post(
          "/main-desk/get-data",
          {
            uid: uid,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          if (res?.status === 200) {
            const newData = res?.data?.data?.detail;
            // const filtered = newData?.filter(
            //   (data) => data?.function_name !== "ticketing"
            // );

            setArrListMainDesk(newData);
          } else {
            return res;
          }
        });
    } catch (e) {
      return e;
    }
  };

  useEffect(() => {
    fetchPermissionsList();
  }, []);

  useEffect(() => {
    setUid(localStorage.getItem("uid"));
    setToken(localStorage.getItem("access_token"));
    // eslint-disable-next-line
  }, [localStorage]);

  // console.log(AplicationCard)
  return (
    <Fragment>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <div className="border-bottom pb-2 mb-4 d-flex align-items-center justify-content-between">
            <div className="mb-3 mb-md-0">
              <h1 className="mb-1 h2 fw-bold">Main Desk</h1>
              <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="#">E-Digital</Breadcrumb.Item>
                <Breadcrumb.Item active>Main Desk</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        {arrListMainDesk &&
          arrListMainDesk?.map((item, index) => {
            return (
              <Col
                xxl={3}
                xl={4}
                lg={6}
                xs={12}
                className="mb-4"
                style={{ height: "maxContent" }}
                key={index}
              >
                <ProjectCard
                  item={item}
                  completeProgress={item?.complete}
                  listBucketProgress={item?.list_bucket}
                  overdueProgress={item?.overdue}
                />
              </Col>
            );
          })}
        {MainDeskData?.map((data, index) => {
          return (
            <Col
              xxl={3}
              xl={4}
              lg={6}
              xs={12}
              className="mb-4"
              style={{ height: "maxContent" }}
              key={index}
            >
              <ProjectCard
                item={data}
                // completeProgress={data?.complete}
                // listBucketProgress={data?.list_bucket}
                // overdueProgress={data?.overdue}
              />
            </Col>
          );
        })}
        {/* {arrListMainDesk ? (
          arrListMainDesk?.map((item, index) => {
            return (
              <Col xxl={3} xl={4} lg={6} xs={12} className="mb-4" key={index}>
                <ProjectCard
                  item={item}
                  completeProgress={item?.complete}
                  listBucketProgress={item?.list_bucket}
                  overdueProgress={item?.overdue}
                />
              </Col>
            );
          })
        ) : (
          <p className="text-center">No Data</p>
        )} */}
      </Row>
      <Row>
        {AplicationCard?.map((item) => {
          return (
            <Col xxl={3} xl={4} lg={6} xs={12} className="mb-4">
              <Link to={item.link}>
                <Card className="text-center">
                  <Card.Img
                    src={item.img}
                    className=" m-3 mx-auto"
                    style={{ width: "5rem", height: "5rem" }}
                  />
                  <Card.Title style={{ fontWeight: "bold !important" }}>
                    {item.title}
                  </Card.Title>
                  <Card.Footer
                    className="text-black"
                    style={{
                      backgroundColor: "#D1D6EB",
                    }}
                  >
                    <i className="opacity-75 text-large">Application</i>
                  </Card.Footer>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </Fragment>
  );
};

export default MainDeskInside;
