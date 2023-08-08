import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col } from "react-bootstrap";
import PopupPembuatanLokasi from "./popup-detail/PopupPembuatanLokasi";

import PopupCreateGPS from "./popup-detail/PopupCreateGPS";
import PopupSuperior from "./popup-detail/PopupSuperior";
import PopupIDCard from "./popup-detail/PopupIDCard";

import ProcessLoadingModal from "../../../elements/modal/ProcessLoadingModal";

const CloseTicket = ({ dataId, token }) => {
  const [show, setShow] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [detailArr, setDetailArr] = useState([]);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [statusCheck, setStatusCheck] = useState("");
  const [typeTicketCheck, setTypeTicketCheck] = useState(0);
  const [modalLoading, setModalLoading] = useState(false);

  const getArrDataPIC = async (value) => {
    setDetailArr([]);
    setSelectedId(value);
    // const idString = value?.toString();
    try {
      setModalLoading(true);
      const { data } = await axios.post(
        "/services/ticketing/get-ticket-detail",
        {
          id: value,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setModalLoading(false);
      setDetailArr(data?.data?.ticket_detail);
      setShow(true);
      setOpenPopUp(false);
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    const statusCheck = detailArr ? detailArr[0]?.status : "";
    const typeTicketCheck = detailArr ? detailArr[0]?.issue_id : 0;
    const typeToString = typeTicketCheck?.toString();
    setStatusCheck(statusCheck);
    setTypeTicketCheck(typeToString);
  }, [detailArr]);

  const filterComponent = (value) => {
    switch (value) {
      case "1":
        return (
          <PopupPembuatanLokasi
            show={show}
            setShow={setShow}
            detailArr={detailArr}
            openPopUp={openPopUp}
            setOpenPopUp={setOpenPopUp}
            selectedId={selectedId}
            setDetailArr={setDetailArr}
            statusCheck={statusCheck}
            token={token}
            setSelectedId={setSelectedId}
          />
        );
      case "2":
        return (
          <PopupCreateGPS
            show={show}
            setShow={setShow}
            detailArr={detailArr}
            openPopUp={openPopUp}
            setOpenPopUp={setOpenPopUp}
            selectedId={selectedId}
            setDetailArr={setDetailArr}
            statusCheck={statusCheck}
            token={token}
            setSelectedId={setSelectedId}
          />
        );
      // case "29":
      //   return (
      //     <PopupSuperior
      //       show={show}
      //       setShow={setShow}
      //       detailArr={detailArr}
      //       openPopUp={openPopUp}
      //       setOpenPopUp={setOpenPopUp}
      //       selectedId={selectedId}
      //       setDetailArr={setDetailArr}
      //       statusCheck={statusCheck}
      //       token={token}
      //       setSelectedId={setSelectedId}
      //     />
      //   );
      // case "31":
      //   return (
      //     <PopupIDCard
      //       show={show}
      //       setShow={setShow}
      //       detailArr={detailArr}
      //       openPopUp={openPopUp}
      //       setOpenPopUp={setOpenPopUp}
      //       selectedId={selectedId}
      //       setDetailArr={setDetailArr}
      //       statusCheck={statusCheck}
      //       token={token}
      //       setSelectedId={setSelectedId}
      //     />
      //   );
      default:
        return null;
    }
  };

  return (
    <Col className="d-lg-flex align-items-start justify-content-end">
      <div
        type="button"
        className="btn btn-outline-primary btn-sm disabled-btn"
        onClick={() => {
          getArrDataPIC(dataId);
        }}
      >
        View Detail
      </div>
      {modalLoading && (
        <ProcessLoadingModal show={modalLoading} setShow={setModalLoading} />
      )}

      {filterComponent(typeTicketCheck)}
    </Col>
  );
};

export default CloseTicket;
