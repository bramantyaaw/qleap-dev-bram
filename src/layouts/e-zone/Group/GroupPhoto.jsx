import React, { useState } from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import ModalImageSlider from "../../../components/ezone/new/components/ModalImageSlider";
import NoArrComponent from "../../../components/components/marketing/talent-dashboard/NoArrComponent";

const GroupPhoto = ({ arrPhoto }) => {
  const [show, setShow] = useState(false);
  // const [idCarousel, setIdCarousel] = useState(0);
  const [index, setIndex] = useState(1);

  const handleImageClick = (id) => {
    setShow(true);
    setIndex(id);
  };

  return (
    <>
      <Card className="mb-3 rounded-4">
        <Card.Body>
          <p className="text-navy-ezone" style={{ fontWeight: "700" }}>
            Photos
          </p>

          <div className="w-100 ">
            <Row>
              {arrPhoto?.length > 0 ? (
                arrPhoto?.map((data, id) => {
                  return (
                    <Col lg={3} md={3} sm={4} xs={6}>
                      <div
                        className="mt-2 w-100 "
                        style={{ height: "130px" }}
                        onClick={() => handleImageClick(id + 1)}
                        role="button"
                      >
                        <Image
                          src={data?.photo}
                          // style={{ position: "relative", display: "inlineBlock" }}
                          className="w-100 h-100 rounded-3"
                          style={{ objectFit: "cover", OObjectFit: "cover" }}
                        />
                      </div>
                    </Col>
                  );
                })
              ) : (
                <NoArrComponent text="This group doesn't have any documentation" />
              )}
            </Row>
          </div>
        </Card.Body>
      </Card>
      <ModalImageSlider
        setShow={setShow}
        show={show}
        dataArr={arrPhoto}
        index={index}
        setIndex={setIndex}
        style={{ height: "100%", width: "100%" }}
        className="w-100 h-100"
      />
    </>
  );
};

export default GroupPhoto;
