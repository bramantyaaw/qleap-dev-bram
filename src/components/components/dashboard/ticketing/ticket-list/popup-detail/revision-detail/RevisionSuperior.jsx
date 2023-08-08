import { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Form, Button } from "react-bootstrap";
import { saveAs } from "file-saver";
import Icon from "@mdi/react";
import { mdiClose as CloseIcon } from "@mdi/js";
import FillInput from "../../../elements/input/FillInput";
import TextForm from "../../../elements/text/TextForm";
import ErrorAlert from "../../../elements/alerts/ErrorAlert";
import DisabledInput from "../../../elements/input/DisabledInput";
import ButtonBadgePIC from "../../../../../../../layouts/database-admin/ticket/elements/ButtonBadgePIC";
import ProcessLoadingModal from "../../../../../elements/modal/ProcessLoadingModal";

const RevisionSuperior = ({ detailArr, show, token, selectedId }) => {
  const [warningFile, setWarningFile] = useState(false);
  const [noteEmployee, setNoteEmployee] = useState("");

  const [file, setFile] = useState(null);
  const [fileUploaded, setFileUploaded] = useState("");
  const [folderUploaded, setFolderUploaded] = useState("");
  const [error, setError] = useState(null);
  const [arrError, setArrError] = useState([]);

  const [lastFolderName, setLastFolderName] = useState("");
  const [newNoteEmployee, setNewNoteEmployee] = useState("");
  const [lastNote, setLastNote] = useState("");

  const [warning, setWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  const checkerRevision = (e) => {
    updateTicketData();
  };

  const checkerNewNote = () => {
    if (noteEmployee.trim() === "") {
      return setNewNoteEmployee(lastNote);
    } else {
      return setNewNoteEmployee(noteEmployee);
    }
  };

  const updateTicketData = async () => {
    const idToString = selectedId?.toString();
    setDisableButton(true);
    setModalLoading(true);
    await axios
      .post(
        "/services/ticketing/update-ticket-data",
        {
          ticket_id: idToString,
          issue_id: 29,
          note_employee: newNoteEmployee,
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
        setDisableButton(false);
        setModalLoading(false);
        if (res?.status === 200) {
          window.location.reload(true);
        } else if (res?.status === 500) {
          setWarning(true);
          return setWarningMessage(res?.data?.message);
        } else {
          setError(res?.data?.data);
        }
      });
  };

  // const updateTicket = async () => {
  //   const idToString = selectedId?.toString();
  //   try {
  //     await axios
  //       .post(
  //         `/services/ticketing/update-ticket-status`,
  //         {
  //           ticket_id: idToString,
  //           status: "E",
  //           uid_in_charge: "",
  //         },
  //         {
  //           headers: { Authorization: `Bearer ${token}` },
  //         }
  //       )
  //       .then((res) => {
  //         if (res?.status === 200) {
  //           return window.location.reload(true);
  //         } else {
  //           return res
  //         }
  //       });
  //   } catch (err) {
  //       return err;
  //   }
  // };

  const saveFile = (value) => {
    const link = value ? value[0]?.file_url : null;
    saveAs(link);
  };

  const handleChange = (e) => {
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
        setError("");
      }
    } catch (err) {
      return err;
    }
  };

  const handleDeleteLastFile = async () => {
    try {
      await axios
        .post(
          "/services/ticketing/delete-ticket-file",
          {
            folder_name: lastFolderName,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          if (res?.data?.status === true) {
            window.location.reload(true);
          }
        });
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    uploadPhoto();
    // eslint-disable-next-line
  }, [file]);
  useEffect(() => {
    const splitted = error?.split("\n");
    const newArr = splitted?.splice(1);
    setArrError(newArr);
  }, [error]);
  useEffect(() => {
    const folderName =
      detailArr[0]?.files !== null ? detailArr[0]?.files[0]?.folder_name : "";
    setLastFolderName(folderName);

    // Note
    let note = detailArr && detailArr[0]?.note_employee;
    setLastNote(note);
  }, [detailArr]);

  useEffect(() => {
    checkerNewNote();
    // eslint-disable-next-line
  }, [noteEmployee, lastNote]);

  return (
    <>
      <div>
        {detailArr?.map((data, id) => {
          return (
            <>
              <Modal.Body className="submit-data-menu">
                {warningFile && (
                  <div className="mb-3">
                    <ErrorAlert
                      setState={setWarningFile}
                      text1="File Excel yang diunggah lebih dari 1 MB,"
                      span="Mohon unggah ulang dibawah 1 MB"
                    />
                  </div>
                )}
                {warning && (
                  <div className="mb-3">
                    <ErrorAlert setState={setWarning} text1={warningMessage} />
                  </div>
                )}

                <Form.Group className="d-lg-flex w-100 ">
                  <Form.Group className="mb-3 me-lg-3 w-100 w-lg-50">
                    <TextForm text="Form Update Superior" />
                    <div className="d-flex flex-column flex-sm-row download-excel-btn w-100">
                      {lastFolderName === "" ? (
                        <Button
                          className="p-0 w-100 w-sm-50"
                          variant="outline-secondary-a-bit"
                          disabled
                        >
                          Download Form
                        </Button>
                      ) : (
                        <Button
                          className="p-0 w-100 w-sm-50"
                          variant="outline-secondary-a-bit"
                          onClick={() => saveFile(data?.files)}
                        >
                          Download Form
                        </Button>
                      )}

                      <div className="w-100 w-sm-50 ms-0 ms-sm-3 mt-1 mt-sm-0 position-relative">
                        {lastFolderName !== "" ? (
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
                              Disabled
                            </label>
                          </>
                        ) : file === null ? (
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
                        {lastFolderName && (
                          <Icon
                            path={CloseIcon}
                            role="button"
                            size={1}
                            className="position-absolute icon-clear h-100"
                            onClick={handleDeleteLastFile}
                          />
                        )}
                      </div>
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3 w-lg-50 w-100 ms-lg-3 pt-3 pt-sm-0">
                    <TextForm text="Note" />
                    <FillInput
                      type="text"
                      placeholder={data?.note_employee}
                      id="note"
                      name="note"
                      setState={setNoteEmployee}
                      className={`py-1 wrapper-div`}
                    />
                  </Form.Group>
                </Form.Group>
                <Form.Group>
                  {arrError?.map((data) => {
                    return (
                      <>
                        <span className="mb-0 text-dark-danger h5 fst-italic">
                          {data}
                        </span>
                      </>
                    );
                  })}
                </Form.Group>
              </Modal.Body>
              <Modal.Footer className="w-100">
                <div className="d-flex justify-content-start flex-column flex-md-row w-100">
                  <div className="w-100 w-md-75 mb-3 mb-md-0">
                    <TextForm text="Note PIC" />
                    <DisabledInput
                      type="text"
                      placeholder={data?.note_pic}
                      value={data?.note_pic}
                      className="wrapper-div"
                    />
                  </div>
                  <div className="w-100 w-md-25"></div>
                </div>
                <div className="w-100 d-flex justify-content-end btn-z-index">
                  {folderUploaded === "" ? (
                    <ButtonBadgePIC
                      text="Submit"
                      className="mb-0"
                      disabled={true}
                    />
                  ) : (
                    <ButtonBadgePIC
                      text="Submit"
                      className="mb-0"
                      onClick={(e) => checkerRevision(e)}
                      disabled={disableButton}
                    />
                  )}
                </div>
              </Modal.Footer>
            </>
          );
        })}
      </div>
      {modalLoading && (
        <ProcessLoadingModal show={modalLoading} setShow={setModalLoading} />
      )}
    </>
  );
};

export default RevisionSuperior;
