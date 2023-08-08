import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Card, Form, Button, Modal } from "react-bootstrap";
import Faq from "../elements/faq/Faq";
import TextForm from "../elements/text/TextForm";
import SelectAutocorrect from "../elements/form-select/SelectAutocorrect";
import FillInput from "../elements/input/FillInput";
import ErrorAlert from "../elements/alerts/ErrorAlert";
import ProcessLoadingModal from "../../../elements/modal/ProcessLoadingModal";
import DisabledInput from "../elements/input/DisabledInput";
import { GMTData } from "../../../../../data/selfservices/GMTData";
import TutorialModal from "../elements/modal/TutorialModal";

const GPSAbsensi = (props) => {
  const { previous, token, value, uid, setSuccess, text } = props;
  const idIssue = parseInt(value);
  const [locId, setLocId] = useState("");
  const [locAddr, setLocAddr] = useState("");
  const [cityDistrict, setCityDistrict] = useState("");
  const [gmt, setGmt] = useState("");
  const [coordinate, setCoordinate] = useState("");
  const [note, setNote] = useState("");
  const [gpsName, setGpsName] = useState("");
  const [listLocation, setListLocation] = useState([]);
  const [modalPopup, setModalPopup] = useState(false);

  const [warning, setWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [errorRegex, setErrorRegex] = useState(false);

  const submitData = async (e) => {
    e.preventDefault();
    /* eslint-disable no-useless-escape */

    const regex = /^(?=.*\d)(?=.*\.)(?=.*\s)(?=.*,)[^\p{L}]+$/;
    let coordinateRegex = regex.test(coordinate);

    if (coordinateRegex === true) {
      try {
        setDisableButton(true);
        setModalLoading(true);
        await axios
          .post(
            "/services/ticketing/submit-ticket",
            {
              issue_id: idIssue,
              uid_client: uid,
              note_employee: note,
              loc_id: locId,
              coordinate_point: coordinate,
              gmt_time: gmt,
              gps_name: gpsName,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then((res) => {
            setModalLoading(false);
            setDisableButton(false);
            if (res?.status === 200) {
              setSuccess(true);
            } else {
              setWarning(true);
              return setWarningMessage(res?.data?.message);
            }
          });
      } catch (err) {
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

  const fetchLocation = async () => {
    try {
      const { data } = await axios.post(
        "/master/get-location",
        {
          params: locId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const newData = data?.data;
      setLocAddr(newData?.locAddr);
      setCityDistrict(newData?.locCity);
      setGpsName(newData?.locName);
    } catch (err) {
      return err;
    }
  };

  const handleChangeLocation = (selectedOption) => {
    setLocId(selectedOption?.value);
    // fetchLocation(selectedOption?.value);
    // eslint-disable-next-line
  };
  const handleGMT = (selectedOption) => {
    setGmt(selectedOption?.value);
  };

  useEffect(() => {
    fetchListLocation();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchLocation();
  }, [locId]);

  return (
    <Form>
      <Card className="mb-3 border-0">
        <Card.Header className="border-bottom px-3 py-3">
          <h6 className="mb-0">Create New GPS</h6>
        </Card.Header>
        <Card.Body className="submit-data-menu">
          {warning && (
            <ErrorAlert setState={setWarning} text1={warningMessage} />
          )}
          {errorRegex && (
            <ErrorAlert
              setState={setErrorRegex}
              text1="Mohon cantumkan format coordinate yang sesuai"
              className="mb-3"
            />
          )}
          <Form.Group className="d-sm-flex w-100">
            <Form.Group className="mb-3 me-sm-3 w-100 w-sm-50">
              <TextForm text="Location Name" span="*" />
              <SelectAutocorrect
                handleChange={handleChangeLocation}
                arrData={listLocation}
                placeholder=""
              />
            </Form.Group>
            <Form.Group className="mb-3 w-sm-50 w-100 ms-sm-3">
              <TextForm text="GPS Name" span="*" />
              <FillInput
                type="text"
                placeholder={gpsName}
                id="gpsName"
                name="gpsName"
                setState={setGpsName}
                value={gpsName}
              />
            </Form.Group>
          </Form.Group>
          <Form.Group className="mb-3 me-sm-3 w-100">
            <TextForm text="Address" />

            <DisabledInput type="text" placeholder={locAddr} value={locAddr} />
          </Form.Group>
          <Form.Group className="d-sm-flex w-100">
            <Form.Group className="mb-3 me-sm-3 w-100 w-sm-50">
              <TextForm text="City / Districts" />
              <DisabledInput
                type="text"
                placeholder={cityDistrict}
                value={cityDistrict}
              />
            </Form.Group>
            <Form.Group className="mb-3 w-sm-50 w-100 ms-sm-3">
              <TextForm text="GMT" span="*" />
              {/* <FillInput
                type="number"
                placeholder=""
                id="gmt"
                name="gmt"
                setState={setGmt}
              /> */}
              <SelectAutocorrect
                handleChange={handleGMT}
                arrData={GMTData}
                placeholder=""
              />
            </Form.Group>
          </Form.Group>
          <Form.Group className="d-sm-flex w-100">
            <Form.Group className="mb-3 me-sm-3 w-100 w-sm-50">
              <TextForm text="Coordinate" span="*" />
              <FillInput
                type="text"
                placeholder=""
                id="coordinate"
                name="coordinate"
                setState={setCoordinate}
              />
            </Form.Group>
            <Form.Group className="mb-3 w-sm-50 w-100 ms-sm-3">
              <TextForm text="Tutorial Video Get Coordinate" />
              <div className="d-flex video-ticket-btn align-items-center ">
                <p className="mb-0">Tutorial Coordinate.mp4</p>
                <Button
                  className="py-0 px-2 ms-3"
                  // variant="outline-secondary-a-bit"
                  variant="primary"
                  onClick={() => setModalPopup(true)}
                >
                  Lihat Video
                </Button>
              </div>
            </Form.Group>
          </Form.Group>
          <Form.Group className="mb-3 me-sm-3 w-100">
            <TextForm text="Note" />
            <FillInput
              type="text"
              placeholder=""
              id="note"
              name="note"
              setState={setNote}
            />
          </Form.Group>
        </Card.Body>
      </Card>
      <div className="faq-link">
        <Faq text={text} />
        <div className="submit-wrapper">
          <Button className="btn-prev btn-left mb-4" onClick={previous}>
            Previous
          </Button>
          {locId !== "" && coordinate !== "" ? (
            <Button
              className="btn-next btn-right mb-4"
              onClick={submitData}
              disabled={disableButton}
            >
              Submit
            </Button>
          ) : (
            <Button
              className="btn-next btn-right mb-4"
              onClick={submitData}
              disabled
            >
              Submit
            </Button>
          )}
        </div>
      </div>
      {modalLoading && (
        <ProcessLoadingModal show={modalLoading} setShow={setModalLoading} />
      )}
      {modalPopup && (
        <TutorialModal modalPopup={modalPopup} setModalPopup={setModalPopup} />
      )}
    </Form>
  );
};
export default GPSAbsensi;
