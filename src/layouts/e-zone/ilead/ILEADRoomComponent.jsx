import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const ILEADRoomComponent = ({
  token,
  setModalLoading,
  setErrorModal,
  setErrorMessage,
}) => {
  const [listCourse, setListCourse] = useState([]);

  const fetchListCourse = async () => {
    try {
      setModalLoading(true);
      await axios
        .get(`/ezone/get-ilead-course`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((data) => {
          setModalLoading(false);
          if (data?.status === 200) {
            setListCourse(data?.data?.data);
          } else {
            setErrorModal(true);
            setErrorMessage(data?.data?.message);
          }
        });
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    fetchListCourse();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className="row ps-2 pe-2">
        {listCourse?.map((item, index) => {
          const route = item?.title?.toLowerCase();
          return (
            <Col lg={4} md={6} sm={12} key={index} className="mb-4">
              <Link
                to={`/ezone/ilead/room/${route}`}
                className="text-kinda-dark"
              >
                <Card className={`mb-4 card-hover h-100`}>
                  <div style={{ height: "150px" }}>
                    <Image
                      src={item?.image}
                      alt=""
                      className="card-img-top rounded-top-md h-100"
                      style={{ objectFit: "cover", OObjectFit: "cover" }}
                    />
                  </div>

                  {/* Card body  */}
                  <Card.Body style={{ height: "fitContent" }}>
                    <h6 className="h4 mb-2 text-truncate-line-2 ">
                      <Link
                        to={`/ezone/ilead/room/${route}`}
                        className=" text-primary bg-light-primary px-2 py-1 text-uppercase h6"
                        style={{ fontWeight: "700", borderRadius: "8px" }}
                      >
                        {item?.title}
                      </Link>
                    </h6>
                    <p className="mb-0">{item?.desc}</p>
                  </Card.Body>
                  {/* Card Footer */}
                </Card>
              </Link>
            </Col>
          );
        })}
      </div>
    </>
  );
};

export default ILEADRoomComponent;
