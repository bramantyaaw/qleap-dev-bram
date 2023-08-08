import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import { Button, Card, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import KoperasiForm from "./KoperasiForm";
import Signature from "../../../components/components/elements/signature/Signature";

import {
  addCommas,
  removeNonNumeric,
  countedAsWords,
} from "../../../config/helper/utils";
import { SelfServiceTemplate } from "../SelfServiceTemplate";

const KoperasiMain = () => {
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [uid, setUid] = useState(localStorage.getItem("uid"));

  const [inputData, setInputData] = useState([]);
  const [show, setShow] = useState(false);
  const [showFail, setShowFail] = useState(false);
  const [eligible, setEligible] = useState([]);
  const [message, setMessage] = useState("");

  const fetchEligibility = async () => {
    try {
      const { data } = await axios.post(
        `/services/koperasi/check-eligible`,
        {
          uid: uid,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEligible(data?.data);
    } catch (err) {
      return err;
    }
  };

  const postKoperasi = async () => {
    try {
      const { data } = await axios.post(
        `/services/koperasi/submit-loan`,
        {
          uid: uid,
          nominal: parseInt(removeNonNumeric(inputData[0].loan)),
          tenor: parseInt(inputData[0].period),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data?.data.status === false) {
        setShowFail(true);
        setMessage(data?.data.message);
      } else {
        setShowFail(true);
        setMessage("You have submitted your data !");
        // DocumentPdf(data?.data);
      }
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    fetchEligibility();
  }, [token, uid]);

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
    setUid(localStorage.getItem("uid"));
  }, [localStorage]);

  const ModalFailed = (message) => {
    return (
      <Fragment>
        <Modal show={showFail} onHide={() => setShowFail(false)}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>{message}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowFail(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Fragment>
    );
  };

  return (
    <SelfServiceTemplate>
      <Card className="mb-3 border-0">
        <Card.Header className=" px-3 py-3 border-bottom">
          <h6 className="mb-0">Loan Data</h6>
        </Card.Header>
        <Card.Body className="px-4">
          <KoperasiForm setInputData={setInputData} eligibility={eligible} />
        </Card.Body>
        <Card.Footer>
          {showFail === true && ModalFailed(message)}
          <Button
            variant="primary"
            onClick={() => {
              if (parseInt(removeNonNumeric(inputData[0].loan)) > 0) {
                postKoperasi();
              } else {
                setShowFail(true);
                setMessage("You must put larger number than 0 !");
              }
            }}
          >
            Save
          </Button>
        </Card.Footer>
      </Card>
    </SelfServiceTemplate>
  );
};

export default KoperasiMain;
