// import node module libraries
import React, {
  useContext,
  Fragment,
  useState,
  useRef,
  useEffect,
} from "react";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import {
  Accordion,
  Card,
  useAccordionButton,
  AccordionContext,
  OverlayTrigger,
  Tooltip,
  Form,
  Row,
  Col,
  Dropdown,
  CloseButton,
} from "react-bootstrap";
import { MdDragHandle } from "react-icons/md";
import Icon from "@mdi/react";
import { mdiNote, mdiFitToScreen } from "@mdi/js";
import { AddNewModal } from "../../../../../layouts/e-digital/maindesk/category/modal/AddNewModal";
import axios from "axios";
import { ReportModule } from "../../../../../layouts/e-digital/maindesk/program/report/ReportModule";
import ModalPICTicket from "../../../database-admin/elements/ModalPICTicket";
import NotifSuccessModal from "../../../elements/modal/NotifSuccessModal";
import ErrorAlert from "../../../dashboard/ticketing/elements/alerts/ErrorAlert";
import ProcessLoadingModal from "../../../elements/modal/ProcessLoadingModal";
import { mdiClose as CloseIcon } from "@mdi/js";
import LoadingComponent from "../../../elements/loading/LoadingComponent";

const GKAccordionModule = ({
  accordionItems,
  uid,
  token,
  fetchSilabus,
  silabusId,
  report,
}) => {
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [modalLoading, setModalLoading] = useState(false);
  const [caution, setCaution] = useState(false);
  const [success, setSuccess] = useState(false);

  const [preview, setPreview] = useState(false);
  const [moduleFile, setModuleFile] = useState("");
  const [showUpdate, setShowUpdate] = useState(false);
  const [reportModule, setReportModule] = useState(false);

  const [moduleTitle, setModuleTitle] = useState("");
  const [uploadType, setUploadType] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [updatedId, setUpdatedId] = useState("");

  const ref = useRef();
  const [warningFile, setWarningFile] = useState(false);
  const [file, setFile] = useState({
    banner: null,
    fileName: "",
    folderName: "",
    fileExtension: "",
    collection_name: "",
    prev: "",
  });

  const onChangeFile = (e) => {
    const fileData = e.target.files[0];
    if (fileData) {
      if (fileData.size >= 50000000) {
        setWarningFile(true);
      } else {
        setFile({
          ...file,
          banner: fileData,
        });
      }
    }
  };

  const deleteFile = () => {
    ref.current.value = "";
    deleteFolder(file.folderName);
  };

  const deleteFolder = async (folderName) => {
    try {
      await axios
        .delete(`/upload/remove-temp-folder/${folderName}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(async (res) => {
          if (res?.status === 200) {
            setFile({ ...file, banner: null, fileName: "", folderName: "" });
          } else {
            return res;
          }
        });
    } catch (e) {
      return e;
    }
  };

  const handleDeleteRecentFile = async () => {
    let folder = file?.prev;
    try {
      await axios
        .delete(`euniv/delete-file/${folder}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(async (res) => {
          if (res?.status === 200) {
            setFile({
              fileName: "",
              folderName: "",
              fileExtension: "",
              prev: "",
            });
            await fetchSilabus();
          }
        });
    } catch (err) {
      return err;
    }
  };

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("file", file.banner);
    try {
      await axios
        .post("/upload/single-file", formData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res?.status === 200) {
            const newFile = res?.data?.data?.file_name;
            const newFolder = res?.data?.data?.folder_name;
            const newExt = res?.data?.data?.file_ext;
            setFile({
              ...file,
              fileName: newFile,
              folderName: newFolder,
              fileExtension: newExt,
            });
          } else {
            return res;
          }
        });
    } catch (err) {
      return err;
    }
  };

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Link
      to=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </Link>
  ));

  const ActionMenu = ({ id }) => {
    return (
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle}>
          <i className="fs-5 fe fe-more-vertical text-muted"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu align="end">
          <Dropdown.Header>Settings</Dropdown.Header>
          <Dropdown.Item
            onClick={() => {
              setReportModule(true);
              setUpdatedId(id);
            }}
            eventKey="1"
          >
            {" "}
            <i className="dropdown-item-icon fe fe-eye text-black"></i>See
            Learning Status
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  const handleUploadChange = (event) => {
    setUploadType(event.target.id);
  };

  const updateModule = async (e, value) => {
    e.preventDefault();
    try {
      setModalLoading(true);
      let dataInput =
        uploadType === "link"
          ? {
              id: value,
              uid: uid,
              name: moduleTitle,
              link_url: linkUrl,
            }
          : uploadType === "file" && file?.banner === null
          ? {
              id: value,
              uid: uid,
              name: moduleTitle,
              files: [],
            }
          : {
              id: value,
              uid: uid,
              name: moduleTitle,
              files: [
                {
                  folder_name: file.folderName,
                  file_name: file.fileName,
                  file_extension: file.fileExtension,
                  collection_name: "module_files",
                },
              ],
            };
      await axios
        .post("/euniv/update-module", dataInput, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(async (res) => {
          if (res?.status === 200) {
            setShowUpdate(false);
            setModalLoading(false);
            await fetchSilabus();
          } else if (res?.status === 400) {
            setModalLoading(false);
            setWarning(true);
            return setWarningMessage("Please fill all the required inputs");
          } else if (res?.status === 500) {
            setModalLoading(false);
            setWarning(true);
            setWarningMessage(res?.data?.message);
          } else {
            setModalLoading(false);
          }
        });
    } catch (e) {
      return e;
    }
  };

  const deleteModule = async (silabusId, updatedId, idx) => {
    try {
      setModalLoading(true);
      await axios
        .delete(`/euniv/delete-module/${silabusId}/${updatedId}/${idx}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(async (res) => {
          if (res?.status === 200) {
            await fetchSilabus();
            setSuccess(true);
            setTimeout(() => {
              setSuccess(false);
            }, 1500);
            setModalLoading(false);
          } else if (res?.status === 500) {
            setWarning(true);
            setModalLoading(false);
            return setWarningMessage(res?.data?.message);
          } else if (res?.status === 429) {
            setWarning(true);
            setModalLoading(false);
            return setWarningMessage(
              "Too many request at one moment, please try again later.."
            );
          } else {
            setModalLoading(false);
          }
        });
    } catch (e) {
      return e;
    }
  };

  const ContextAwareToggle = ({
    children,
    eventKey,
    callback,
    idx,
    linkUrl,
    files,
    item,
  }) => {
    const currentEventKey = useContext(AccordionContext);
    const decoratedOnClick = useAccordionButton(
      eventKey,
      () => callback && callback(eventKey)
    );
    const isCurrentEventKey = currentEventKey?.activeEventKey === eventKey;
    const overlayKeyEdit = uuid();
    const overlayKeyDelete = uuid();

    return (
      <Fragment>
        <div className="d-flex align-items-center justify-content-between">
          <h5 className="mb-0 fw-bold">
            <Link
              onClick={decoratedOnClick}
              aria-expanded={isCurrentEventKey}
              to="#"
              className="text-inherit"
            >
              <span className="align-middle p-1">{children}</span>
            </Link>
          </h5>
          <div>
            {report ? (
              <ActionMenu id={eventKey} />
            ) : (
              <>
                <Link
                  to={files.length === 0 ? linkUrl : "#"}
                  target={files.length === 0 ? "_blank" : ""}
                  onClick={
                    files.length > 0
                      ? () => {
                          setPreview(true);
                          setModuleFile(files[0]?.url);
                        }
                      : null
                  }
                  rel="noopener noreferrer"
                  style={{ fontFamily: "Roboto" }}
                  className="me-1 text-primary fs-5 fw-normal text-decoration-underline"
                >
                  See Module
                </Link>
                <OverlayTrigger
                  key={overlayKeyEdit}
                  placement="top"
                  overlay={<Tooltip id="tooltip-top"> Edit</Tooltip>}
                >
                  <Link
                    to="#"
                    onClick={() => {
                      setShowUpdate(true);
                      setUpdatedId(eventKey);
                      setLinkUrl(linkUrl);
                      setFile({
                        prev: files.length !== 0 ? files[0].folder_name : "",
                        banner: null,
                      });
                      setModuleTitle(item.name);
                      if (!item.link_url && file.length === 0) {
                        setUploadType("");
                      } else if (!item.link_url && file.length !== 0) {
                        setUploadType("file");
                      } else if (item.link_url && file.length !== 0) {
                        setUploadType("link");
                      }
                    }}
                    className="me-1 text-inherit"
                    title="Edit"
                  >
                    <i className="fe fe-edit fs-6"></i>
                  </Link>
                </OverlayTrigger>

                <OverlayTrigger
                  key={overlayKeyDelete}
                  placement="top"
                  overlay={<Tooltip id="tooltip-top"> Delete</Tooltip>}
                >
                  <Link
                    to="#"
                    onClick={
                      files.length === 0 && !linkUrl
                        ? () => deleteModule(silabusId, eventKey, idx)
                        : () => setCaution(true)
                    }
                    className="me-1 text-inherit"
                    title="Delete"
                  >
                    <i className="fe fe-trash-2 fs-6"></i>
                  </Link>
                </OverlayTrigger>

                {/* <Link
                  to="#"
                  className="text-inherit"
                  data-bs-toggle="collapse"
                  onClick={decoratedOnClick}
                  aria-expanded={isCurrentEventKey}
                >
                  <span className="chevron-arrow">
                    <i className="fe fe-chevron-down fs-5"></i>
                  </span>
                </Link> */}
              </>
            )}
          </div>
        </div>

        {caution && (
          <ModalPICTicket
            setShow={setCaution}
            show={caution}
            buttonClassName="py-2 px-3 rounded-3  h4"
            onClick={() => {
              deleteModule(silabusId, eventKey, idx);
              setCaution(false);
            }}
            title="Caution"
          >
            <p className="mb-0 text-kinda-dark">
              Are you sure want to delete this module ? There is a file in this
              module.
            </p>
          </ModalPICTicket>
        )}
      </Fragment>
    );
  };
  useEffect(() => {
    // file?.banner !== null && uploadFile();
    if (
      file &&
      file.banner !== null &&
      file.banner !== "" &&
      file.banner !== undefined
    ) {
      uploadFile();
    }
  }, [file.banner]);

  useEffect(() => {
    if (uploadType === "link") {
      file?.banner !== null && deleteFile();
    } else {
      setLinkUrl("");
    }
  }, [uploadType]);

  return (
    <Fragment>
      <Accordion defaultActiveKey={accordionItems?.id}>
        <Card className="px-2 py-2 mb-0 shadow-none">
          <Card.Header className="bg-transparent border-0 p-0">
            <div className="border-0">
              <h3 className="mb-0">
                <ContextAwareToggle
                  eventKey={accordionItems?.id}
                  idx={accordionItems?.idx}
                  linkUrl={accordionItems?.link_url}
                  files={accordionItems?.files}
                  item={accordionItems}
                >
                  <MdDragHandle />{" "}
                  <Icon
                    path={mdiFitToScreen}
                    size={0.8}
                    className="text-white bg-success me-1 p-1 rounded-2"
                  />{" "}
                  {accordionItems?.name}
                </ContextAwareToggle>
              </h3>
            </div>
          </Card.Header>
        </Card>
        {/* ))} */}
      </Accordion>
      {showUpdate && (
        <AddNewModal
          size="lg"
          setShow={setShowUpdate}
          show={showUpdate}
          buttonClassName="py-2 px-3 rounded-3"
          text1="Cancel"
          text2="Add"
          variant1="outline-primary"
          variant2="primary"
          title="Edit Module"
          disabled={loading || warningFile ? true : false}
          onClick={(e) => updateModule(e, updatedId)}
        >
          <Row>
            <Col md={12} xs={12} className="mb-3">
              <Form.Label>Module Title</Form.Label>
              <Form.Control
                type="text"
                value={moduleTitle}
                onChange={(e) => setModuleTitle(e.target.value)}
              />
              <Form.Text>
                Pastikan tidak melebihi dari 60 karakter dan tuliskan judul yang
                menggambarkan topik yang akan dibahas
              </Form.Text>
            </Col>
            {warningFile && (
              <ErrorAlert
                setState={setWarningFile}
                text1="File yang diunggah lebih dari 50 MB,"
                span="Mohon unggah ulang dibawah 50 MB"
              />
            )}
            <Col md={5} xs={12} className="mb-3">
              <Form.Label>
                <Form.Check
                  type="radio"
                  id="link"
                  label="Video Link/Url "
                  className="form-check-inline"
                  onClick={handleUploadChange}
                  disabled={file.prev !== ""}
                  checked={uploadType === "link"}
                  onChange={() => null}
                />
              </Form.Label>
              <Form.Control
                type="text"
                value={linkUrl}
                disabled={uploadType === "file" || uploadType === ""}
                placeholder="Sertakan link/url disini"
                onChange={(e) => setLinkUrl(e.target.value)}
              />
              <Form.Text>Link harus berupa Link Youtube</Form.Text>
            </Col>
            <Col className="p-0 text-middle text-center">or</Col>
            <Col md={6} xs={12}>
              <Form.Label>
                <Form.Check
                  type="radio"
                  id="file"
                  label="Upload Article/Slide "
                  className="form-check-inline"
                  onClick={handleUploadChange}
                  checked={uploadType === "file"}
                  onChange={() => null}
                />
              </Form.Label>
              {file.prev !== "" ? (
                <div className="position-relative">
                  <input type="file" id="file" className="d-none" disabled />
                  <label
                    htmlFor="file"
                    className="p-0 w-100 h-100 label-input-excel py-4"
                    role="button"
                  >
                    Disabled
                  </label>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="delete-tooltip">
                        The file will be deleted permanently
                      </Tooltip>
                    }
                  >
                    <Icon
                      path={CloseIcon}
                      size={1}
                      role="button"
                      className="position-absolute icon-file-upload h-100"
                      onClick={handleDeleteRecentFile}
                    />
                  </OverlayTrigger>
                </div>
              ) : (
                <div className="position-relative">
                  <Form.Control
                    type="file"
                    accept=".ppt, .pptx"
                    disabled={uploadType === "link"}
                    onChange={onChangeFile}
                    ref={ref}
                  />
                  <div>
                    <CloseButton
                      onClick={deleteFile}
                      className="btn-close form-contol position-absolute"
                      style={{ top: "15px", right: "10px" }}
                    />
                  </div>
                </div>
              )}
              <div className="d-flex justify-content-between">
                <Form.Text>Pastikan tidak melebihi 50 MB</Form.Text>{" "}
                {loading && <LoadingComponent className="mt-3" />}
              </div>
            </Col>
          </Row>
        </AddNewModal>
      )}
      {reportModule && (
        <ReportModule
          show={reportModule}
          setShow={setReportModule}
          id={updatedId}
        />
      )}
      {preview && (
        <AddNewModal
          title="Preview Module"
          size="lg"
          setShow={setPreview}
          show={preview}
        >
          <iframe
            src={`${moduleFile}`}
            frameBorder="0"
            title="iframe-modal"
            className=""
            style={{
              borderRadius: "8px",
              width: "100%",
              height: "100%",
              minHeight: "500px",
            }}
          ></iframe>
        </AddNewModal>
      )}
      {success && (
        <NotifSuccessModal
          show={success}
          setShow={setSuccess}
          text="Success Delete Module"
        ></NotifSuccessModal>
      )}
      {warning && (
        <NotifSuccessModal show={warning} setShow={setWarning}>
          <ErrorAlert
            setState={setWarning}
            text1={warningMessage}
            className="mb-0"
          />
        </NotifSuccessModal>
      )}
      {modalLoading && (
        <ProcessLoadingModal show={modalLoading} setShow={setModalLoading} />
      )}
    </Fragment>
  );
};

export default GKAccordionModule;
