import React, { useState } from "react";
import axios from "axios";
import { Card, Button, Form } from "react-bootstrap";
import { saveAs } from "file-saver";
import DisabledInput from "../../../../components/components/dashboard/ticketing/elements/input/DisabledInput";
import TextForm from "../../../../components/components/dashboard/ticketing/elements/text/TextForm";
import SecondCardDetailPIC from "./SecondCardDetailPIC";
import CardHeaderPICTicket from "../../../../components/components/database-admin/elements/CardHeaderPICTicket";
import ThreeDisabledInputs from "../../../../components/components/database-admin/elements/input/ThreeDisabledInputs";

const UpdateSuperior = ({
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
  const [revisionPIC, setRevisionPIC] = useState("");

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

  const saveFile = (value) => {
    const link = value ? value[0]?.file_url : null;
    saveAs(link);
  };

  const ticketStatus = arrData ? arrData[0]?.status : null;

  return (
    <>
      <Card className={`mb-3 pb-3 border-0 w-100`}>
        <CardHeaderPICTicket
          token={token}
          title="UPDATE SUPERIOR DAN SUPER SUPERIOR"
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
                <Form.Group className="d-flex w-100 mb-3 flex-column flex-md-row ">
                  <Form.Group className="me-0 me-md-3 w-100 w-md-25">
                    <TextForm text="Form Update Superior" />
                    <Form.Group className="d-flex preview-file-btn preview-file-btn-custom ">
                      <Button onClick={() => saveFile(data?.files)}>
                        Download
                      </Button>
                      <DisabledInput
                        type="text"
                        placeholder="Update Superior .xls"
                        value="Update Superior .xls"
                      />
                    </Form.Group>
                  </Form.Group>
                  <Form.Group className="w-100 w-md-75 mt-3 mt-md-0">
                    <TextForm text="Note" />
                    <DisabledInput
                      type="text"
                      placeholder={data?.note_employee}
                      value={data?.note_employee}
                      className="py-1"
                    />
                  </Form.Group>
                </Form.Group>
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

export default UpdateSuperior;
