import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Modal, Row } from "react-bootstrap";
import TextForm from "../../../elements/text/TextForm";
import FillInput from "../../../elements/input/FillInput";
import DisabledInput from "../../../elements/input/DisabledInput";
import DropdownRevision from "../../../../../../../layouts/database-admin/ticket/elements/DropdownRevision";
import { FlatPickr } from "../../../elements/date/FlatPickr";
import ButtonBadgePIC from "../../../../../../../layouts/database-admin/ticket/elements/ButtonBadgePIC";
import ErrorAlert from "../../../elements/alerts/ErrorAlert";
import ProcessLoadingModal from "../../../../../elements/modal/ProcessLoadingModal";
import NotifSuccessModal from "../../../../../elements/modal/NotifSuccessModal";
import SelectAutocorrect from "../../../elements/form-select/SelectAutocorrect";

const RevisionPembuatanLokasi = ({ detailArr, show, token, selectedId }) => {
  const [arrCity, setArrCity] = useState([]);
  const [city, setCity] = useState("");
  const [cityId, setCityId] = useState("");
  const [postNameCity, setPostNameCity] = useState("");
  const [storeName, setStoreName] = useState("");
  const [address, setAddress] = useState("");
  const [noteEmployee, setNoteEmployee] = useState("");
  const [date, setDate] = useState("");

  const [newStoreName, setNewStoreName] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newCityId, setNewCityId] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newNoteEmployee, setNewNoteEmployee] = useState("");
  const [type, setType] = useState("");

  const [lastStoreName, setLastStoreName] = useState("");
  const [lastAddress, setLastAddress] = useState("");
  const [lastCity, setLastCity] = useState("");
  const [lastCityId, setLastCityId] = useState("");
  const [lastNoteEmployee, setLastNoteEmployee] = useState("");
  const [lastDate, setLastDate] = useState("");

  const [warning, setWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [errorRegex, setErrorRegex] = useState(false);

  const [warningAddress, setWarningAddress] = useState(false);

  const dataType = [
    {
      id: "OUTLET",
      name: "OUTLET",
    },
    {
      id: "NON OUTLET",
      name: "NON OUTLET",
    },
  ];

  const fetchCity = async () => {
    try {
      const { data } = await axios.get("/master/get-city-id", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const newData = data?.data;
      const filteredData = newData?.filter(
        (data) => data?.locName !== "(None)"
      );
      const objData = filteredData?.map((data) => {
        return {
          value: data?.cityId,
          label: data?.cityName,
        };
      });

      setArrCity(objData);
    } catch (err) {
      return err;
    }
  };

  const checkerRevision = () => {
    updateTicketData();
  };

  const checkerNewStore = () => {
    if (storeName.trim() === "") {
      return setNewStoreName(lastStoreName);
    } else {
      setNewStoreName(storeName);
    }
  };

  const checkerNewAddress = () => {
    if (address.trim() === "") {
      return setNewAddress(lastAddress);
    } else {
      setNewAddress(address);
    }
  };

  const checkerNewCity = () => {
    if (postNameCity.trim() === "") {
      return setNewCity(lastCity);
    } else {
      setNewCity(postNameCity);
    }
  };

  const checkerNewCityId = () => {
    if (cityId.trim() === "") {
      return setNewCityId(lastCityId);
    } else {
      setNewCityId(cityId);
    }
  };

  const checkerNewNote = () => {
    if (noteEmployee.trim() === "") {
      return setNewNoteEmployee(lastNoteEmployee);
    } else {
      setNewNoteEmployee(noteEmployee);
    }
  };

  const checkerNewDate = () => {
    if (date.trim() === "") {
      return setNewDate(lastDate);
    } else {
      setNewDate(date);
    }
  };

  const updateTicketData = async () => {
    const regex = /^(?=.*\d).*@/;
    let storeRegex = regex.test(newStoreName);
    setDisableButton(true);
    if (type === "OUTLET" && storeRegex === false) {
      setErrorRegex(true);
      setDisableButton(false);
      setNewStoreName(lastStoreName);
    } else if (newAddress?.length < 20) {
      setWarningAddress(true);
      setDisableButton(false);
    } else {
      try {
        setDisableButton(true);
        setModalLoading(true);
        await axios
          .post(
            `/services/ticketing/update-ticket`,
            {
              issue_id: 1,
              id: parseInt(selectedId),
              store_name: newStoreName?.toUpperCase(),
              address: newAddress,
              city_id: newCityId,
              effective_date: newDate,
              note_employee: newNoteEmployee,
              type_store: type,
              status_to: "P",
              submit_by: "employee",
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
        return err;
      }
    }
  };

  const handleChangeCity = (selectedOption) => {
    setNewCityId(selectedOption?.value);
    // fetchLocation(selectedOption?.value);
    // eslint-disable-next-line
  };

  useEffect(() => {
    fetchCity();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    checkerNewStore();
    // eslint-disable-next-line
  }, [storeName, lastStoreName]);

  useEffect(() => {
    checkerNewAddress();
    // eslint-disable-next-line
  }, [address, lastAddress]);

  useEffect(() => {
    checkerNewCity();
    // eslint-disable-next-line
  }, [postNameCity, lastCity]);

  useEffect(() => {
    checkerNewCityId();
    // eslint-disable-next-line
  }, [cityId, lastCityId]);

  useEffect(() => {
    checkerNewNote();
    // eslint-disable-next-line
  }, [noteEmployee, lastNoteEmployee]);

  useEffect(() => {
    checkerNewDate();
    // eslint-disable-next-line
  }, [date, lastDate]);

  useEffect(() => {
    // Type
    const typeTicket = detailArr !== null ? detailArr[0]?.type_store : "";
    setType(typeTicket);

    // Store Name
    let store = detailArr && detailArr[0]?.store_name;
    setLastStoreName(store);

    // Address
    const address = detailArr && detailArr[0]?.address;
    setLastAddress(address);

    // City
    const city = detailArr && detailArr[0]?.city;
    setLastCity(city);

    // CityId
    const cityId = detailArr && detailArr[0]?.city_id;
    setLastCityId(cityId);

    // Note
    const note = detailArr && detailArr[0]?.note_employee;
    setLastNoteEmployee(note);

    // Date
    const arr = detailArr ? detailArr[0]?.effective_date : null;
    // const splitDate = arr?.split("/");
    // const first = splitDate ? splitDate[0] : null;
    // const sec = splitDate ? splitDate[1] : null;
    // const third = splitDate ? splitDate[2] : null;
    // const editedString = `${third}-${sec}-${first}`;
    setLastDate(arr);
  }, [detailArr]);

  return (
    <>
      {detailArr?.map((data, id) => {
        return (
          <div key={id}>
            {warning && (
              <ErrorAlert setState={setWarning} text1={warningMessage} />
            )}
            {errorRegex && (
              <ErrorAlert
                setState={setErrorRegex}
                text1="Mohon cantumkan store name sesuai dengan SAP"
                className="mb-0"
              />
            )}
            {warningAddress && (
              <ErrorAlert
                setState={setWarningAddress}
                text1="Mohon cantumkan address min. 20 characters"
                className="mb-3"
              />
            )}
            <Modal.Body className="body-modal-detail-ticket">
              <div>
                <Row>
                  <Col xl={4} lg={4} md={4} sm={12} xs={12}>
                    <TextForm text="Type" />
                    <DropdownRevision
                      setSelected={setType}
                      data={dataType}
                      className="wrapper-div py-0"
                      defaultValue={type}
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
                    <TextForm text="Store Name" />
                    <FillInput
                      type="text"
                      id="test-name"
                      placeholder={data?.store_name}
                      className={`py-1 wrapper-div`}
                      setState={setStoreName}
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
                    <TextForm text="City / Districts" />
                    <SelectAutocorrect
                      handleChange={handleChangeCity}
                      arrData={arrCity}
                      placeholder={data?.city + ` - ` + data?.province}
                    />
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col xl={4} lg={4} md={4} sm={12} xs={12}>
                    <TextForm text="Effective Date" />
                    <FlatPickr
                      dateDate="1"
                      setDate={setDate}
                      className="wrapper-div"
                      // placeholderText={lastDate}
                      placeholderText={data?.effective_date_alias}
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
                    <TextForm text="Address" />
                    <FillInput
                      type="text"
                      id="test-name"
                      placeholder={data?.address}
                      className={`py-1 wrapper-div`}
                      setState={setAddress}
                    />
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col xl={12} lg={12} md={12} sm={12} xs={12}>
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
              </div>
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
                {storeName === "" &&
                address === "" &&
                city === "" &&
                date === "" &&
                noteEmployee === "" ? (
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

export default RevisionPembuatanLokasi;
