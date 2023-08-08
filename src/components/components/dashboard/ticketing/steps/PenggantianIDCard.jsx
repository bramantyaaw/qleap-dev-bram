import { useEffect, useState, useRef } from "react";
import { saveAs } from "file-saver";
import axios from "axios";
import { Card, Form, Button, Image } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiClose as CloseIcon } from "@mdi/js";
import Faq from "../elements/faq/Faq";
import IssueDropdown from "../elements/dropdown/IssueDropdown";
import FileInput from "../elements/input/FileInput";
import TextForm from "../elements/text/TextForm";
import ErrorAlert from "../elements/alerts/ErrorAlert";
import FillInput from "../elements/input/FillInput";
import ProcessLoadingModal from "../../../elements/modal/ProcessLoadingModal";

const PenggantianIDCard = (props) => {
  const { previous, token, uid, setSuccess, text } = props;
  const [reason, setReason] = useState("");
  const [warningFile, setWarningFile] = useState(false);
  const [note, setNote] = useState("");
  const [fileDownload, setFileDownload] = useState("");

  const [file, setFile] = useState(null);
  const [fileUploaded, setFileUploaded] = useState("");
  const [folderUploaded, setFolderUploaded] = useState("");

  const [fileIDCard, setFileIDCard] = useState(null);
  const [fileUploadedIDCard, setFileUploadedIDCard] = useState("");
  const [folderUploadedIDCard, setFolderUploadedIDCard] = useState("");

  const [fileExcel, setFileExcel] = useState(null);
  const [fileUploadedExcel, setFileUploadedExcel] = useState("");
  const [folderUploadedExcel, setFolderUploadedExcel] = useState("");
  const [checkerExcel, setCheckerExcel] = useState(false);

  const [warning, setWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  const arrOption = [
    { id: "KERUSAKAN", name: "KERUSAKAN" },
    { id: "KEHILANGAN", name: "KEHILANGAN" },
  ];

  const dataInput =
    reason === "KEHILANGAN"
      ? {
          issue_id: 31,
          uid_client: uid,
          reason_submission: reason,
          note_employee: note,
          files: [
            {
              folder_name: folderUploaded,
              file_name: fileUploaded,
              collection_name: "pas_photo",
            },
            {
              folder_name: folderUploadedExcel,
              file_name: fileUploadedExcel,
              collection_name: "form_kehilangan",
            },
          ],
        }
      : {
          issue_id: 31,
          uid_client: uid,
          reason_submission: reason,
          note_employee: note,
          files: [
            {
              folder_name: folderUploaded,
              file_name: fileUploaded,
              collection_name: "pas_photo",
            },
            {
              folder_name: folderUploadedIDCard,
              file_name: fileUploadedIDCard,
              collection_name: "condition_photo",
            },
          ],
        };

  const submitData = async (e) => {
    e.preventDefault();
    try {
      setModalLoading(true);
      setDisableButton(true);
      await axios
        .post("/services/ticketing/submit-ticket", dataInput, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res?.status === 200) {
            setSuccess(true);
            setModalLoading(false);
            setDisableButton(false);
          } else if (res?.status === 500) {
            setWarning(true);
            setModalLoading(false);
            setDisableButton(false);
            return setWarningMessage(res?.data?.message);
          } else {
            setModalLoading(false);
            setDisableButton(false);
          }
        });
    } catch (err) {
      return err;
    }
  };

  const uploadPhoto = async () => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      await axios
        .post("/upload/single-file", formData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res?.status === 200) {
            const newFile = res?.data?.data?.file_name;
            const newFolder = res?.data?.data?.folder_name;
            // const newPrev = res?.data?.data?.url;
            setFileUploaded(newFile);
            setFolderUploaded(newFolder);
            // setPreview(newPrev);
          } else {
            return res;
          }
        });
    } catch (err) {
      return err;
    }
  };

  const onChangePicture = (e) => {
    if (e.target.files[0]?.size >= 1000000) {
      setWarningFile(true);
    } else {
      setFile(e.target.files[0]);
    }
  };

  const handleDeleteImg = async (folder) => {
    try {
      await axios
        .delete(
          "/upload/remove-temp-folder",
          {
            folder_name: folder,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          if (res?.status === 200) {
            if (folder === fileUploaded) {
              // setPreview("");
              setFolderUploaded("");
            } else if (folder === fileUploadedIDCard) {
              setFolderUploadedIDCard("");
            } else if (folder === fileUploadedExcel) {
              setCheckerExcel(false);
              setFolderUploadedExcel("");
              setFileExcel(null);
            }
          } else {
            return res;
          }
        });
    } catch (err) {
      return err;
    }
  };

  const uploadPhotoIDCard = async () => {
    const formData = new FormData();
    formData.append("file", fileIDCard);
    try {
      await axios
        .post("/upload/single-file", formData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res?.status === 200) {
            const newFile = res?.data?.data?.file_name;
            const newFolder = res?.data?.data?.folder_name;
            setFileUploadedIDCard(newFile);
            setFolderUploadedIDCard(newFolder);
          } else {
            return res;
          }
        });
    } catch (err) {
      return err;
    }
  };

  const onChangePictureIDCard = (e) => {
    if (e.target.files[0]?.size >= 1000000) {
      setWarningFile(true);
    } else {
      setFileIDCard(e.target.files[0]);
    }
  };

  const fetchFileDownload = async () => {
    try {
      const { data } = await axios.get(
        "/services/ticketing/get-excel-file-form-kehilangan",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setFileDownload(data?.data?.form_kehilangan_excel_url);
    } catch (err) {
      return err;
    }
  };

  const saveFile = () => {
    const fileName = fileDownload?.split("/");
    const sliced = fileName ? fileName[8] : null;
    saveAs(fileDownload, sliced);
  };

  const handleChange = (e) => {
    if (e.target.files[0]?.size >= 1000000) {
      setWarningFile(true);
    } else {
      setFileExcel(e.target.files[0]);
    }
  };

  const uploadFileExcel = async () => {
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
            setFileUploadedExcel(newFile);
            setFolderUploadedExcel(newFolder);
            setCheckerExcel(true);
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
    //eslint-disable-next-line
  }, [file]);

  useEffect(() => {
    uploadPhotoIDCard();
    // eslint-disable-next-line
  }, [fileIDCard]);

  useEffect(() => {
    uploadFileExcel();
    // eslint-disable-next-line
  }, [fileExcel]);

  useEffect(() => {
    fetchFileDownload();
    // eslint-disable-next-line
  }, []);

  return (
    <Form>
      <Card className="mb-3 border-0">
        <Card.Header className="border-bottom px-3 py-3">
          <h6 className="mb-0">Request Pergantian IDCARD</h6>
        </Card.Header>
        <Card.Body className="submit-data-menu-file">
          {warning && (
            <ErrorAlert setState={setWarning} text1={warningMessage} />
          )}
          {warningFile && (
            <ErrorAlert
              setState={setWarningFile}
              text1="Foto yang diunggah lebih dari 1 MB,"
              span="Mohon unggah ulang dibawah 1 MB"
            />
          )}
          <Form.Group className="d-md-flex w-100">
            <Form.Group className="me-sm-3 w-100 w-sm-50">
              <Form.Group className="mb-2">
                <TextForm text="Reason for Submission" />
                <IssueDropdown setSelected={setReason} data={arrOption} />
              </Form.Group>
              <Form.Group className="note-wrapper fst-italic d-flex flex-column flex-lg-row">
                <p>Note :</p>
                <div className="d-flex flex-column ms-1 desc-wrapper mb-4">
                  <p>
                    - Jika IDCARD KERUSAKAN mohon dilampirkan IDCARD yang
                    KERUSAKAN saat pengambilan
                  </p>
                  <p>
                    - pergantian IDCARD akan dilakukan potong gaji sebesar Rp.
                    30.000,-
                  </p>
                </div>
              </Form.Group>
            </Form.Group>
            {reason !== "" && (
              <Form.Group className="w-lg-50 w-100 ms-lg-3">
                {reason === "KERUSAKAN" && (
                  <>
                    <TextForm text="ID Card Image" span="*" />
                    {folderUploadedIDCard !== "" ? (
                      <div className="position-relative">
                        <input
                          type="file"
                          id="fileKERUSAKAN"
                          accept=".xls, .xlsx"
                          className="d-none"
                          disabled
                        />
                        <label
                          htmlFor="fileKERUSAKAN"
                          className="p-0 w-100 h-100 label-input-excel"
                          role="button"
                        >
                          Uploaded
                        </label>
                        <Icon
                          path={CloseIcon}
                          size={1}
                          className="position-absolute icon-file-upload h-100"
                          onClick={() => handleDeleteImg(fileUploadedIDCard)}
                          role="button"
                        />
                      </div>
                    ) : (
                      <Form.Group className="d-flex align-items-center flex-row">
                        <FileInput
                          handleChange={onChangePictureIDCard}
                          accept="image/png, image/jpg, image/jpeg"
                        />
                      </Form.Group>
                    )}
                  </>
                )}
                {reason === "KEHILANGAN" && (
                  <>
                    <TextForm text="Missing Form" span="*" />
                    <div className="d-flex flex-column flex-md-row download-excel-btn w-100 w-lg-50">
                      <Button
                        className="p-0 w-100 w-md-50"
                        variant="outline-secondary-a-bit"
                        onClick={saveFile}
                      >
                        Download Form
                      </Button>
                      <div className="w-100 w-md-50 ms-0 ms-md-3 mt-1 mt-md-0 position-relative">
                        {checkerExcel !== true ? (
                          <>
                            <input
                              type="file"
                              id="fileExcel"
                              accept=".xls, .xlsx"
                              className="d-none"
                              onChange={(e) => handleChange(e)}
                            />
                            <label
                              htmlFor="fileExcel"
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
                              id="fileUploaded"
                              accept=".xls, .xlsx"
                              className="d-none"
                              disabled
                            />
                            <label
                              htmlFor="fileUploaded"
                              className="p-0 w-100 h-100 label-input-excel"
                              role="button"
                            >
                              Uploaded
                            </label>
                            <Icon
                              path={CloseIcon}
                              size={1}
                              role="button"
                              className="position-absolute icon-clear h-100"
                              onClick={() => handleDeleteImg(fileUploadedExcel)}
                            />
                          </>
                        )}
                      </div>
                    </div>
                    <Form.Group className="note-wrapper fst-italic d-flex mt-5 mt-md-2">
                      <p className="mb-0">
                        Note : Bisa tanda tangan digital maupun basah
                      </p>
                    </Form.Group>
                  </>
                )}
              </Form.Group>
            )}
          </Form.Group>
          {reason !== "" && (
            <Form.Group className="d-md-flex w-100">
              <Form.Group className="me-sm-3 w-100 w-sm-50">
                <Form.Group>
                  <TextForm text="Your Photo" span="*" />
                  {folderUploaded !== "" ? (
                    <div className="position-relative">
                      <input
                        type="file"
                        id="filePhoto"
                        accept=".xls, .xlsx"
                        className="d-none"
                        disabled
                      />
                      <label
                        htmlFor="filePhoto"
                        className="p-0 w-100 h-100 label-input-excel"
                        role="button"
                      >
                        Uploaded
                      </label>
                      <Icon
                        path={CloseIcon}
                        size={1}
                        className="position-absolute icon-file-upload h-100"
                        onClick={() => handleDeleteImg(fileUploaded)}
                        role="button"
                      />
                    </div>
                  ) : (
                    <Form.Group className="d-flex align-items-center flex-row">
                      <FileInput
                        handleChange={onChangePicture}
                        accept="image/png, image/jpg, image/jpeg"
                      />
                    </Form.Group>
                  )}
                </Form.Group>
              </Form.Group>
              <Form.Group className="w-lg-50 w-100 ms-lg-3">
                <Form.Group>
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
            </Form.Group>
          )}
        </Card.Body>
      </Card>
      <div className="faq-link">
        <Faq text={text} />
        <div className="submit-wrapper">
          <Button className="btn-prev btn-left mb-4" onClick={previous}>
            Previous
          </Button>
          {reason === "" && (
            <Button className="btn-next btn-right mb-4" disabled>
              Submit
            </Button>
          )}
          {reason === "KEHILANGAN" &&
            (file !== null &&
            fileUploaded !== "" &&
            folderUploaded !== "" &&
            fileExcel !== null &&
            fileUploadedExcel !== "" &&
            folderUploadedExcel !== "" ? (
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
            ))}

          {reason === "KERUSAKAN" &&
            (fileIDCard !== null &&
            fileUploadedIDCard !== "" &&
            folderUploadedIDCard !== "" &&
            file !== null &&
            fileUploaded !== "" &&
            folderUploaded !== "" ? (
              <Button className="btn-next btn-right mb-4" onClick={submitData}>
                Submit
              </Button>
            ) : (
              <Button className="btn-next btn-right mb-4" disabled>
                Submit
              </Button>
            ))}
        </div>
      </div>
      {modalLoading && (
        <ProcessLoadingModal show={modalLoading} setShow={setModalLoading} />
      )}
    </Form>
  );
};
export default PenggantianIDCard;

// export default PenggantianIDCard
