import React, { Fragment, useState } from "react";
import RightSideEzoneComponent from "../../../components/ezone/new/components/RightSideEzoneComponent";
import NewHeaderEzone from "../../../components/ezone/new/Header/NewEzoneLayout";
import { useEffect } from "react";
import XFrameBypass from "./XframeBypass";
import { Col, Row } from "react-bootstrap";
import SimpleBar from "simplebar-react";
import IframeLinkOutside from "../../../components/components/marketing/specialty/IframeLinkOutside";

const EzoneEvent = () => {
  const [uid, setUid] = useState(localStorage.getItem("uid"));

  useEffect(() => {
    setUid(localStorage.getItem("uid"));
    // eslint-disable-next-line
  }, [localStorage]);
  return (
    <>
      <div>
        <NewHeaderEzone>
          {/* <Row
          style={{ backgroundColor: "#f5f4f8", paddingTop: "61px" }}
          className=""
        > */}
          {/* <Col xl={2} lg={2} md={2} sm={2} xs={2}>
          <SimpleBar style={{ maxHeight: "100vh" }}></SimpleBar>
          </Col>
          <Col xl={10} lg={10} md={10} sm={10} xs={10}> */}
          {/* <div style={{ backgroundColor: "#f5f4f8", paddingTop: "61px" }}>
          <iframe
            src={`https://qleap.erajaya.com/api/event/react/${uid}`}
            allow="fullscreen"
            title="iframe-modal"
            className=""
            style={{
              width: "100%",
              height: "calc(100vh + 40px)",
              // height: "100vh",
            }}
          ></iframe>
        </div> */}
          <IframeLinkOutside
            style={{ backgroundColor: "#f5f4f8", paddingTop: "61px" }}
            height="calc(100vh + 40px)"
            src={`https://qleap.erajaya.com/qleapci/api/event/react`}
            className="mt-4"
            notCustom
          />
          {/* </Col>
        </Row> */}
        </NewHeaderEzone>
      </div>
    </>
  );
};

export default EzoneEvent;
