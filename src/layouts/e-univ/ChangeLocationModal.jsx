import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import FormSelect from "../../components/components/elements/form-select/FormSelect";
import Select from "react-select";
import ProcessLoadingModal from "../../components/components/elements/modal/ProcessLoadingModal";
import NotifSuccessModal from "../../components/components/elements/modal/NotifSuccessModal";
import ErrorAlert from "../../components/components/dashboard/ticketing/elements/alerts/ErrorAlert";

export const ChangeLocationModal = (props) => {
  const { show, setShow, token, setLocation, uid } = props;
  const [buData, setBuData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [bu, setBu] = useState("");
  const [state, setState] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLocaion, setSearchLocation] = useState("");

  const [warning, setWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  const [modalLoading, setModalLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  const selectRef = useRef(null);
  const [reset, setReset] = useState(false);

  const [buIsOpen, setBuIsOpen] = useState(false);
  const [locationIsOpen, setLocationIsOpen] = useState(false);

  const handleChange = (selectedOption) => {
    setBu(selectedOption?.value);
    if (state !== "") {
      setReset(true);
      setState("");
    }
  };

  const handleInputBU = (inputValue) => {
    if (inputValue?.length <= 14) {
      if (inputValue?.length % 3 === 0) {
        setSearchTerm(inputValue);
      }
    } else if (inputValue?.length >= 14) {
      setSearchTerm(inputValue);
    }
  };
  const handleInputLocation = (inputValue) => {
    if (inputValue?.length <= 14) {
      if (inputValue?.length % 3 === 0) {
        setSearchLocation(inputValue);
      }
    } else if (inputValue?.length >= 14) {
      setSearchLocation(inputValue);
    }
  };

  useEffect(() => {
    if (reset && selectRef.current) {
      selectRef.current.clearValue();
      setReset(false);
    }
  }, [reset]);

  const handleClose = () => setShow(false);
  const fetchBu = async () => {
    try {
      await axios
        .post(
          "/master/get-bu",
          {
            bu_vertical: [],
            search_term: searchTerm,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          const newData = res?.data?.data;
          const newObjArr = newData?.map((data) => {
            const obj = {
              value: data?.name,
              label: data?.name,
              // type: data?.type_vertical,
            };
            return obj;
          });
          setBuData(newObjArr);
        });
    } catch (error) {
      return error;
    }
  };

  const fetchLocation = async () => {
    try {
      await axios
        .post(
          "/master/get-store-basedon-bu",
          {
            bu_code: bu,
            search_term: searchLocaion,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          const newData = res?.data?.data;
          const newObjArr = newData?.map((data) => {
            const obj = {
              value: data?.location_name,
              label: data?.location_name,
              // type: data?.type_vertical,
            };
            return obj;
          });
          setLocationData(newObjArr);
        });
    } catch (error) {
      return error;
    }
  };

  const submitLocation = async (location) => {
    try {
      setModalLoading(true);
      setDisableButton(true);
      await axios
        .post(
          "/euniv/submit-new-location",
          {
            uid: uid,
            location: location,
            bu: bu,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          if (res?.status === 200) {
            window.location.reload();
            setModalLoading(false);
            setDisableButton(false);
          } else if (res?.status === 500) {
            setModalLoading(false);
            setDisableButton(false);
            return setWarningMessage(res?.data?.message);
          } else {
            setModalLoading(false);
            setDisableButton(false);
            setWarningMessage("Something went wrong");
          }
        });
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    buIsOpen && fetchBu();
  }, [buIsOpen, searchTerm]);

  useEffect(() => {
    locationIsOpen && fetchLocation();
  }, [bu, locationIsOpen]);

  return (
    <>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Store Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Form>
              <Row>
                <Col lg={6} md={6} sm={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Business Unit</Form.Label>
                    <Select
                      onChange={handleChange}
                      options={buData}
                      placeholder="Select Business Unit"
                      isSearchable
                      isClearable={true}
                      onInputChange={handleInputBU}
                      onMenuOpen={() => setBuIsOpen(true)}
                      onMenuClose={() => setBuIsOpen(false)}
                    />
                  </Form.Group>
                </Col>
                <Col lg={6} md={6} sm={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Store Location</Form.Label>
                    <Select
                      onChange={(selectedOption) =>
                        setState(selectedOption?.value)
                      }
                      onInputChange={handleInputLocation}
                      options={locationData}
                      placeholder="Select Store Location"
                      isSearchable
                      isClearable={true}
                      ref={selectRef}
                      onMenuOpen={() => setLocationIsOpen(true)}
                      onMenuClose={() => setLocationIsOpen(false)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="rounded-3"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            className="rounded-3"
            variant="primary"
            onClick={() => {
              submitLocation(state);
            }}
            disabled={
              state === "" ||
              state === undefined ||
              bu === "" ||
              bu === undefined ||
              disableButton
            }
          >
            Change
          </Button>
        </Modal.Footer>
      </Modal>
      {modalLoading && (
        <ProcessLoadingModal show={modalLoading} setShow={setModalLoading} />
      )}
      {warning && (
        <NotifSuccessModal show={warning} setShow={setWarning}>
          <ErrorAlert
            setState={setWarning}
            text1={warningMessage}
            className="mb-0"
          />
        </NotifSuccessModal>
      )}
    </>
  );
};
