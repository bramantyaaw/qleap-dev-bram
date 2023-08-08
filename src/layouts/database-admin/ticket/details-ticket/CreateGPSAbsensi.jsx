import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import axios from "axios";
import ThreeDisabledInputs from "../../../../components/components/database-admin/elements/input/ThreeDisabledInputs";
import CardHeaderPICTicket from "../../../../components/components/database-admin/elements/CardHeaderPICTicket";
import SecondCardDetailPIC from "./SecondCardDetailPIC";
import TwoDisabledInput from "../../../../components/components/database-admin/elements/input/TwoDisabledInputs";
import DisabledInput from "../../../../components/components/dashboard/ticketing/elements/input/DisabledInput";
import TextForm from "../../../../components/components/dashboard/ticketing/elements/text/TextForm";
import FillInput from "../../../../components/components/dashboard/ticketing/elements/input/FillInput";
import SelectAutocorrect from "../../../../components/components/dashboard/ticketing/elements/form-select/SelectAutocorrect";
import { GMTData } from "../../../../data/selfservices/GMTData";

const CreateGPSAbsensi = ({
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
  const [revisionModal, setRevisionModal] = useState(false);
  const [revisionPIC, setRevisionPIC] = useState("");
  const [gmt, setGmt] = useState(arrData ? arrData[0]?.gmt : null);

  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  const changeStatus = async (e, status) => {
    e.preventDefault();
    try {
      setLoading(true);
      let dataInput =
        status === "R" || status === "A"
          ? status === "A"
            ? {
                id: parseInt(idTicket),
                submit_by: "pic",
                status_to: status,
                note_pic: revisionPIC,
                gmt_time: gmt,
                issue_id: 2,
              }
            : {
                id: parseInt(idTicket),
                submit_by: "pic",
                status_to: status,
                uid_in_charge: uid,
                note_pic: revisionPIC,
              }
          : {
              id: parseInt(idTicket),
              submit_by: "pic",
              status_to: status,
              uid_in_charge: uid,
            };

      await axios
        .post("/services/ticketing/update-ticket", dataInput, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res?.status === 200) {
            if (status === "A") {
              setSolveModal(false);
              setSuccess(true);
              setTimeout(() => {
                window.location.reload(true);
                setLoading(false);
              }, 1500);
            } else {
              window.location.reload(true);
              setLoading(false);
            }
          } else {
            setLoading(false);
            setWarning(true);
            return setWarningMessage(res?.data?.message);
          }
        });
    } catch (err) {
      return err;
    }
  };
  const ticketStatus = arrData ? arrData[0]?.status : null;

  const handleGMT = (selectedOption) => {
    setGmt(selectedOption?.value);
  };

  return (
    <>
      <Card className={`mb-3 pb-3 border-0 w-100`}>
        <CardHeaderPICTicket
          token={token}
          title="CREATE NEW GPS"
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
                <ThreeDisabledInputs
                  text1="Location Name"
                  value1={data?.location_name}
                  text2="GPS Name"
                  value2={data?.gps_name}
                  text3="Coordinate Point"
                  value3={data?.coordinate_point}
                  classNameDiv="mt-2"
                />
                <Row className="mt-2">
                  <Col xl={4} lg={4} md={4} sm={12} xs={12}>
                    <div>
                      <TextForm text="GMT" />
                      {data?.status === "P" ? (
                        // <FillInput
                        //   type="number"
                        //   placeholder={gmt}
                        //   value={gmt}
                        //   id="gmt"
                        //   name="gmt"
                        //   className={`py-1`}
                        //   setState={setGmt}
                        // />
                        <SelectAutocorrect
                          handleChange={handleGMT}
                          arrData={GMTData}
                          placeholder={gmt}
                        />
                      ) : (
                        <DisabledInput
                          type="text"
                          placeholder={data?.gmt}
                          value={data?.gmt}
                          className={`py-1`}
                        />
                      )}
                    </div>
                  </Col>
                  <Col xl={8} lg={8} md={8} sm={12} xs={12}>
                    <div className="mt-2 mt-md-0">
                      <TextForm text="Note" />
                      <DisabledInput
                        type="text"
                        placeholder={data?.note_employee}
                        value={data?.note_employee}
                        className={`py-1`}
                      />
                    </div>
                  </Col>
                </Row>
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
        setRevisionModal={setRevisionModal}
        revisionModal={revisionModal}
        loading={loading}
        warning={warning}
        setWarning={setWarning}
        warningMessage={warningMessage}
      />
    </>
  );
};

export default CreateGPSAbsensi;
