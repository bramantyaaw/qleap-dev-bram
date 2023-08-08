import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Modal, Row } from "react-bootstrap";
import TextForm from "../../../elements/text/TextForm";
import FillInput from "../../../elements/input/FillInput";
import DisabledInput from "../../../elements/input/DisabledInput";
import ButtonBadgePIC from "../../../../../../../layouts/database-admin/ticket/elements/ButtonBadgePIC";
import SelectAutocorrect from "../../../elements/form-select/SelectAutocorrect";
import ProcessLoadingModal from "../../../../../elements/modal/ProcessLoadingModal";
import ErrorAlert from "../../../elements/alerts/ErrorAlert";
import { GMTData } from "../../../../../../../data/selfservices/GMTData";
import NewTwoDisabledInputs from "../../../../../database-admin/elements/input/NewTwoDisabledInputs";

const RevisionCreateGPS = ({ detailArr, show, token, selectedId }) => {
  const [coordinate, setCoordinate] = useState("");
  const [noteEmployee, setNoteEmployee] = useState("");
  const [gpsName, setGpsName] = useState("");
  const [locId, setLocId] = useState("");
  const [locAddr, setLocAddr] = useState("");
  const [locCityDistrict, setLocCityDistrict] = useState("");
  const [gmt, setGmt] = useState("");
  const [listLocation, setListLocation] = useState([]);

  const [lastCoordinate, setLastCoordinate] = useState("");
  const [lastNote, setLastNote] = useState("");
  // const [lastLocId, setLastLocId] = useState("");
  // const [lastGpsName, setLastGpsName] = useState("");
  const [lastGmt, setLastGmt] = useState("");

  const [newCoordinate, setNewCoordinate] = useState("");
  const [newNoteEmployee, setNewNoteEmployee] = useState("");
  // const [newLocId, setNewLocId] = useState("");
  // const [newGpsName, setNewGpsName] = useState("");
  const [newGmt, setNewGmt] = useState("");

  const [warning, setWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [errorRegex, setErrorRegex] = useState(false);

  const checkerRevision = () => {
    updateTicketData();
  };

  const checkerNewCoordinate = () => {
    if (coordinate?.trim() === "") {
      return setNewCoordinate(lastCoordinate);
    } else {
      setNewCoordinate(coordinate);
    }
  };

  const checkerNewNote = () => {
    if (noteEmployee?.trim() === "") {
      return setNewNoteEmployee(lastNote);
    } else {
      setNewNoteEmployee(noteEmployee);
    }
  };

  // const checkerNewLocId = () => {
  //   if (locId === 0) {
  //     return setNewLocId(lastLocId);
  //   } else {
  //     setNewLocId(locId);
  //   }
  // };

  const handleGMT = (selectedOption) => {
    setGmt(selectedOption?.value);
  };

  const checkerNewGmt = () => {
    if (gmt?.trim() === "") {
      return setNewGmt(lastGmt);
    } else {
      setNewGmt(gmt);
    }
  };

  const updateTicketData = async () => {
    const regex = /^(?=.*\d)(?=.*\.)(?=.*\s)(?=.*,)[^\p{L}]+$/;
    let coordinateRegex = regex.test(newCoordinate);
    if (coordinateRegex === true) {
      try {
        setDisableButton(true);
        setModalLoading(true);
        await axios
          .post(
            `/services/ticketing/update-ticket`,
            {
              issue_id: 2,
              id: parseInt(selectedId),
              loc_id: locId,
              coordinate_point: newCoordinate,
              note_employee: newNoteEmployee,
              gmt_time: newGmt,
              gps_name: gpsName,
              submit_by: "employee",
              status_to: "P",
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then((res) => {
            setModalLoading(false);
            setDisableButton(false);
            if (res?.status === 200) {
              return window.location.reload(true);
            } else {
              setWarning(true);
              return setWarningMessage(res?.data?.message);
            }
          });
      } catch (err) {
        setModalLoading(false);
        return err;
      }
    } else {
      setErrorRegex(true);
    }
  };

  const fetchListLocation = async () => {
    try {
      const { data } = await axios.get("/master/get-location-id", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const newData = data?.data;
      const filteredData = newData?.filter(
        (data) => data?.locName !== "(None)"
      );
      const objData = filteredData?.map((data) => {
        return {
          value: data?.locId,
          label: data?.locName,
        };
      });

      setListLocation(objData);
    } catch (err) {
      return err;
    }
  };

  const handleChangeLocation = (selectedOption) => {
    setLocId(selectedOption?.value);
    // eslint-disable-next-line
  };

  const fetchLocation = async () => {
    try {
      await axios
        .post(
          "/master/get-location",
          {
            params: locId,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          if (res?.status === 200) {
            const newData = res?.data?.data;
            setLocAddr(newData?.locAddr);
            setLocCityDistrict(newData?.locCity);
            setGpsName(newData?.locName);
          }
        });
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    fetchLocation();
    // eslint-disable-next-line
  }, [locId]);

  useEffect(() => {
    fetchListLocation();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // Coordinate
    let coordinate = detailArr && detailArr[0]?.coordinate_point;
    setLastCoordinate(coordinate);

    // Note
    let note = detailArr && detailArr[0]?.note_employee;
    setLastNote(note);

    // locId
    let locId = detailArr && detailArr[0]?.location_id;
    setLocId(locId);

    // gmt
    let gmt = detailArr && detailArr[0]?.gmt;
    setLastGmt(gmt);
  }, [detailArr]);

  useEffect(() => {
    checkerNewCoordinate();
    // eslint-disable-next-line
  }, [coordinate, lastCoordinate]);

  useEffect(() => {
    checkerNewNote();
    // eslint-disable-next-line
  }, [noteEmployee, lastNote]);

  // useEffect(() => {
  //   checkerNewLocId();
  //   // eslint-disable-next-line
  // }, [locId, lastLocId]);

  // useEffect(() => {
  //   checkerNewGpsName();
  //   // eslint-disable-next-line
  // }, [gpsName, lastGpsName]);

  useEffect(() => {
    checkerNewGmt();
    // eslint-disable-next-line
  }, [gmt, lastGmt]);

  return (
    <>
      {detailArr?.map((data, id) => {
        return (
          <div key={id}>
            <Modal.Body className="body-modal-detail-ticket">
              {warning && (
                <div className="mb-3">
                  <ErrorAlert setState={setWarning} text1={warningMessage} />
                </div>
              )}
              {errorRegex && (
                <div className="mb-3">
                  <ErrorAlert
                    setState={setErrorRegex}
                    text1="Mohon cantumkan format coordinate yang sesuai"
                    className="mb-0"
                  />
                </div>
              )}

              <Row className="mt-2">
                <Col xl={4} lg={4} md={4} sm={12} xs={12}>
                  <TextForm text="Location Name" />
                  <SelectAutocorrect
                    handleChange={handleChangeLocation}
                    arrData={listLocation}
                    placeholder={data?.location_name}
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
                  <TextForm text="GPS Name" />
                  <FillInput
                    type="text"
                    id="test-name"
                    // placeholder={data?.gps_name}
                    value={gpsName}
                    className={`py-1 wrapper-div`}
                    setState={setGpsName}
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
                  <TextForm text="Coordinate Point" />
                  <FillInput
                    type="text"
                    id="test-name"
                    placeholder={data?.coordinate_point}
                    className={`py-1 wrapper-div`}
                    setState={setCoordinate}
                  />
                </Col>
              </Row>
              <NewTwoDisabledInputs
                text1="City / Districts"
                value1={locCityDistrict}
                text2="Address"
                value2={locAddr}
                classNameDiv="mt-2"
              />

              <Row className="mt-2">
                <Col xl={4} lg={4} md={4} sm={12} xs={12}>
                  <TextForm text="GMT" />
                  {/* <FillInput
                      type="number"
                      id="test-name"
                      placeholder={data?.gmt}
                      className={`py-1 wrapper-div`}
                      setState={setGmt}
                    /> */}
                  <SelectAutocorrect
                    handleChange={handleGMT}
                    arrData={GMTData}
                    placeholder={data?.gmt}
                  />
                </Col>
                <Col
                  xl={8}
                  lg={8}
                  md={8}
                  sm={12}
                  xs={12}
                  className="mt-2 mt-md-0"
                >
                  <TextForm text="Note" />
                  <FillInput
                    type="text"
                    id="test-name"
                    placeholder={data?.note_employee}
                    className={`py-1 wrapper-div`}
                    setState={setNoteEmployee}
                  />
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer className="w-100">
              <div className="d-flex justify-content-start flex-column flex-md-row w-100">
                <div className="w-100 w-md-75 mb-3 mb-md-0">
                  <TextForm text="Note PIC" />
                  <DisabledInput
                    type="text"
                    placeholder={data?.note_pic}
                    value={data?.note_pic}
                    className="wrapper-div"
                  />
                </div>
                <div className="w-100 w-md-25"></div>
              </div>
              <div className="w-100 d-flex justify-content-end btn-z-index">
                {locId === "" &&
                coordinate === "" &&
                noteEmployee === "" &&
                gpsName === "" &&
                gmt === "" ? (
                  <ButtonBadgePIC
                    text="Submit"
                    className="mb-0"
                    disabled={true}
                  />
                ) : (
                  <ButtonBadgePIC
                    text="Submit"
                    className="mb-0"
                    onClick={() => checkerRevision()}
                    disabled={disableButton}
                  />
                )}
              </div>
            </Modal.Footer>
          </div>
        );
      })}
      {modalLoading && (
        <ProcessLoadingModal show={modalLoading} setShow={setModalLoading} />
      )}
    </>
  );
};

export default RevisionCreateGPS;
