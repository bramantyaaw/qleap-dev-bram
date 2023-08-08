import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import FileInput from "../../../../components/components/dashboard/ticketing/elements/input/FileInput";

export const UploadKoperasi = (props) => {
  const { token, uid } = props;

  const [fileExcel, setFileExcel] = useState(null);
  const [warning, setWarningFile] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [message, setWarningMessage] = useState("");
  const [fileUploaded, setFileUploaded] = useState("");
  const [folderUploaded, setFolderUploaded] = useState("");

  const onChangeFile = (e) => {
    let format = e.target.files[0].name.split(".")[1];
    const accFormat = ["xls", "xlsx"];

    if (accFormat.includes(format)) {
      if (e.target.files[0].size >= 1000000) {
        setWarningFile(true);
        setDisabled(true);
        setWarningMessage("File size is larger than 1MB !");
      } else {
        setWarningFile(false);
        setDisabled(false);
        setFileExcel(e.target.files[0]);
      }
    } else {
      setWarningFile(true);
      setDisabled(true);
      setWarningMessage("Invalid File Format !");
    }
  };

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("file", fileExcel);
    try {
      await axios
        .post("/upload/single-file", formData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res?.status === 200) {
            const newFile = res?.data?.data?.file_name;
            const newFolder = res?.data?.data?.folder_name;

            setFileUploaded(newFile);
            setFolderUploaded(newFolder);
          } else {
            return res;
          }
        });
    } catch (err) {
      return err;
    }
  };

  const submitExcelData = async () => {
    // const formData = new FormData();
    // formData.append("file_name", fileUploaded);
    // formData.append("folder_name", folderUploaded);
    // formData.append("uid", uid);

    try {
      await axios
        .post(
          "/services/koperasi/submit-excel-data",
          {
            file_name: fileUploaded,
            folder_name: folderUploaded,
            uid,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          if (res?.status === 200) {
            setWarningFile(true);
            setWarningMessage("File has been succesfully uploaded !");
          } else {
            return res;
          }
        });
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    submitExcelData();
  }, [fileUploaded, folderUploaded]);

  const ModalFailed = (message) => {
    return (
      <Fragment>
        <Modal show={warning} onHide={() => setWarningFile(false)}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>{message}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setWarningFile(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Fragment>
    );
  };

  return (
    <Card className="border-0">
      <Card.Header>
        <div className="mb-3 mb-lg-0">
          <h4 className="mb-0">Upload File</h4>
          <p className="mb-0">You can upload your file here.</p>
        </div>
      </Card.Header>
      <Card.Body>
        <Form>
          <Row className="mb-2">
            {/* <Col lg={2} md={3} sm={12}>
              <h5>File</h5>
            </Col> */}
            <Col lg={10} md={9} sm={12}>
              <Form.Group className="d-flex align-items-center flex-row">
                <FileInput
                  handleChange={onChangeFile}
                  accept="file/xls, file/xlsx"
                />
              </Form.Group>
              <Form.Text className="text-danger ps-2">
                File format must be .xls or .xlsx and the size must be under 1MB
              </Form.Text>
            </Col>
          </Row>
          {/*  Button  */}
          {warning === true && ModalFailed(message)}
          <Row>
            <Col sm={12} className="d-flex">
              <Button
                variant="primary"
                className="justify-content-end"
                //type="submiclast"
                size="xs"
                disabled={disabled}
                onClick={uploadFile}
              >
                Upload File
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};
