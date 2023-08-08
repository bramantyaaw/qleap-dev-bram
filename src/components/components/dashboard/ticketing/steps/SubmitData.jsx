import { useState, useEffect } from "react";
import { Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import Faq from "../elements/faq/Faq";
import { FlatPickr } from "../elements/date/FlatPickr";
import IssueDropdown from "../elements/dropdown/IssueDropdown";
import FillInput from "../elements/input/FillInput";
import TextForm from "../elements/text/TextForm";
import ErrorAlert from "../elements/alerts/ErrorAlert";
import ProcessLoadingModal from "../../../elements/modal/ProcessLoadingModal";
import SelectAutocorrect from "../elements/form-select/SelectAutocorrect";

const SubmitData = (props) => {
  const { previous, token, value, setSuccess, uid, text } = props;
  const idIssue = parseInt(value);
  const [storeName, setStoreName] = useState("");
  const [address, setAddress] = useState("");
  const [arrCity, setArrCity] = useState([]);
  const [cityId, setCityId] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [type, setType] = useState("");

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

  const handleChangeCity = (selectedOption) => {
    setCityId(selectedOption?.value);
  };

  const submitData = async (e) => {
    e.preventDefault();
    const regex = /^(?=.*\d).*@/;
    let storeRegex = regex.test(storeName);
    if (type === "OUTLET" && storeRegex === false) {
      setErrorRegex(true);
      setDisableButton(false);
    } else if (address?.length < 20) {
      setWarningAddress(true);
      setDisableButton(false);
    } else {
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
              store_name: storeName?.toUpperCase(),
              effective_date: date,
              address: address,
              city_id: cityId,
              type_store: type,
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
            } else if (res?.status === 500) {
              setModalLoading(false);
              setWarning(true);
              return setWarningMessage(res?.data?.message);
            }
          });
      } catch (err) {
        setModalLoading(false);
        return err;
      }
    }
  };

  useEffect(() => {
    fetchCity();
    // eslint-disable-next-line
  }, []);

  return (
    <Form>
      <Card className="mb-3 border-0">
        <Card.Header className="border-bottom px-3 py-3">
          <h6 className="mb-0">Create Master Location Proint</h6>
        </Card.Header>
        <Card.Body className="submit-data-menu">
          {warning && (
            <ErrorAlert setState={setWarning} text1={warningMessage} />
          )}
          {errorRegex && (
            <ErrorAlert
              setState={setErrorRegex}
              text1="Mohon cantumkan store name sesuai dengan SAP"
              className="mb-3"
            />
          )}
          {warningAddress && (
            <ErrorAlert
              setState={setWarningAddress}
              text1="Mohon cantumkan address min. 20 characters"
              className="mb-3"
            />
          )}
          <Form.Group className="d-sm-flex w-100 ">
            <Form.Group className="mb-3 me-sm-3 w-100 w-sm-50">
              <TextForm text="Type" span="*" />
              <IssueDropdown setSelected={setType} data={dataType} />
            </Form.Group>
            {type === "OUTLET" ? (
              <Form.Group className="mb-3 w-lg-50 w-100 ms-lg-3">
                <TextForm
                  htmlFor="store-name"
                  text="Store Name (Cantumkan kode jika store memiliki kode)"
                  span="*"
                />
                <FillInput
                  type="text"
                  placeholder="M23@GEDONG PANJANG"
                  id="store-name"
                  name="store-name"
                  maxLength="200"
                  value={storeName}
                  setState={setStoreName}
                />
              </Form.Group>
            ) : (
              <Form.Group className="mb-3 w-lg-50 w-100 ms-lg-3">
                <TextForm htmlFor="store-name" text="Store Name" span="*" />
                <FillInput
                  type="text"
                  placeholder=""
                  id="store-name"
                  name="store-name"
                  maxLength="200"
                  setState={setStoreName}
                />
              </Form.Group>
            )}
          </Form.Group>
          <Form.Group className="mb-3 me-sm-3 w-100">
            <TextForm text="City / Districts" span="*" />
            <SelectAutocorrect
              handleChange={handleChangeCity}
              arrData={arrCity}
              placeholder=""
            />
          </Form.Group>
          <Form.Group className="mb-3 me-sm-3 w-100">
            <TextForm text="Address" span="*" />
            <FillInput
              type="text"
              placeholder=""
              id="address"
              name="address"
              maxLength="200"
              setState={setAddress}
            />
          </Form.Group>
          <Form.Group className="d-sm-flex w-100 ">
            <Form.Group className="mb-3 me-sm-3 w-100 w-sm-50">
              <TextForm text="Effective Date" span="*" />
              <FlatPickr minDate="1" dateDate="0" setDate={setDate} />
            </Form.Group>
            <Form.Group className="mb-3 w-lg-50 w-100 ms-lg-3">
              <TextForm text="Note" />
              <FillInput
                type="text"
                placeholder=""
                id="note"
                name="note"
                setState={setNote}
              />
            </Form.Group>
          </Form.Group>
        </Card.Body>
      </Card>
      <div className="faq-link">
        <Faq text={text} />
        <div className="submit-wrapper">
          <Button className="btn-prev btn-left mb-4" onClick={previous}>
            Previous
          </Button>
          {storeName !== "" &&
          address !== "" &&
          cityId !== "" &&
          date !== "" &&
          type !== "" ? (
            <Button
              className="btn-next btn-right mb-4"
              onClick={submitData}
              disabled={disableButton}
            >
              Submit
            </Button>
          ) : (
            <Button className="btn-next btn-right mb-4" disabled>
              Submit
            </Button>
          )}
        </div>
      </div>
      {modalLoading && (
        <ProcessLoadingModal show={modalLoading} setShow={setModalLoading} />
      )}
    </Form>
  );
};
export default SubmitData;
