import React, { useState, useEffect } from "react";
import axios from "axios";

import { saveAs } from "file-saver";
import { Button, Card, Form } from "react-bootstrap";
import DisabledInput from "../../../../components/components/dashboard/ticketing/elements/input/DisabledInput";
import TextForm from "../../../../components/components/dashboard/ticketing/elements/text/TextForm";
import ThreeDisabledInputs from "../../../../components/components/database-admin/elements/input/ThreeDisabledInputs";
import ViewFileClick from "../../../../components/components/dashboard/ticketing/elements/input/ViewFileClick";
import CardHeaderPICTicket from "../../../../components/components/database-admin/elements/CardHeaderPICTicket";
import PreviewFile from "../../../../components/components/dashboard/ticketing/elements/modal/PreviewFile";
import SecondCardDetailPIC from "./SecondCardDetailPIC";

const PenggantianIDCardPIC = ({
  arrData,
  token,
  uid,
  idTicket,
  setSuccess,
  reOpenDetail,
  permissionUpdate,
  uidInCharge,
}) => {
  const [processModal, setProcessModal] = useState(false);
  const [solveModal, setSolveModal] = useState(false);
  const [show, setShow] = useState(false);
  const [showIDCard, setShowIDCard] = useState(false);
  const [revisionPIC, setRevisionPIC] = useState("");

  const [linkPasPhoto, setLinkPasPhoto] = useState("");
  const [linkConditionalPhoto, setLinkConditionalPhoto] = useState("");
  const [linkForm, setLinkForm] = useState("");

  const changeStatus = async (e, setStatus) => {
    e.preventDefault();
    try {
      let dataInput =
        setStatus === "R" || setStatus === "S"
          ? setStatus === "S"
            ? {
                ticket_id: idTicket,
                status: setStatus,
                note_pic: revisionPIC,
              }
            : {
                ticket_id: idTicket,
                status: setStatus,
                uid_in_charge: uid,
                note_pic: revisionPIC,
              }
          : {
              ticket_id: idTicket,
              status: setStatus,
              uid_in_charge: uid,
            };

      await axios
        .post("/services/ticketing/update-ticket-status", dataInput, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res?.status === 200) {
            if (setStatus === "S") {
              setSolveModal(false);
              setSuccess(true);
              setTimeout(() => {
                window.location.reload(true);
              }, 1500);
            } else {
              window.location.reload(true);
            }
          }
        });
    } catch (err) {
      return err;
    }
  };

  const ticketStatus = arrData ? arrData[0]?.status : null;

  useEffect(() => {
    // Pas Photo
    arrData?.map((data) => {
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
    arrData?.map((data) => {
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
    arrData?.map((data) => {
      let files = data?.files;
      let newData = files?.filter(
        (data) => data?.collection_name === "form_kehilangan"
      );
      newData?.map((data) => {
        let url = data?.file_url;
        return setLinkForm(url);
      });
    });
  }, [arrData]);

  return (
    <>
      <Card className={`mb-3 pb-3 border-0 w-100`}>
        <CardHeaderPICTicket
          token={token}
          title="REQUEST PERGANTIAN ID CARD"
          idTicket={idTicket}
          changeStatus={changeStatus}
          ticketStatus={ticketStatus}
          setRevisionPIC={setRevisionPIC}
          permissionUpdate={permissionUpdate}
          uidInCharge={uidInCharge}
          uid={uid}
        />
        <Card.Body className="pb-1">
          {arrData?.map((data, id) => {
            return (
              <div key={id}>
                <ThreeDisabledInputs
                  text1="NIK"
                  value1={data?.nik}
                  text2="Employee Name"
                  value2={data?.nama}
                  text3="Division"
                  value3={data?.div}
                />
                {data?.reason_submission === "KEHILANGAN" ? (
                  <>
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
                          setShow={setShow}
                        />
                      </div>
                      <PreviewFile
                        setShow={setShow}
                        show={show}
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
                    <Form.Group className="w-100 w-md-75 mt-3 mt-md-0">
                      <TextForm text="Note" />
                      <DisabledInput
                        type="text"
                        placeholder={data?.note_employee}
                        value={data?.note_employee}
                        className="py-1"
                      />
                    </Form.Group>
                  </>
                ) : (
                  <>
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
                          setShow={setShow}
                        />
                      </div>
                      <PreviewFile
                        setShow={setShow}
                        show={show}
                        src={linkPasPhoto}
                      />
                      <div className="w-100 w-md-50">
                        <ViewFileClick
                          text="ID Card Photo"
                          placeholder="condition_photo.jpg"
                          value="condition_photo.jpg"
                          setShow={setShowIDCard}
                        />
                      </div>
                      <PreviewFile
                        setShow={setShowIDCard}
                        show={showIDCard}
                        src={linkConditionalPhoto}
                      />
                    </div>
                    <Form.Group className="w-100 w-md-75 mt-3 mt-md-0">
                      <TextForm text="Note" />
                      <DisabledInput
                        type="text"
                        placeholder={data?.note_employee}
                        value={data?.note_employee}
                        className="py-1"
                      />
                    </Form.Group>
                  </>
                )}
              </div>
            );
          })}
        </Card.Body>
      </Card>

      <SecondCardDetailPIC
        arrData={arrData}
        setProcessModal={setProcessModal}
        processModal={processModal}
        setSolveModal={setSolveModal}
        solveModal={solveModal}
        changeStatus={changeStatus}
        ticketStatus={ticketStatus}
        setRevisionPIC={setRevisionPIC}
        reOpenDetail={reOpenDetail}
        permissionUpdate={permissionUpdate}
        uidInCharge={uidInCharge}
        uid={uid}
      />
    </>
  );
};

export default PenggantianIDCardPIC;
