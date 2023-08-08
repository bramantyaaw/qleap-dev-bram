import { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import Select from "react-select";
import Faq from "../elements/faq/Faq";
import { FlatPickr } from "../elements/date/FlatPickr";
import DisabledInput from "../elements/input/DisabledInput";
import TextForm from "../elements/text/TextForm";
import SelectAutocorrect from "../elements/form-select/SelectAutocorrect";

const PenonaktifanKode = (props) => {
  const { previous, token, value, uid, setSuccess, text } = props;
  const idIssue = parseInt(value);
  const [storeCode, setStoreCode] = useState("");
  //   const [storeName, setStoreName] = useState("");
  //   const [address, setAddress] = useState("");
  //   const [city, setCity] = useState("");
  //   const [province, setProvince] = useState("");
  const [date, setDate] = useState("");

  const dataArrStore = [
    {
      value: "A001",
      label: "A001",
    },
    {
      value: "B001",
      label: "B001",
    },
    {
      value: "C001",
      label: "C001",
    },
    {
      value: "D001",
      label: "D001",
    },
    {
      value: "E001",
      label: "E001",
    },
  ];

  const submitData = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "/services/ticketing/submit-ticket",
          {
            issue_id: idIssue,
            uid_client: uid,
            store_code: storeCode,
            store_name: "Mall",
            address: "Jalan Gedong Panjang",
            city: "Kota Bekasi",
            province: "Jawa Barat",
            effective_date: date,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          if (res?.status === 200) {
            setSuccess(true);
          } else {
            return res;
          }
        });
    } catch (err) {
      return err;
    }
  };

  const handleChange = (selectedOption) => {
    setStoreCode(selectedOption?.value);
  };

  return (
    <Form>
      <Card className="mb-3 border-0">
        <Card.Header className="border-bottom px-3 py-3">
          <h6 className="mb-0">Penonaktifan Lokasi Kerja Di Proint</h6>
        </Card.Header>
        <Card.Body className="submit-data-menu">
          <Form.Group className="d-sm-flex w-100 ">
            <Form.Group className="mb-3 me-sm-3 w-100 w-sm-50">
              <TextForm htmlFor="store-code" text="Store Code" span="*" />
              <SelectAutocorrect
                handleChange={handleChange}
                arrData={dataArrStore}
              />
            </Form.Group>
            <Form.Group className="mb-3 w-sm-50 w-100 ms-sm-3">
              <TextForm text="Store Name" />
              <DisabledInput
                type="text"
                placeholder=""
                id="store-name"
                name="store-name"
                maxLength="200"
              />
            </Form.Group>
          </Form.Group>
          <Form.Group className="d-sm-flex w-100">
            <Form.Group className="mb-3 me-sm-3 w-100 w-sm-50">
              <TextForm text="Address" />
              <DisabledInput
                type="text"
                placeholder=""
                id="address"
                name="address"
                maxLength="200"
              />
            </Form.Group>
            <Form.Group className="mb-3 w-sm-50 w-100 ms-sm-3">
              <TextForm text="City / Districts" />
              <DisabledInput type="text" placeholder="" id="city" name="city" />
            </Form.Group>
          </Form.Group>
          <Form.Group className="d-sm-flex w-100">
            <Form.Group className="mb-3 me-sm-3 w-100 w-sm-50">
              <TextForm text="Province" />
              <DisabledInput type="text" placeholder="" id="city" name="city" />
            </Form.Group>
            <Form.Group className="mb-3 w-sm-50 w-100 ms-sm-3">
              <TextForm text="Effective Date" span="*" />
              <FlatPickr minDate="2" dateDate="1" setDate={setDate} />
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
          {storeCode !== "" &&
          //   storeName !== "" &&
          //   address !== "" &&
          //   city !== "" &&
          //   province !== "" &&
          date !== "" ? (
            <Button className="btn-next btn-right mb-4" onClick={submitData}>
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
    </Form>
  );
};
export default PenonaktifanKode;
