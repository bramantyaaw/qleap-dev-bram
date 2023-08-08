import React, { useEffect, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import ThreeDisabledInputs from "../../../../components/components/database-admin/elements/input/ThreeDisabledInputs";
import ModalPICTicket from "../../../../components/components/database-admin/elements/ModalPICTicket";
import ButtonCardTicket from "../../../../components/components/database-admin/elements/ButtonCardTicket";
import TwoDisabledInput from "../../../../components/components/database-admin/elements/input/TwoDisabledInputs";
import DisabledInput from "../../../../components/components/dashboard/ticketing/elements/input/DisabledInput";
import TextForm from "../../../../components/components/dashboard/ticketing/elements/text/TextForm";
import IssueDropdown from "../../../../components/components/dashboard/ticketing/elements/dropdown/IssueDropdown";
import ErrorAlert from "../../../../components/components/dashboard/ticketing/elements/alerts/ErrorAlert";
import NewTwoDisabledInputs from "../../../../components/components/database-admin/elements/input/NewTwoDisabledInputs";

const SecondCardDetailPIC = ({
  arrData,
  setProcessModal,
  processModal,
  setSolveModal,
  solveModal,
  changeStatus,
  ticketStatus,
  setRevisionPIC,
  reOpenDetail,
  permissionUpdate,
  uidInCharge,
  uid,
  regionList,
  setRegionId,
  setRevisionModal,
  revisionModal,
  locCode,
  loading,
  warning,
  warningMessage,
  setWarning,
}) => {
  const [reOpenNote, setReOpenNote] = useState("");

  let status = "";
  let classNameStatus = "";

  const getStatus = (value) => {
    switch (value) {
      case "S":
        return (status = "OPEN");
      case "P":
        return (status = "PROCESS");
      case "A":
        return (status = "SOLVED");
      case "F":
        return (status = "CLOSED");
      case "R":
        return (status = "REVISION");
      default:
        return null;
    }
  };
  const getStatusColor = (value) => {
    switch (value) {
      case "S":
        return (classNameStatus = "text-dark-info");
      case "P":
        return (classNameStatus = "text-warning");
      case "A":
        return (classNameStatus = "text-success");
      case "F":
        return (classNameStatus = "text-secondary");
      case "R":
        return (classNameStatus = "text-danger");
      default:
        return null;
    }
  };

  useEffect(() => {
    const noteReOpen = reOpenDetail ? reOpenDetail[0]?.reason_for_re_open : "";
    setReOpenNote(noteReOpen);
  }, [reOpenDetail]);

  return (
    <>
      <Card className={`mb-3 pb-3 border-0 w-100`}>
        <Card.Body className="pb-1">
          {reOpenDetail?.length !== 0 ? (
            <>
              {arrData?.map((data, id) => {
                return (
                  <div key={id}>
                    {reOpenDetail?.map((item, id) => {
                      return (
                        <div key={id}>
                          <ThreeDisabledInputs
                            text1="PIC Person"
                            value1={data?.pic_name}
                            text2="Submit Date"
                            value2={data?.created_at}
                            text3="Solved Date 1"
                            value3={item?.previous_solve_at}
                          />
                        </div>
                      );
                    })}
                    <NewTwoDisabledInputs
                      isBiggerLeft
                      text1="Re-Open Reason"
                      value1={reOpenNote}
                      className1="w-100 w-md-75"
                      text2="Solved Date 2"
                      value2={data?.close_at}
                      className2="w-100 w-md-25"
                      classNameDiv="mt-2"
                    />
                    {data?.issue_id === 1 ? (
                      <Row className="mt-2">
                        <Col xl={4} lg={4} md={4} sm={12} xs={12}>
                          <TextForm text="Status" />
                          <DisabledInput
                            type="text"
                            placeholder={getStatus(data?.status)}
                            value={getStatus(data?.status)}
                            className={`py-1 ${getStatusColor(data?.status)}`}
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
                          <TextForm text="Region" />
                          {data?.status === "P" ? (
                            <IssueDropdown
                              setSelected={setRegionId}
                              data={regionList}
                              className="py-1 text-kinda-dark"
                            />
                          ) : (
                            <DisabledInput
                              type="text"
                              placeholder={data?.region}
                              value={data?.region}
                              className={`py-1`}
                            />
                          )}
                        </Col>
                      </Row>
                    ) : (
                      <ThreeDisabledInputs
                        text1="Status"
                        value1={getStatus(data?.status)}
                        className1="w-100 w-md-25"
                        disabledClassName1={getStatusColor(data?.status)}
                        isSecNull={true}
                        isThirdNull={true}
                      />
                    )}
                    {permissionUpdate
                      ? (uidInCharge === uid ||
                          uidInCharge === "-" ||
                          uidInCharge === null) && (
                          <ButtonCardTicket
                            arrData={arrData}
                            setProcessModal={setProcessModal}
                            setSolveModal={setSolveModal}
                            ticketStatus={ticketStatus}
                            setRevisionModal={setRevisionModal}
                            locCode={locCode}
                          />
                        )
                      : null}
                  </div>
                );
              })}
            </>
          ) : (
            <>
              {arrData?.map((data, id) => {
                return (
                  <div key={id}>
                    <ThreeDisabledInputs
                      text1="PIC Person"
                      value1={data?.pic_name}
                      text2="Submit Date"
                      value2={data?.created_at}
                      text3="Close Date"
                      value3={data?.close_at}
                    />
                    {data?.issue_id === 1 ? (
                      <Row className="mt-2">
                        <Col xl={4} lg={4} md={4} sm={12} xs={12}>
                          <TextForm text="Status" />
                          <DisabledInput
                            type="text"
                            placeholder={getStatus(data?.status)}
                            value={getStatus(data?.status)}
                            className={`py-1 ${getStatusColor(data?.status)}`}
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
                          <TextForm text="Region" />
                          {data?.status === "P" ? (
                            <IssueDropdown
                              setSelected={setRegionId}
                              data={regionList}
                              defaultValue={data?.region_id}
                              className="py-1 text-kinda-dark"
                            />
                          ) : (
                            <DisabledInput
                              type="text"
                              placeholder={data?.region}
                              value={data?.region}
                              className={`py-1`}
                            />
                          )}
                        </Col>
                      </Row>
                    ) : (
                      <ThreeDisabledInputs
                        text1="Status"
                        value1={getStatus(data?.status)}
                        className1="w-100 w-md-25"
                        disabledClassName1={getStatusColor(data?.status)}
                        isSecNull={true}
                        isThirdNull={true}
                        classNameDiv="mt-2"
                      />
                    )}

                    {permissionUpdate
                      ? (uidInCharge === uid ||
                          uidInCharge === "-" ||
                          uidInCharge === "" ||
                          !uidInCharge) && (
                          <ButtonCardTicket
                            arrData={arrData}
                            setProcessModal={setProcessModal}
                            setSolveModal={setSolveModal}
                            ticketStatus={ticketStatus}
                            setRevisionModal={setRevisionModal}
                            locCode={locCode}
                          />
                        )
                      : null}
                  </div>
                );
              })}
            </>
          )}
        </Card.Body>
      </Card>
      <ModalPICTicket
        setShow={setProcessModal}
        show={processModal}
        buttonClassName="py-2 px-3 h4"
        onClick={changeStatus}
        detail="P"
        title="Caution"
        loading={loading}
      >
        {warning && <ErrorAlert setState={setWarning} text1={warningMessage} />}
        <p className="mb-0 text-kinda-dark">
          Are you sure will process this ticket ?
        </p>
      </ModalPICTicket>

      <ModalPICTicket
        setShow={setSolveModal}
        show={solveModal}
        buttonClassName="py-2 px-3 h4"
        title="Are you sure you have solved this ticket?"
        className="text-center w-100"
        onClick={changeStatus}
        detail="A"
        loading={loading}
      >
        {warning && <ErrorAlert setState={setWarning} text1={warningMessage} />}
        <Form.Control
          as="textarea"
          rows={3}
          id="note"
          name="note"
          placeholder="Notes"
          onChange={(e) => setRevisionPIC(e.target.value)}
        />
      </ModalPICTicket>

      <ModalPICTicket
        setShow={setRevisionModal}
        show={revisionModal}
        buttonClassName="py-2 px-3 h4"
        title="Are you sure revision request this ticket?"
        className="text-center w-100"
        onClick={changeStatus}
        detail="R"
        loading={loading}
      >
        {warning && <ErrorAlert setState={setWarning} text1={warningMessage} />}
        <Form.Control
          as="textarea"
          rows={3}
          id="note"
          name="note"
          placeholder="Notes"
          onChange={(e) => setRevisionPIC(e.target.value)}
        />
      </ModalPICTicket>
    </>
  );
};

export default SecondCardDetailPIC;
