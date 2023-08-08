import { useState, useEffect } from "react";
import { Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import Faq from "../elements/faq/Faq";
import { FlatPickr } from "../elements/date/FlatPickr";
import IssueDropdown from "../elements/dropdown/IssueDropdown";
import FillInput from "../elements/input/FillInput";
import TextForm from "../elements/text/TextForm";
import ParentsInLaw from "../elements/input/ParentsInLaw";
import FileInput from "../elements/input/FileInput";
import ErrorAlert from "../elements/alerts/ErrorAlert";
import TextNote from "../elements/text/TextNote";

const SorrowChild = (props) => {
  const { previous, token, value, setSuccess, uid, text } = props;
  const [warningFile, setWarningFile] = useState(false);
  const [file, setFile] = useState(null);
  const [fileUploaded, setFileUploaded] = useState("");
  const [folderUploaded, setFolderUploaded] = useState("");
  const [mimeType, setMimeType] = useState("");
  const [sizePhoto, setSizePhoto] = useState(0);

  return (
    <Form className="first-marriage-wrapper">
      <Card className="mb-3 border-0">
        <Card.Header className="border-bottom px-3 py-3">
          <h6 className="mb-0">
            Detail Tunjangan Dukacita Meninggal Anak Kandung
          </h6>
        </Card.Header>
        <Card.Body className="submit-data-menu">
          <Form.Group className="d-flex w-100 flex-column flex-sm-row">
            <Form.Group className="w-50  me-sm-2 w-100 w-sm-50">
              <TextForm text="Nama Anak" />
              <Form.Group className="w-100 d-flex align-items-center justify-content-center">
                <p className="text-secondary mb-0 me-3">Mendiang</p>
                <FillInput
                  type="text"
                  placeholder="Tuliskan Nama Lengkap"
                  // setState={setStoreCode}
                />
              </Form.Group>
            </Form.Group>
            <Form.Group className="w-50 ms-sm-2 w-100 w-sm-50 mt-3 mt-sm-0">
              <TextForm text="Anak Ke" />
              <Form.Group className="w-100 d-flex align-items-center justify-content-center">
                <FillInput
                  type="text"
                  placeholder="1"
                  // setState={setStoreCode}
                />
              </Form.Group>
            </Form.Group>
          </Form.Group>
          <Form.Group>
            <TextForm
              text="Submit Foto Surat Keterangan Kematian"
              className="mt-3 "
            />
            <FileInput accept="image/png, image/jpg, image/jpeg" />
            <TextNote note="(Unggah file dibawah 1 MB)" className="mt-2 mb-0" />
          </Form.Group>
        </Card.Body>
      </Card>
      <div className="faq-link">
        <Faq text={text} />
        <div className="submit-wrapper">
          <Button className="btn-prev btn-left mb-4" onClick={previous}>
            Previous
          </Button>
          {/* {storeCode !== "" &&
          storeName !== "" &&
          address !== "" &&
          city !== "" &&
          province !== "" &&
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
          )} */}
          <Button
            className="btn-next btn-right mb-4"
            onClick={() => setSuccess(true)}
          >
            Submit
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default SorrowChild;
