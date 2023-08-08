import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button, Image } from "react-bootstrap";
import { saveAs } from "file-saver";
import Icon from "@mdi/react";
import { mdiClose as CloseIcon } from "@mdi/js";
import IssueDropdown from "../../../elements/dropdown/IssueDropdown";
import FillInput from "../../../elements/input/FillInput";
import TextForm from "../../../elements/text/TextForm";
import DisabledInput from "../../../elements/input/DisabledInput";
import ButtonBadgePIC from "../../../../../../../layouts/database-admin/ticket/elements/ButtonBadgePIC";

const RevisionHilangIDCard = ({
  detailArr,
  reason,
  setReason,
  arrOption,
  setWarningFile,
  token,
  selectedId,
  setWarning,
  setWarningMessage,
  setDisableButton,
  setModalLoading,
  disableButton,
}) => {
  const [noteEmployee, setNoteEmployee] = useState("");
  const [newNoteEmployee, setNewNoteEmployee] = useState("");

  const [folderNameFormKehilangan, setFolderNameFormKehilangan] = useState("");
  const [urlNameFormKehilangan, setUrlNameFormKehilangan] = useState("");
  const [folderNamePasPhoto, setFolderNamePasPhoto] = useState("");
  const [urlNamePasPhoto, setUrlNamePasPhoto] = useState("");

  // revision uploaded
  const [fileFormKehilangan, setFileFormKehilangan] = useState(null);
  const [fileFormKehilanganUploaded, setFileFormKehilanganUploaded] =
    useState("");
  const [folderFormKehilanganUploaded, setFolderFormKehilanganUploaded] =
    useState("");

  const [filePasPhoto, setFilePasPhoto] = useState(null);
  const [filePasPhotoUploaded, setFilePasPhotoUploaded] = useState("");
  const [folderPasPhotoUploaded, setFolderPasPhotoUploaded] = useState("");
  const [urlPasPhotoUploaded, setUrlPasPhotoUploaded] = useState("");

  const [lastNote, setLastNote] = useState("");

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

  const filterInput = () => {
    if (folderFormKehilanganUploaded !== "") {
      let arr = [
        {
          file_name: fileFormKehilanganUploaded,
          folder_name: folderFormKehilanganUploaded,
          collection_name: "condition_photo",
        },
      ];
      return arr;
    } else if (folderPasPhotoUploaded !== "") {
      let arr = [
        {
          file_name: filePasPhotoUploaded,
          folder_name: folderPasPhotoUploaded,
          collection_name: "pas_photo",
        },
      ];
      return arr;
    } else if (
      folderFormKehilanganUploaded !== "" &&
      folderPasPhotoUploaded !== ""
    ) {
      let arr = [
        {
          file_name: filePasPhotoUploaded,
          folder_name: folderPasPhotoUploaded,
          collection_name: "pas_photo",
        },
        {
          file_name: fileFormKehilanganUploaded,
          folder_name: folderFormKehilanganUploaded,
          collection_name: "form_kehilangan",
        },
      ];
      return arr;
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
          issue_id: 31,
          note_employee: newNoteEmployee,
          reason_submission: reason,
          files: filterInput(),
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
  //          return res
  //         }
  //       });
  //   } catch (err) {
  //       return err;
  //   }
  // };

  const uploadNewPhoto = async (fileName) => {
    const formData = new FormData();
    formData.append("file", fileName);
    try {
      await axios
        .post("/upload/single-file", formData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res?.status === 200) {
            const newFile = res?.data?.data?.file_name;
            const newFolder = res?.data?.data?.folder_name;
            const newUrl = res?.data?.data?.url;
            if (fileName === fileFormKehilangan) {
              setFileFormKehilanganUploaded(newFile);
              setFolderFormKehilanganUploaded(newFolder);
            } else if (fileName === filePasPhoto) {
              setFilePasPhotoUploaded(newFile);
              setFolderPasPhotoUploaded(newFolder);
              setUrlPasPhotoUploaded(newUrl);
            }
          } else {
            return res;
          }
        });
    } catch (err) {
      return err;
    }
  };

  const handleDeleteLastFile = async (value) => {
    try {
      await axios
        .post(
          "/services/ticketing/delete-ticket-file",
          {
            folder_name: value,
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

  const handleDeleteRecentFile = async (folderName, status) => {
    try {
      const { data } = await axios.delete(
        "/upload/remove-temp-folder",
        {
          folder_name: folderName,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data?.data === null) {
        if (status === "form_kehilangan") {
          setFileFormKehilangan(null);
          setFolderFormKehilanganUploaded("");
          setFileFormKehilanganUploaded("");
        } else if (status === "pas_photo") {
          setFilePasPhoto(null);
          setFolderPasPhotoUploaded("");
          setFilePasPhotoUploaded("");
        }
      }
    } catch (err) {
      return err;
    }
  };

  // Form Kehilangan

  const handleChange = (e) => {
    if (e.target.files[0].size >= 1000000) {
      setWarningFile(true);
    } else {
      setFileFormKehilangan(e.target.files[0]);
    }
  };

  // Pas Photo
  const onChangePicturePasPhoto = (e) => {
    if (e.target.files[0].size >= 1000000) {
      setWarningFile(true);
    } else {
      setFilePasPhoto(e.target.files[0]);
    }
  };

  useEffect(() => {
    // Form Kehilangan
    const folderNameFormKehilangan = detailArr?.map((data) => {
      let files = data?.files;
      let newData = files?.filter(
        (data) => data?.collection_name === "form_kehilangan"
      );
      return newData;
    });
    let FormKehilangan =
      folderNameFormKehilangan !== [] ? folderNameFormKehilangan[0] : "";
    let folderFormKehilangan = FormKehilangan
      ? FormKehilangan[0]?.folder_name
      : "";
    let urlFormKehilangan = FormKehilangan ? FormKehilangan[0]?.file_url : "";
    setFolderNameFormKehilangan(folderFormKehilangan);
    setUrlNameFormKehilangan(urlFormKehilangan);

    // Pas Photo
    const folderNamePasPhoto = detailArr?.map((data) => {
      let files = data?.files;
      let newData = files?.filter(
        (data) => data?.collection_name === "pas_photo"
      );
      return newData;
    });
    let IDCard = folderNamePasPhoto !== [] ? folderNamePasPhoto[0] : "";
    let folderIDCard = IDCard ? IDCard[0]?.folder_name : "";
    let urlIDCard = IDCard ? IDCard[0]?.file_url : "";
    setFolderNamePasPhoto(folderIDCard);
    setUrlNamePasPhoto(urlIDCard);

    // New Note
    let note = detailArr && detailArr[0]?.note_employee;
    setLastNote(note);
  }, [detailArr]);

  useEffect(() => {
    uploadNewPhoto(fileFormKehilangan);
    // eslint-disable-next-line
  }, [fileFormKehilangan]);

  useEffect(() => {
    uploadNewPhoto(filePasPhoto);
    // eslint-disable-next-line
  }, [filePasPhoto]);

  useEffect(() => {
    checkerNewNote();
    // eslint-disable-next-line
  }, [noteEmployee, lastNote]);

  return (
    <>
      <Form.Group className="d-md-flex w-100">
        <Form.Group className="mb-3 me-md-3 w-100 w-md-50">
          <div>
            <Form.Group className="mb-2">
              <TextForm text="Reason for Submission" />
              <IssueDropdown
                setSelected={setReason}
                data={arrOption}
                className="wrapper-div py-0"
                defaultValue={reason}
              />
            </Form.Group>
            <Form.Group className="note-wrapper fst-italic d-flex flex-column flex-lg-row  ">
              <span className="fs-11">Note :</span>
              <div className="d-flex flex-column ms-1 desc-wrapper mb-4">
                <span>
                  - Jika IDCARD KERUSAKAN mohon dilampirkan IDCARD yang
                  KERUSAKAN saat pengambilan
                </span>
                <span>
                  - pergantian IDCARD akan dilakukan potong gaji sebesar Rp.
                  30.000,-
                </span>
              </div>
            </Form.Group>
            <div className="d-flex flex-column flex-md-row download-excel-btn w-100 w-lg-50">
              {folderNameFormKehilangan !== undefined &&
              folderNameFormKehilangan !== "" ? (
                <Button
                  className="p-0 w-100 w-md-50"
                  variant="outline-secondary-a-bit"
                  onClick={() => saveAs(urlNameFormKehilangan)}
                >
                  Download Form
                </Button>
              ) : (
                <Button
                  className="p-0 w-100 w-md-50"
                  variant="outline-secondary-a-bit"
                  disabled
                >
                  Download Form
                </Button>
              )}
              <div className="w-100 w-md-50 ms-0 ms-md-3 mt-1 mt-md-0 position-relative">
                {folderNameFormKehilangan !== undefined &&
                  folderNameFormKehilangan !== "" && (
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
                      <Icon
                        path={CloseIcon}
                        size={1}
                        role="button"
                        className="position-absolute icon-clear h-100"
                        onClick={() =>
                          handleDeleteLastFile(folderNameFormKehilangan)
                        }
                      />
                    </>
                  )}
                {(folderNameFormKehilangan === undefined ||
                  folderNameFormKehilangan === "") &&
                  folderFormKehilanganUploaded === "" && (
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
                  )}
                {folderFormKehilanganUploaded !== "" && (
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
                    <Icon
                      path={CloseIcon}
                      size={1}
                      role="button"
                      className="position-absolute icon-clear h-100"
                      onClick={() =>
                        handleDeleteRecentFile(
                          folderFormKehilanganUploaded,
                          "form_kehilangan"
                        )
                      }
                    />
                  </>
                )}
              </div>
            </div>
            <Form.Group className="note-wrapper fst-italic pt-5 pt-md-2">
              <span className="fs-11 ">
                Note : Bisa tanda tangan digital maupun basah
              </span>
            </Form.Group>
          </div>
          <Form.Group className="w-100 mt-3 pt-3 pt-sm-0">
            {detailArr?.map((data, id) => {
              return (
                <Form.Group className="w-100 mt-3 pt-3 pt-sm-0" key={id}>
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
              );
            })}
          </Form.Group>
        </Form.Group>
        <Form.Group className="mb-3 w-md-50 w-100 ms-md-3 d-flex align-items-center justify-content-center ">
          {folderNamePasPhoto !== undefined && folderNamePasPhoto !== "" && (
            <div className="div-image position-relative">
              <Image src={urlNamePasPhoto} className="rounded-cirle" />
              <Icon
                path={CloseIcon}
                size={1}
                role="button"
                className="position-absolute h-100 icon-img-upload"
                onClick={() => handleDeleteLastFile(folderNamePasPhoto)}
              />
            </div>
          )}
          {(folderNamePasPhoto === undefined || folderNamePasPhoto === "") &&
            folderPasPhotoUploaded === "" && (
              <>
                <input
                  type="file"
                  id="filefile"
                  accept="image/png, image/jpg, image/jpeg"
                  className="d-none"
                  onChange={(e) => onChangePicturePasPhoto(e)}
                />
                <label htmlFor="filefile" className="p-0 " role="button">
                  <div className="text-center bg-light-grey px-5 py-10 rounded-circle ">
                    <span className="mb-0">
                      Choose Your Photo <br /> <u>Browse</u>
                    </span>
                  </div>
                </label>
              </>
            )}
          {folderPasPhotoUploaded !== undefined &&
            folderPasPhotoUploaded !== "" && (
              <div className="div-image position-relative">
                <Image src={urlPasPhotoUploaded} className="rounded-cirle" />
                <Icon
                  path={CloseIcon}
                  size={1}
                  role="button"
                  className="position-absolute h-100 icon-img-upload"
                  onClick={() =>
                    handleDeleteRecentFile(folderPasPhotoUploaded, "pas_photo")
                  }
                />
              </div>
            )}
        </Form.Group>
      </Form.Group>
      <div className="d-flex justify-content-start flex-column flex-md-row w-100">
        {detailArr?.map((data, id) => {
          return (
            <div className="w-100 w-md-75 mb-3 mb-md-0" key={id}>
              <TextForm text="Note PIC" />
              <DisabledInput
                type="text"
                placeholder={data?.note_pic}
                value={data?.note_pic}
                className="wrapper-div pt-1"
              />
            </div>
          );
        })}
        <div className="w-100 w-md-25"></div>
      </div>
      <div className="w-100 d-flex justify-content-end btn-z-index mt-3">
        {folderFormKehilanganUploaded === "" &&
        folderPasPhotoUploaded === "" ? (
          <ButtonBadgePIC text="Submit" className="mb-0" disabled={true} />
        ) : (
          <ButtonBadgePIC
            text="Submit"
            className="mb-0"
            onClick={(e) => checkerRevision(e)}
          />
        )}
      </div>
    </>
  );
};

export default RevisionHilangIDCard;
