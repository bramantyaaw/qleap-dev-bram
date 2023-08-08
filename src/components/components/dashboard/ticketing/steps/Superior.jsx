import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Form, Button, Table } from "react-bootstrap";
import { saveAs } from "file-saver";
import Icon from "@mdi/react";
import { mdiClose as CloseIcon } from "@mdi/js";
import Faq from "../elements/faq/Faq";
import TextForm from "../elements/text/TextForm";
import FillInput from "../elements/input/FillInput";
import ErrorAlert from "../elements/alerts/ErrorAlert";
import ProcessLoadingModal from "../../../elements/modal/ProcessLoadingModal";
import Pagination from "../../../elements/advance-table/Pagination";

const Superior = (props) => {
  const { previous, token, uid, setSuccess, text } = props;
  const [fileUrl, setFileUrl] = useState("");
  const [warningFile, setWarningFile] = useState(false);
  const [note, setNote] = useState("");

  const [file, setFile] = useState(null);
  const [fileUploaded, setFileUploaded] = useState("");
  const [folderUploaded, setFolderUploaded] = useState("");
  const [error, setError] = useState(null);
  const [arrError, setArrError] = useState([]);

  const [warning, setWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  const [arrPage, setArrPage] = useState([]);

  const submitData = async (e) => {
    e.preventDefault();
    setModalLoading(true);
    setDisableButton(true);
    await axios
      .post(
        "/services/ticketing/submit-ticket",
        {
          issue_id: 29,
          uid_client: uid,
          note_employee: note,
          files: [
            {
              file_name: fileUploaded,
              folder_name: folderUploaded,
              collection_name: "update_superior",
            },
          ],
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        if (res?.status === 200) {
          setSuccess(true);
          setModalLoading(false);
          setDisableButton(false);
        } else if (res?.status === 500) {
          setWarning(true);
          setDisableButton(false);
          setModalLoading(false);
          setDisableButton(false);
          return setWarningMessage(res?.data?.message);
        } else {
          setDisableButton(false);
          setError(res?.data?.data);
          setModalLoading(false);
          setDisableButton(false);
        }
      });
  };

  const fetchFileDownload = async () => {
    try {
      const { data } = await axios.get(
        "/services/ticketing/get-excel-file-update-superior",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const newData = data?.data?.update_superior_excel_url;

      setFileUrl(newData);
    } catch (err) {
      return err;
    }
  };

  const saveFile = () => {
    const fileName = fileUrl.split("/");
    const sliced = fileName ? fileName[7] : null;
    saveAs(fileUrl, sliced);
  };

  const handleChange = (e) => {
    if (e.target.files[0].size >= 1000000) {
      setWarningFile(true);
    } else {
      setFile(e.target.files[0]);
    }
  };

  const uploadExcel = async () => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      await axios
        .post("/upload/excel-superior", formData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res?.status === 200) {
            const newFile = res?.data?.data?.file_name;
            const newFolder = res?.data?.data?.folder_name;
            setFileUploaded(newFile);
            setFolderUploaded(newFolder);
            setArrPage(res?.data?.data?.data_extract);
            handleDeleteFile();
          } else {
            return res;
          }
        });
    } catch (err) {
      return err;
    }
  };

  const handleDeleteFile = async () => {
    try {
      const { data } = await axios.delete(
        "/upload/remove-temp-folder",
        {
          folder_name: folderUploaded,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data?.data === null) {
        setFile(null);
        setFolderUploaded("");
        setFileUploaded("");
        setArrError([]);
      }
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    fetchFileDownload();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    uploadExcel();
    // eslint-disable-next-line
  }, [file]);
  useEffect(() => {
    const splitted = error?.split("\n");
    const newArr = splitted?.splice(1);
    setArrError(newArr);
  }, [error]);

  return (
    <Form>
      <Card className="mb-3 border-0">
        <Card.Header className="border-bottom px-3 py-3">
          <h6 className="mb-0">Update Superior dan Super Superior</h6>
        </Card.Header>
        <Card.Body className="submit-data-menu">
          {warning && (
            <ErrorAlert setState={setWarning} text1={warningMessage} />
          )}
          {warningFile && (
            <ErrorAlert
              setState={setWarningFile}
              text1="File Excel yang diunggah lebih dari 1 MB,"
              span="Mohon unggah ulang dibawah 1 MB"
            />
          )}
          <Form.Group className="d-lg-flex w-100 ">
            <Form.Group className="mb-3 me-lg-3 w-100 w-lg-50">
              <TextForm text="Form Update Superior" />
              <div className="d-flex flex-column flex-sm-row download-excel-btn w-100">
                <Button
                  className="p-0 w-100 w-sm-50"
                  variant="outline-secondary-a-bit"
                  onClick={saveFile}
                >
                  Download Form
                </Button>
                <div className="w-100 w-sm-50 ms-0 ms-sm-3 mt-1 mt-sm-0 position-relative">
                  {file === null ? (
                    <>
                      <input
                        type="file"
                        id="file"
                        accept=".xls, .xlsx"
                        className="d-none"
                        onChange={(e) => handleChange(e)}
                      />
                      <label
                        htmlFor="file"
                        className="p-0 w-100 h-100 label-input-excel"
                        role="button"
                      >
                        Upload Form
                      </label>
                    </>
                  ) : (
                    <>
                      <input
                        type="file"
                        id="file"
                        accept=".xls, .xlsx"
                        className="d-none"
                        disabled
                      />
                      <label
                        htmlFor="file"
                        className="p-0 w-100 h-100 label-input-excel"
                        role="button"
                      >
                        Uploaded
                      </label>
                    </>
                  )}
                  {file && (
                    <Icon
                      path={CloseIcon}
                      role="button"
                      size={1}
                      className="position-absolute icon-clear h-100"
                      onClick={handleDeleteFile}
                    />
                  )}
                </div>
              </div>
            </Form.Group>
            <Form.Group className="mb-3 w-lg-50 w-100 ms-lg-3 pt-3 pt-sm-0">
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
          <Card.Body className="p-0 pb-5">
            <div className="table-responsive ">
              <Table className="text-nowrap">
                <thead className="table-light text-left">
                  <tr>
                    <th scope="col">NIK Subordinate</th>
                    <th scope="col">Name Subordinate</th>
                    <th scope="col">NIK Superior</th>
                    <th scope="col">Name Superior</th>
                    <th scope="col">NIK Super Superior</th>
                    <th scope="col">Name Super Superior</th>
                    <th scope="col">Effective Date</th>
                  </tr>
                </thead>
                <tbody>
                  {arrPage.map((row) => (
                    <>
                      <tr>
                        <td>{row.subordinateNik}</td>
                        <td>{row.subordinateName}</td>
                        <td>{row.superiorNik}</td>
                        <td>{row.superiorName}</td>
                        <td>{row.superSuperiorNik}</td>
                        <td>{row.superSuperiorName}</td>
                        <td>{row.effectiveDate}</td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
          <Form.Group>
            {arrError?.map((data) => {
              return (
                <>
                  <p className="mb-0 text-dark-danger fst-italic">{data}</p>
                </>
              );
            })}
          </Form.Group>
        </Card.Body>
      </Card>
      <div className="faq-link">
        <Faq text={text} />
        <div className="submit-wrapper">
          <Button className="btn-prev btn-left mb-4" onClick={previous}>
            Previous
          </Button>
          {fileUploaded !== "" || folderUploaded !== "" ? (
            <Button
              className="btn-next btn-right mb-4"
              onClick={submitData}
              disabled={disableButton}
            >
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
      {modalLoading && (
        <ProcessLoadingModal show={modalLoading} setShow={setModalLoading} />
      )}
    </Form>
  );
};

export default Superior;
