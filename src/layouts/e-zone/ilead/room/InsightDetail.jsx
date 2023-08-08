import React, { useEffect, useState } from "react";
import IleadMenu from "../IleadMenu";
import { Card, Col, Image, Row } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiImageMultiple as ImgIcon } from "@mdi/js";
// import ImgDummy from "../../../../assets/ezone/images/png/dummy-header-card-community.png";
// import ImgSecDummy from "../../../../assets/ezone/images/png/dummy-banner-ezone.png";
// import ImgThirdDummy from "../../../../assets/ezone/images/png/dummy-third-banner-img.png";
import ModalImageSlider from "../../../../components/ezone/new/components/ModalImageSlider";
import ImgBCA1 from "../../../../assets/ezone/images/dummy/dummy-bca1-compressed.jpg";
import ImgBCA2 from "../../../../assets/ezone/images/dummy/dummy-bca2-compressed.jpg";
import ImgBCA3 from "../../../../assets/ezone/images/dummy/dummy-bca3-compressed.jpg";
import ImgBCA4 from "../../../../assets/ezone/images/dummy/dummy-bca4-compressed.jpg";
import ImgBCA5 from "../../../../assets/ezone/images/dummy/dummy-bca5-compressed.jpg";

const InsightDetail = () => {
  const arrPhoto = [
    {
      photo: ImgBCA1,
    },
    {
      photo: ImgBCA2,
    },
    {
      photo: ImgBCA3,
    },
    {
      photo: ImgBCA4,
    },
    {
      photo: ImgBCA5,
    },
  ];

  const [show, setShow] = useState(false);
  // const [idCarousel, setIdCarousel] = useState(0);
  const [index, setIndex] = useState(1);

  const handleImageClick = (id) => {
    setShow(true);
    setIndex(id);
  };

  const ImgGallery = () => {
    return (
      <div className="w-100 d-flex flex-wrap mt-3">
        <Row>
          {arrPhoto?.map((data, id) => {
            return (
              <Col lg={2} md={3} sm={4} xs={6}>
                <div
                  className="ms-2 mt-2 w-100 "
                  style={{ height: "160px" }}
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
          })}
        </Row>
      </div>
    );
  };

  return (
    <IleadMenu>
      <Card className="mb-3">
        <Card.Body>
          <div className="border-bottom pb-4">
            <h2 style={{ fontWeight: "800" }}>
              ZOOMPA PAKAR PRIME - VISIT BCA
            </h2>
            <p className="mb-0 text-kinda-dark">
              Program yang bekolaborasi dengan BCA untuk field trip dan
              mengadakan sharing session sebagai benchmark program untuk
              menambah knowledge dan overview dari perusahaan lain.
            </p>
            <div className="d-flex align-items-center mt-2">
              <Icon path={ImgIcon} size={0.7} />
              <p
                className="mb-0 ms-2 text-kinda-dark"
                style={{ fontWeight: "400" }}
              >
                4 Maret 2023
              </p>
            </div>
          </div>
          <ImgGallery />
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
      {/* {errorModal && (
        <NotifSuccessModal show={errorModal} setShow={setErrorModal}>
          <ErrorAlert
            setState={setErrorModal}
            text1={errorMessage}
            className="mb-0"
          />
        </NotifSuccessModal>
      )} */}
    </IleadMenu>
  );
};

export default InsightDetail;
