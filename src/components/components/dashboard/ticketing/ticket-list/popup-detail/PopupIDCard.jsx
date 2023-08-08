import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Form, Button } from "react-bootstrap";
import { saveAs } from "file-saver";
import ButtonBadgePIC from "../../../../../../layouts/database-admin/ticket/elements/ButtonBadgePIC";
import PopupReopenTicket from "../PopupReopenTicket";
import TextForm from "../../elements/text/TextForm";
import DisabledInput from "../../elements/input/DisabledInput";
import ErrorAlert from "../../elements/alerts/ErrorAlert";
import ViewFileClick from "../../elements/input/ViewFileClick";
import PreviewFile from "../../elements/modal/PreviewFile";
import NewRevisionIDCard from "./revision-detail/NewRevisionIDCard";
import TwoDisabledInput from "../../../../database-admin/elements/input/TwoDisabledInputs";
import ProcessLoadingModal from "../../../../elements/modal/ProcessLoadingModal";

const PopupIDCard = ({
  show,
  setShow,
  detailArr,
  setOpenPopUp,
  openPopUp,
  selectedId,
  setDetailArr,
  statusCheck,
  token,
  setSelectedId,
}) => {
  const [arrId, setArrId] = useState("");
  const [reopenReason, setReopenReason] = useState("");
  const [notePIC, setNotePIC] = useState("");
  const [wrongTicket, setWrongTicket] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showFile, setShowFile] = useState(false);
  const [showIDCard, setShowIDCard] = useState(false);

  const [linkPasPhoto, setLinkPasPhoto] = useState("");
  const [linkConditionalPhoto, setLinkConditionalPhoto] = useState("");
  const [linkForm, setLinkForm] = useState("");

  const [warningClose, setWarningClose] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [closedDate, setClosedDate] = useState("");

  const handlePopUp = () => {
    setOpenPopUp(true);
    setShow(false);
  };

  const handleClose = () => {
    setDetailArr([]);
    setShow(false);
    setSelectedId(0);
  };

  const postReOpen = async (status) => {
    const idToString = selectedId?.toString();
    try {
      setDisableButton(true);
      setModalLoading(true);
      let dataInput =
        status === "P"
          ? {
              ticket_id: idToString,
              reason_for_re_open: reopenReason,
              status: "P",
            }
          : {
              ticket_id: idToString,
              status: "C",
            };
      await axios
        .post(`/services/ticketing/update-ticket-status`, dataInput, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setModalLoading(false);
          setDisableButton(false);
          if (res?.status === 200) {
            return window.location.reload(true);
          } else {
            setErrorMessage(res?.data?.message);
            if (status === "P") {
              setWrongTicket(true);
            } else {
              setWarningClose(true);
            }
          }
        });
    } catch (err) {
      return err;
    }
  };
  useEffect(() => {
    const arrId = detailArr ? detailArr[0]?.id : "";
    setArrId(arrId);

    const notePIC = detailArr ? detailArr[0]?.note_pic : "";
    setNotePIC(notePIC);

    const closedDate = detailArr ? detailArr[0]?.close_at : "";
    setClosedDate(closedDate);
  }, [detailArr]);

  useEffect(() => {
    // Pas Photo
    detailArr?.map((data) => {
      let files = data?.files;
      let newData = files?.filter(
        (data) => data?.collection_name === "pas_photo"
      );
      newData?.map((data) => {
        let url = data?.file_url;
        return setLinkPasPhoto(url);
      });
    });

    // Conditional Photo
    detailArr?.map((data) => {
      let files = data?.files;
      let newData = files?.filter(
        (data) => data?.collection_name === "condition_photo"
      );
      newData?.map((data) => {
        let url = data?.file_url;
        return setLinkConditionalPhoto(url);
      });
    });

    // Form Kehilangan
    detailArr?.map((data) => {
      let files = data?.files;
      let newData = files?.filter(
        (data) => data?.collection_name === "form_kehilangan"
      );
      newData?.map((data) => {
        let url = data?.file_url;
        return setLinkForm(url);
      });
    });
  }, [detailArr]);

  return (
    <>
      {arrId === selectedId && (
        <PopupReopenTicket
          show={show}
          setShow={setShow}
          setDetailArr={setDetailArr}
          dialogClassName={"my-modal"}
          handleClose={handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title className="fw-bold">
              REQUEST PERGANTIAN ID CARD
            </Modal.Title>
          </Modal.Header>

          {statusCheck !== "R" &&
            detailArr?.map((data, id) => {
              return (
                <Modal.Body className="body-modal-detail-ticket" key={id}>
                  {data?.reason_submission === "KEHILANGAN" ? (
                    <div>
                      <div className="d-flex w-100 mb-3 flex-column flex-md-row">
                        <div className="w-100 w-md-50">
                          <TextForm text="Reason for Submission" />
                          <DisabledInput
                            type="text"
                            placeholder={data?.reason_submission}
                            value={data?.reason_submission}
                            className={`py-1`}
                          />
                        </div>

                        <div className="mx-0 mx-md-3 my-3 my-md-0 w-100 w-md-50">
                          <ViewFileClick
                            text="Employee Photo"
                            className="pic-ticketing-file"
                            placeholder="pas_photo.jpg"
                            value="pas_photo.jpg"
                            setShow={setShowFile}
                          />
                        </div>

                        <PreviewFile
                          setShow={setShowFile}
                          show={showFile}
                          src={linkPasPhoto}
                        />
                        <div className="w-100 w-md-50">
                          <TextForm text="Form" />
                          <Form.Group className="d-flex preview-file-btn preview-file-btn-custom ">
                            <Button
                              onClick={() => saveAs(linkForm)}
                              className="input-default"
                            >
                              Download
                            </Button>
                            <DisabledInput
                              type="text"
                              placeholder="form_kehilangan.xls"
                              value="form_kehilangan.xls"
                            />
                          </Form.Group>
                        </div>
                      </div>
                      <TwoDisabledInput
                        text1="Note"
                        value1={data?.note_employee}
                        className1="w-100 w-md-75"
                        disableForm2={true}
                      />
                    </div>
                  ) : (
                    <div>
                      <div className="d-flex w-100 mb-3 flex-column flex-md-row">
                        <div className="w-100 w-md-50">
                          <TextForm text="Reason for Submission" />
                          <DisabledInput
                            type="text"
                            placeholder={data?.reason_submission}
                            value={data?.reason_submission}
                            className={`py-1`}
                          />
                        </div>

                        <div className="mx-0 mx-md-3 my-3 my-md-0 w-100 w-md-50">
                          <ViewFileClick
                            text="Employee Photo"
                            placeholder="pas_photo.jpg"
                            value="pas_photo.jpg"
                            setShow={setShowFile}
                          />
                        </div>
                        <PreviewFile
                          setShow={setShowFile}
                          show={showFile}
                          src={linkPasPhoto}
                        />
                        <div className="w-100 w-md-50">
                          <ViewFileClick
                            text="ID Card Photo"
                            placeholder={`condition_photo.jpg`}
                            value={`condition_photo.jpg`}
                            setShow={setShowIDCard}
                          />
                        </div>
                        <PreviewFile
                          setShow={setShowIDCard}
                          show={showIDCard}
                          src={linkConditionalPhoto}
                        />
                      </div>
                      <TwoDisabledInput
                        text1="Note"
                        value1={data?.note_employee}
                        className1="w-100 w-md-75"
                        disableForm2={true}
                      />
                    </div>
                  )}
                </Modal.Body>
              );
            })}

          {statusCheck === "R" && (
            <NewRevisionIDCard
              detailArr={detailArr}
              show={show}
              token={token}
              selectedId={selectedId}
            />
          )}
          {(statusCheck === "A" || statusCheck === "F") && (
            <Modal.Body className="py-0">
              <div className="d-flex justify-content-start flex-column flex-md-row w-100 mb-3">
                <div className="w-100 w-md-75 mb-3 mb-md-0">
                  <TextForm text="Note PIC" />
                  <DisabledInput
                    type="text"
                    placeholder={notePIC}
                    value={notePIC}
                    className="wrapper-div"
                  />
                </div>
                {statusCheck === "F" && (
                  <div className="w-100 w-md-25 ms-3">
                    <TextForm text="Closed Date" />
                    <DisabledInput
                      type="text"
                      placeholder={closedDate}
                      value={closedDate}
                      className="wrapper-div"
                    />
                  </div>
                )}
              </div>
              {statusCheck === "A" && (
                <div className="w-100 d-flex justify-content-end btn-z-index">
                  <ButtonBadgePIC
                    text="Re-Open"
                    className="mb-0"
                    bg="outline-primary"
                    onClick={handlePopUp}
                    condition={disableButton}
                  />

                  <ButtonBadgePIC
                    text="Close"
                    className="mb-0 ms-3"
                    bg="primary"
                    onClick={() => postReOpen("C")}
                    condition={disableButton}
                  />
                </div>
              )}
            </Modal.Body>
          )}
        </PopupReopenTicket>
      )}

      <PopupReopenTicket
        show={openPopUp}
        setShow={setOpenPopUp}
        setDetailArr={setDetailArr}
      >
        <p className="lh-sm fw-bolder">
          Are you sure want to re-open this ticket?
        </p>
        {wrongTicket && (
          <ErrorAlert setState={setOpenPopUp} text1={errorMessage} />
        )}
        <p className="text-start mb-1 fs-5">Re-Open Reason:</p>
        <Form.Control
          as="textarea"
          rows={3}
          id="note"
          name="note"
          placeholder="Note"
          onChange={(e) => setReopenReason(e.target.value)}
        />
        <div className="w-100 d-flex justify-content-end">
          <ButtonBadgePIC
            text="Submit"
            className="mb-0 mt-3"
            onClick={() => postReOpen("P")}
          />
        </div>
      </PopupReopenTicket>
      {modalLoading && (
        <ProcessLoadingModal show={modalLoading} setShow={setModalLoading} />
      )}
    </>
  );
};

export default PopupIDCard;
