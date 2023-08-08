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

const SorrowComponent = (props) => {
  const { previous, token, value, setSuccess, uid, text, title, who } = props;
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
          <h6 className="mb-0">{title}</h6>
        </Card.Header>
        <Card.Body className="submit-data-menu">
          <TextForm text={`Nama ${who}`} />
          <Form.Group className="w-100 d-flex align-items-center justify-content-center">
            <p className="text-secondary mb-0 me-3">Mendiang</p>
            <FillInput
              type="text"
              placeholder="Tuliskan Nama Lengkap"
              // setState={setStoreCode}
            />
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

export default SorrowComponent;
