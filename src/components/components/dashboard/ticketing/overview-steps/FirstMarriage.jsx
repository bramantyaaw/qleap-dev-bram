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

const FirstMarriage = (props) => {
  const { previous, token, value, setSuccess, uid, text } = props;
  const [warningFile, setWarningFile] = useState(false);
  const [file, setFile] = useState(null);
  const [fileUploaded, setFileUploaded] = useState("");
  const [folderUploaded, setFolderUploaded] = useState("");
  const [mimeType, setMimeType] = useState("");
  const [sizePhoto, setSizePhoto] = useState(0);

  const onChangePicture = (e) => {
    if (e.target.files[0].size >= 1000000) {
      setWarningFile(true);
    } else {
      setFile(e.target.files[0]);
    }
  };

  const uploadPhoto = async () => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      await axios
        .post("/upload/single-image", formData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res?.status === 200) {
            const newFile = res?.data?.data?.file_name;
            const newFolder = res?.data?.data?.folder_name;
            const newMime = res?.data?.data?.mime_type;
            const newSize = res?.data?.data?.size;
            setFileUploaded(newFile);
            setFolderUploaded(newFolder);
            setMimeType(newMime);
            setSizePhoto(newSize);
          } else {
            return res;
          }
        });
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    uploadPhoto();
  }, [file !== null]);
  return (
    <Form className="first-marriage-wrapper">
      <Card className="mb-3 border-0">
        <Card.Header className="border-bottom px-3 py-3">
          <h6 className="mb-0">Detail Tunjangan Sukacita Pernikahan Pertama</h6>
        </Card.Header>
        <Card.Body className="submit-data-menu">
          {warningFile && (
            <ErrorAlert
              setState={setWarningFile}
              text1="Foto yang diunggah lebih dari 1 MB,"
              span="Mohon unggah ulang dibawah 1 MB"
            />
          )}
          <Form.Group className="w-100">
            <TextForm text="Nama Pasangan" />
            <FillInput
              type="text"
              placeholder="Tuliskan Nama Lengkap"
              // setState={setStoreCode}
            />
          </Form.Group>
          <Form.Group>
            <TextForm text="Nama Mertua (Ayah)" className="mt-3 " />
            <ParentsInLaw />
          </Form.Group>
          <Form.Group>
            <TextForm text="Nama Mertua (Ibu)" className="mt-3 " />
            <ParentsInLaw />
          </Form.Group>
          <Form.Group>
            <TextForm text="Submit Foto Akta Perkawinan" className="mt-3 " />
            <FileInput
              handleChange={onChangePicture}
              accept="image/png, image/jpg, image/jpeg"
            />
            <TextNote note="(Unggah file dibawah 1 MB)" className="mt-2" />
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

export default FirstMarriage;
