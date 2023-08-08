import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Form, Button } from "react-bootstrap";
import IssueDropdown from "../elements/dropdown/IssueDropdown";
import { FlatPickr } from "../elements/date/FlatPickr";
import DisabledInput from "../elements/input/DisabledInput";
import Faq from "../elements/faq/Faq";
import TextForm from "../elements/text/TextForm";

const JenisTunjangan = (props) => {
  const { next, setSelectedIdIssue, selectedIdIssue, text, token, uid } = props;

  const [date, setDate] = useState("");
  const [arrData, setArrData] = useState([]);
  const [dataBank, setDataBank] = useState({});
  const [check, setCheck] = useState(false);

  let idInteger = parseInt(selectedIdIssue);

  const fetchTunjanganList = async () => {
    try {
      await axios
        .post(
          "/services/tunjangan/get-type",
          { uid },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          const data = res?.data?.data;
          setArrData(data?.type);
          setDataBank(data?.bank);
        });
    } catch (err) {
      return err;
    }
  };

  const checkExpiredTunjangan = async () => {
    try {
      await axios
        .post(
          "/services/tunjangan/get-employee",
          {
            uid,
            adminDate: date,
            typeId: idInteger,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          if (res?.status === 200) {
            setCheck(true);
          } else {
            setCheck(false);
          }
        });
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    fetchTunjanganList();
  }, []);

  useEffect(() => {
    checkExpiredTunjangan();
  }, [date, idInteger]);

  return (
    <div>
      <Form>
        <Card className="mb-3 border-0">
          <Card.Header className=" px-3 py-3 border-bottom">
            <h6 className="mb-0">Detail Tunjangan</h6>
          </Card.Header>
          <Card.Body className="px-4 submit-data-menu">
            <Form.Group className="d-sm-flex w-100">
              <Form.Group className="mb-3 me-sm-3 w-100 w-sm-50">
                <TextForm htmlFor="employee-nik" text="Jenis Tunjangan" />
                <IssueDropdown
                  setSelected={setSelectedIdIssue}
                  data={arrData}
                  tunjangan="true"
                />
              </Form.Group>
              <Form.Group className="mb-3 w-sm-50 w-100 ms-sm-3">
                <TextForm text="Tanggal Kejadian" />
                <FlatPickr minDate="4" dateDate="1" setDate={setDate} />
              </Form.Group>
            </Form.Group>
            <Form.Group className="d-sm-flex w-100">
              <Form.Group className="mb-3 me-sm-3 w-100 w-sm-50">
                <TextForm htmlFor="employee-nik" text="Nomor Rekening" />
                <DisabledInput
                  type="text"
                  placeholder={dataBank?.noRekening}
                  value={dataBank?.noRekening}
                  disabled
                />
              </Form.Group>
              <Form.Group className="mb-3 w-sm-50 w-100 ms-sm-3">
                <TextForm text="Nama Bank" />
                <DisabledInput
                  type="text"
                  placeholder={dataBank?.bankName}
                  value={dataBank?.bankName}
                  disabled
                />
              </Form.Group>
              <Form.Group className="mb-3 w-sm-50 w-100 ms-sm-3">
                <TextForm text="Pemilik Rekening" />
                <DisabledInput
                  type="text"
                  placeholder={dataBank?.accName}
                  value={dataBank?.accName}
                  disabled
                />
              </Form.Group>
            </Form.Group>
          </Card.Body>
        </Card>
      </Form>
      <div className="faq-link">
        <Faq text={text} />
        <div className="submit-wrapper">
          {selectedIdIssue !== 0 && date !== "" && check !== false ? (
            <Button className="btn-next btn-left mb-4 w-sm-100" onClick={next}>
              Next
            </Button>
          ) : (
            <Button
              className="btn-next btn-left mb-4 w-sm-100"
              onClick={next}
              disabled
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JenisTunjangan;
