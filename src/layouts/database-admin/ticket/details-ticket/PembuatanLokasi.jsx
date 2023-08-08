import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import axios from "axios";

import ThreeDisabledInputs from "../../../../components/components/database-admin/elements/input/ThreeDisabledInputs";
import TwoDisabledInput from "../../../../components/components/database-admin/elements/input/TwoDisabledInputs";
import CardHeaderPICTicket from "../../../../components/components/database-admin/elements/CardHeaderPICTicket";
import SecondCardDetailPIC from "./SecondCardDetailPIC";
import DisabledInput from "../../../../components/components/dashboard/ticketing/elements/input/DisabledInput";
import TextForm from "../../../../components/components/dashboard/ticketing/elements/text/TextForm";
import FillInput from "../../../../components/components/dashboard/ticketing/elements/input/FillInput";
import NewTwoDisabledInputs from "../../../../components/components/database-admin/elements/input/NewTwoDisabledInputs";

const PembuatanLokasi = ({
  title,
  arrData,
  idTicket,
  token,
  uid,
  setSuccess,
  reOpenDetail,
  permissionUpdate,
  uidInCharge,
  regionList,
}) => {
  const [processModal, setProcessModal] = useState(false);
  const [solveModal, setSolveModal] = useState(false);
  const [revisionModal, setRevisionModal] = useState(false);
  const [revisionPIC, setRevisionPIC] = useState("");
  const [regionId, setRegionId] = useState(arrData[0]?.region_id);
  const [locCode, setLocCode] = useState(
    arrData ? arrData[0]?.location_code : null
  );
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
                location_grp_id: !regionId ? 1 : parseInt(regionId),
                location_code: locCode,
                issue_id: 1,
              }
            : {
                id: parseInt(idTicket),
                submit_by: "pic",
                status_to: status,
                note_pic: revisionPIC,
              }
          : {
              id: parseInt(idTicket),
              submit_by: "pic",
              uid_in_charge: uid,
              status_to: status,
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

  return (
    <>
      <Card className={`mb-3 pb-3 border-0 w-100`}>
        <Card.Header className="border-bottom px-4 py-3 d-flex flex-column flex-lg-row justify-content-between align-items-center w-100">
          <p className="mb-0 fw-bold text-gray-900">{title}</p>
        </Card.Header>
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
                <Row className="mt-2">
                  <Col xl={4} lg={4} md={4} sm={12} xs={12}>
                    <TextForm text="Type" />
                    <DisabledInput
                      type="text"
                      placeholder={data?.type_store}
                      value={data?.type_store}
                      className={`py-1`}
                    />
                  </Col>
                  <Col
                    xl={4}
                    lg={4}
                    md={4}
                    sm={12}
                    xs={12}
                    className="mt-2 mt-md-0"
                  >
                    <TextForm text="Location Code" />
                    {data?.status === "P" ? (
                      <FillInput
                        type="text"
                        placeholder={locCode}
                        value={locCode}
                        id="locCode"
                        name="locCOde"
                        className={`py-1`}
                        setState={setLocCode}
                      />
                    ) : (
                      <DisabledInput
                        type="text"
                        placeholder={data?.location_code}
                        value={data?.location_code}
                        className={`py-1`}
                      />
                    )}
                  </Col>
                  <Col
                    xl={4}
                    lg={4}
                    md={4}
                    sm={12}
                    xs={12}
                    className="mt-2 mt-md-0"
                  >
                    <TextForm text="Store Name" />
                    <DisabledInput
                      type="text"
                      placeholder={data?.store_name}
                      value={data?.store_name}
                      className={`py-1`}
                    />
                  </Col>
                </Row>
                <NewTwoDisabledInputs
                  text1="City / Districts"
                  value1={data?.city + ` - ` + data?.province}
                  text2="Address"
                  value2={data?.address}
                  classNameDiv="mt-2"
                />
                <NewTwoDisabledInputs
                  text1="Effective Date"
                  value1={data?.effective_date_alias}
                  text2="Note"
                  value2={data?.note_employee}
                  classNameDiv="mt-2"
                />
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
        setRevisionModal={setRevisionModal}
        revisionModal={revisionModal}
        changeStatus={changeStatus}
        ticketStatus={ticketStatus}
        setRevisionPIC={setRevisionPIC}
        reOpenDetail={reOpenDetail}
        permissionUpdate={permissionUpdate}
        uidInCharge={uidInCharge}
        uid={uid}
        regionList={regionList}
        setRegionId={setRegionId}
        locCode={locCode}
        loading={loading}
        warning={warning}
        setWarning={setWarning}
        warningMessage={warningMessage}
      />
    </>
  );
};

export default PembuatanLokasi;
