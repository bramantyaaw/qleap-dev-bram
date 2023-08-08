// import node module libraries
import React, {
  useContext,
  Fragment,
  useState,
  useEffect,
  useRef,
} from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import {
  Accordion,
  Card,
  useAccordionButton,
  AccordionContext,
  OverlayTrigger,
  Tooltip,
  Button,
  Form,
  Row,
  Col,
  Badge,
  CloseButton,
  Dropdown,
} from "react-bootstrap";
import { MdDragHandle } from "react-icons/md";
import Icon from "@mdi/react";
import { mdiNote, mdiFitToScreen } from "@mdi/js";
import GKAccordionModule from "./GKAccordionModule";
import { AddNewModal } from "../../../../../layouts/e-digital/maindesk/category/modal/AddNewModal";
import ReactQuill from "react-quill";
import GKAccordionExam from "./GKAccordionExam";
import axios from "axios";
import { FlatPickrTime } from "../../../elements/flat-pickr/FlatPickrTime";
import Select from "react-select";
import ErrorAlert from "../../../dashboard/ticketing/elements/alerts/ErrorAlert";
import ModalPICTicket from "../../../database-admin/elements/ModalPICTicket";
import NotifSuccessModal from "../../../elements/modal/NotifSuccessModal";
import ProcessLoadingModal from "../../../elements/modal/ProcessLoadingModal";
import LoadingComponent from "../../../elements/loading/LoadingComponent";
import { formatDateTime } from "../../../../../config/helper/utils";

const GKAccordionActions = ({
  accordionItem,
  onClick,
  uid,
  token,
  fetchSilabus,
  report,
  idProgram,
  loadingSyllabus,
  itemsPerPage,
  pageNumber,
}) => {
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
  const [accordionItems, setAccordionItems] = useState([]);
  useEffect(() => {
    setAccordionItems(accordionItem); // Initialize the accordionItems state when the accordionItem prop changes
  }, [accordionItem]);

  const [caution, setCaution] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [warning, setWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showExam, setShowExam] = useState(false);
  const [showModule, setShowModule] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showExisting, setShowExisting] = useState(false);
  const [showUpdateSilabus, setShowUpdateSilabus] = useState(false);

  const [moduleTitle, setModuleTitle] = useState("");
  const [uploadType, setUploadType] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [examTitle, setExamTitle] = useState("");
  const [chance, setChance] = useState("");
  const [minScore, setMinScore] = useState("");
  const [questionShow, setQuestionShow] = useState("");
  const [trainingCode, setTrainingCode] = useState("");
  const [desc, setDesc] = useState(
    "Selamat datang di (Nama Exam)\n\n<ol><li>Sebelum menjawab, bacalah setiap pertanyaan dengan teliti.</li><li>Pastikan bahwa anda memilih jawaban yang benar di setiap pertanyaan.</li><li>Minimal nilai kelulusan yang harus dicapai adalah 80 disetiap soal pengujian.</li><li>Anda memiliki kesempatan 3x untuk mendapatkan nilai kelulusan.</li></ol>"
  );
  const [updatedId, setUpdatedId] = useState("");

  const [title, setTitle] = useState("");
  const [flow, setFlow] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [moduleExisting, setModuleExisting] = useState([]);
  const [selectedModuleId, setSelectedModuleId] = useState("");
  const [selectedModuleName, setSelectedModuleName] = useState("");

  const [warningFile, setWarningFile] = useState(false);
  const [file, setFile] = useState({
    banner: null,
    fileName: "",
    folderName: "",
    fileExtension: "",
  });

  const [questionCache, setQuestionCache] = useState({});
  const [questionList, setQuestionList] = useState([]);
  const [updatedQuestion, setUpdatedQuestion] = useState(false);

  const [dateStart, setDateStart] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);

  const [hideSyllabus, setHideSyllabus] = useState(false);

  const ref = useRef();
  const currentDate = new Date();

  const handleFlowChange = (event) => {
    setFlow(event.target.id);
  };

  const handleUploadChange = (event) => {
    setUploadType(event.target.id);
  };

  function handleChange(value) {
    setDesc(value);
  }

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

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("file", file.banner);
    try {
      setLoading(true);
      await axios
        .post("/upload/single-file", formData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res?.status === 200) {
            setLoading(false);
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
            setLoading(false);
          }
        });
    } catch (err) {
      return err;
    }
  };

  const submitModule = async (e, value) => {
    e.preventDefault();
    try {
      setModalLoading(true);
      setDisableButton(true);
      let dataInput =
        uploadType === "link"
          ? {
              syllabus_id: value,
              uid: uid,
              name: moduleTitle,
              link_url: linkUrl,
              type_submit: "new",
            }
          : {
              syllabus_id: value,
              uid: uid,
              name: moduleTitle,
              type_submit: "new",
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
        .post("/euniv/submit-module", dataInput, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(async (res) => {
          if (res?.status === 200) {
            setModuleTitle("");
            setUploadType("");
            setLinkUrl("");
            setFile({
              banner: null,
              fileName: "",
              folderName: "",
              fileExtension: "",
            });
            setShowNew(false);
            setModalLoading(false);
            setDisableButton(false);
            await fetchSilabus();
          } else if (res?.status === 500) {
            setWarning(true);
            setModalLoading(false);
            setDisableButton(false);
            return setWarningMessage(res?.data?.message);
          } else if (res?.status === 429) {
            setWarning(true);
            setModalLoading(false);
            setDisableButton(false);
            return setWarningMessage(
              "Too many request at one moment, please try again later.."
            );
          } else {
            setModalLoading(false);
            setDisableButton(false);
          }
        });
    } catch (e) {
      return e;
    }
  };

  const submitExam = async (e, value) => {
    e.preventDefault();
    try {
      setModalLoading(true);
      setDisableButton(true);
      await axios
        .post(
          "/euniv/submit-exam",
          {
            syllabus_id: value,
            uid: uid,
            name: examTitle,
            description: desc,
            questions_show: parseInt(questionShow),
            max_attempt: parseInt(chance),
            minimum_score: parseInt(minScore),
            training_code: trainingCode,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then(async (res) => {
          if (res?.status === 200) {
            setShowExam(false);
            setModalLoading(false);
            setDisableButton(false);
            handleClose();
            await fetchSilabus();
          } else if (res?.status === 500) {
            setWarning(true);
            setModalLoading(false);
            setDisableButton(false);
            return setWarningMessage(res?.data?.message);
          } else if (res?.status === 429) {
            setWarning(true);
            setModalLoading(false);
            setDisableButton(false);
            return setWarningMessage(
              "Too many request at one moment, please try again later.."
            );
          } else {
            setModalLoading(false);
            setDisableButton(false);
          }
        });
    } catch (e) {
      return e;
    }
  };

  const updateSilabus = async (e, value) => {
    e.preventDefault();
    try {
      setModalLoading(true);
      setDisableButton(true);
      // const start = startDate || formatDateTime(dateStart);
      // const end = endDate || formatDateTime(dateEnd);
      const res = await axios.post(
        "/euniv/update-syllabus",
        {
          id: parseInt(value),
          uid: uid,
          name: title,
          syllabus_flow: flow,
          start_date: startDate,
          end_date: endDate,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res?.status === 200) {
        await fetchSilabus();
        setShowUpdateSilabus(false);
        setModalLoading(false);
        setDisableButton(false);
      } else if (res?.status === 500) {
        setWarning(true);
        setModalLoading(false);
        setDisableButton(false);
        return setWarningMessage(res?.data?.message);
      } else if (res?.status === 429) {
        setWarning(true);
        setModalLoading(false);
        setDisableButton(false);
        return setWarningMessage(
          "Too many request at one moment, please try again later.."
        );
      } else {
        return res;
      }
    } catch (e) {
      return e;
    }
  };

  const fetchModule = async (value) => {
    try {
      await axios
        .post(
          "/euniv/get-module",
          {
            search_term: searchTerm,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          const newData = res?.data?.data;
          const newObjArr = newData?.map((data) => {
            const obj = {
              value: data?.id,
              label: data?.name,
            };
            return obj;
          });
          setModuleExisting(newObjArr);
        });
    } catch (e) {
      return e;
    }
  };

  const submitExistingModule = async (e, syllabus_id) => {
    e.preventDefault();
    try {
      setModalLoading(true);
      setDisableButton(true);
      await axios
        .post(
          "/euniv/submit-module",
          {
            syllabus_id: parseInt(syllabus_id),
            uid,
            module_id: parseInt(selectedModuleId),
            type_submit: "existing",
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          if (res?.status === 200) {
            setShowExisting(false);
            setModalLoading(false);
            setDisableButton(false);
            fetchSilabus();
          } else if (res?.status === 500) {
            setWarning(true);
            setModalLoading(false);
            setDisableButton(false);
            return setWarningMessage(res?.data?.message);
          } else if (res?.status === 429) {
            setWarning(true);
            setModalLoading(false);
            setDisableButton(false);
            return setWarningMessage(
              "Too many request at one moment, please try again later.."
            );
          } else {
            setModalLoading(false);
            setDisableButton(false);
          }
        });
    } catch (e) {
      return e;
    }
  };

  const deleteSilabus = async (idProgram, updatedId, idx) => {
    try {
      setModalLoading(true);
      await axios
        .delete(`/euniv/delete-syllabus/${idProgram}/${updatedId}/${idx}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(async (res) => {
          if (res?.status === 200) {
            await fetchSilabus();
            setSuccess(true);
            setSuccessMessage("Success Delete Syllabus");
            setTimeout(() => {
              setSuccess(false);
            }, 1000);
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

  const handleSelectedModule = (selectedOption) => {
    setSelectedModuleId(selectedOption?.value);
    setSelectedModuleName(selectedOption?.label);
  };

  const handleInputChange = (inputValue) => {
    setSearchTerm(inputValue);
  };

  //Fetch List Question
  const fetchQuestion = async (exam_id) => {
    try {
      // Check if the questionList data is already in the cache
      if (questionCache[exam_id] && !updatedQuestion) {
        setQuestionList(questionCache[exam_id]);
      } else {
        await axios
          .post(
            "/euniv/get-question-exam",
            {
              exam_id: parseInt(exam_id),
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then((res) => {
            // Update the questionList state
            setQuestionList(res?.data?.data);

            // Store the questionList data in the cache
            setQuestionCache((prevCache) => ({
              ...prevCache,
              [exam_id]: res?.data?.data,
            }));
          });
      }
    } catch (e) {
      return e;
    }
  };

  const handleClose = () => {
    // setDesc("");
    setChance("");
    setMinScore("");
    setQuestionShow("");
    setFlow("");
    setEndDate("");
    setStartDate("");
    setModuleTitle("");
    setUploadType("");
    setLinkUrl("");
  };

  const reorderPositions = async (idx, order_id) => {
    try {
      await axios.post(
        "/euniv/reorder-syllabus-position",
        {
          program_id: idProgram,
          idx: idx,
          syllabus_order_id: order_id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Fetch the updated accordion items
      // await fetchSilabus();
    } catch (error) {
      return error;
    }
  };

  const reorderActivity = async (idx, order_id, sylabusId) => {
    try {
      await axios.post(
        "/euniv/reorder-syllabus-activity-position",
        {
          syllabus_id: sylabusId,
          idx: idx,
          syllabus_activity_order_id: order_id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Fetch the updated accordion items
      // fetchSilabus();
    } catch (error) {
      return error;
    }
  };

  const onDragEnd = (result) => {
    const { source, destination, draggableId, type } = result;

    // Check if the item is dropped outside a valid droppable area
    if (!destination) {
      return;
    }

    // Check if the item is dropped in the same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Handle reordering syllabus
    if (type === "ACCORDION_ITEM") {
      const newAccordionItems = Array.from(accordionItems);
      const draggedItem = newAccordionItems[source.index];
      const destinationOverallIndex =
        destination.index + pageNumber * itemsPerPage;

      newAccordionItems.splice(source.index, 1);
      newAccordionItems.splice(destination.index, 0, draggedItem);

      // Update the state with the new order of accordion items
      setAccordionItems(newAccordionItems);
      reorderPositions(destination?.index + 1, draggedItem.order_id);
      // reorderPositions(destinationOverallIndex + 1, draggedItem.order_id);
    }

    // Handle reordering of syllabus activities (exam or module)
    if (type === "SYLLABUS_ACTIVITY") {
      // Find the corresponding accordion item based on the droppableId
      const accordionItemId = destination.droppableId.split("-")[1];
      const accordionItem = accordionItems.find(
        (item) => String(item.id) === accordionItemId
      );

      if (accordionItem) {
        const newSyllabusActivities = Array.from(
          accordionItem.syllabus_activity
        );
        const draggedActivity = newSyllabusActivities[source.index];

        newSyllabusActivities.splice(source.index, 1);
        newSyllabusActivities.splice(destination.index, 0, draggedActivity);

        // Update the state with the new order of syllabus activities for the corresponding accordion item
        const newAccordionItems = accordionItems.map((item) =>
          item.id === accordionItem.id
            ? { ...item, syllabus_activity: newSyllabusActivities }
            : item
        );
        setAccordionItems(newAccordionItems);
        reorderActivity(
          destination?.index + 1,
          draggedActivity.order_id,
          accordionItem.id
        );
      }
    }
  };

  const ActionMenu = ({ startDate, endDate, item, idx, sylabusId }) => {
    return (
      <Dropdown as="span">
        <Dropdown.Toggle as={CustomToggle}>
          <i className="fs-6 text-inherit fe fe-more-vertical"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu align="end">
          <Dropdown.Header>Settings</Dropdown.Header>
          <Dropdown.Item
            onClick={() => {
              setShowUpdateSilabus(true);
              setUpdatedId(sylabusId);
              setTitle(item?.name);
              setStartDate(startDate);
              setEndDate(endDate);
              setDateEnd(endDate);
              setDateStart(startDate);
              setFlow(item?.syllabus_flow);
            }}
            eventKey="1"
          >
            {" "}
            <i className="dropdown-item-icon fe fe-edit text-black"></i>Edit
            Syllabus
          </Dropdown.Item>
          <Dropdown.Item
            onClick={
              item?.module || item?.exam
                ? () => setCaution(true)
                : () => deleteSilabus(idProgram, sylabusId, idx)
            }
            eventKey="2"
          >
            {" "}
            <i className="dropdown-item-icon fe fe-trash-2 text-black"></i>
            Delete Syllabus
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  const ContextAwareToggle = ({
    children,
    eventKey,
    callback,
    startDate,
    endDate,
    item,
    idx,
    expired,
  }) => {
    const currentEventKey = useContext(AccordionContext);
    const decoratedOnClick = useAccordionButton(
      eventKey,
      () => callback && callback(eventKey)
    );
    const isCurrentEventKey = currentEventKey === eventKey;
    const overlayKeyEdit = uuid();
    const overlayKeyDelete = uuid();
    const overlayKeyShow = uuid();
    const overlayKeyHide = uuid();
    const overlayKeyLink = uuid();
    return (
      <Fragment>
        <div className="d-flex align-items-center justify-content-between">
          <Link
            onClick={decoratedOnClick}
            aria-expanded={isCurrentEventKey}
            to="#"
            className="text-inherit"
          >
            <span className="align-middle">{children}</span>
          </Link>
          <div>
            <>
              {/* {expired ? (
                <>
                  <Badge bg="secondary" className="me-1">
                    Hide Syllabus
                  </Badge>
                  <i className="text-muted me-1 fe fe-eye-off fs-5"></i>
                  <i className="text-muted me-1 fe fe-link-2 fs-5"></i>
                </>
              ) : hideSyllabus ? (
                <>
                  {" "}
                  <Badge bg="info" className="me-1">
                    Show Syllabus
                  </Badge>
                  {!report && (
                    <>
                      {" "}
                      <OverlayTrigger
                        key={overlayKeyHide}
                        placement="top"
                        overlay={
                          <Tooltip id="tooltip-top">Hide Syllabus</Tooltip>
                        }
                      >
                        <Link
                          to="#"
                          onClick={() => setHideSyllabus(false)}
                          className="me-1 text-inherit"
                          title="Hide Syllabus"
                        >
                          <i className="fe fe-eye fs-5"></i>
                        </Link>
                      </OverlayTrigger>
                      <i className="text-muted me-1 fe fe-link-2 fs-5"></i>
                    </>
                  )}
                </>
              ) : (
                <>
                  <Badge bg="secondary" className="me-1">
                    Hide Syllabus
                  </Badge>
                  {!report && (
                    <>
                      <OverlayTrigger
                        key={overlayKeyShow}
                        placement="top"
                        overlay={
                          <Tooltip id="tooltip-top"> Show Syllabus</Tooltip>
                        }
                      >
                        <Link
                          to="#"
                          onClick={() => setHideSyllabus(true)}
                          className="me-1 text-inherit"
                          title="Show Syllabus"
                        >
                          <i className="fe fe-eye-off fs-5"></i>
                        </Link>
                      </OverlayTrigger>
                      <OverlayTrigger
                        key={overlayKeyLink}
                        placement="top"
                        overlay={
                          <Tooltip id="tooltip-top">Copy Syllabus Link</Tooltip>
                        }
                      >
                        <Link
                          to="#"
                          className="me-1 text-inherit"
                          title="Copy Syllabus Link"
                          disabled={isCurrentEventKey}
                          onClick={() => {
                            setSuccess(true);
                            setSuccessMessage("Link Copied");
                            setTimeout(() => {
                              setSuccess(false);
                            }, 1000);
                            navigator.clipboard.writeText(
                              "Copy this text to clipboard"
                            );
                          }}
                        >
                          <i className="fe fe-link-2 fs-5"></i>
                        </Link>
                      </OverlayTrigger>
                    </>
                  )}
                </>
              )}
              {!report && (
                <ActionMenu
                  startDate={startDate}
                  endDate={endDate}
                  item={item}
                  idx={idx}
                  sylabusId={eventKey}
                />
              )} */}

              <OverlayTrigger
                key={overlayKeyEdit}
                placement="top"
                overlay={<Tooltip id="tooltip-top"> Edit</Tooltip>}
              >
                <Link
                  to="#"
                  onClick={() => {
                    setShowUpdateSilabus(true);
                    setUpdatedId(eventKey);
                    setTitle(item?.name);
                    setStartDate(startDate);
                    setEndDate(endDate);
                    setDateEnd(endDate);
                    setDateStart(startDate);
                    setFlow(item?.syllabus_flow);
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
                    item?.module || item?.exam
                      ? () => setCaution(true)
                      : () => deleteSilabus(idProgram, eventKey, idx)
                  }
                  className="me-1 text-inherit"
                  title="Delete"
                >
                  <i className="fe fe-trash-2 fs-6"></i>
                </Link>
              </OverlayTrigger>
            </>

            <Link
              to="#"
              className="text-inherit"
              data-bs-toggle="collapse"
              onClick={decoratedOnClick}
              aria-expanded={isCurrentEventKey}
            >
              <span className="chevron-arrow">
                <i className="fe fe-chevron-down fs-5"></i>
              </span>
            </Link>
          </div>
        </div>

        {caution && (
          <ModalPICTicket
            setShow={setCaution}
            show={caution}
            buttonClassName="py-2 px-3 rounded-3  h4"
            onClick={() => {
              deleteSilabus(idProgram, eventKey, idx);
              setCaution(false);
            }}
            title="Caution"
          >
            <p className="mb-0 text-kinda-dark">
              Are you sure want to delete this syllabus ? There is a module/exam
              in this syllabus.
            </p>
          </ModalPICTicket>
        )}
      </Fragment>
    );
  };

  useEffect(() => {
    file?.banner !== null && uploadFile();
  }, [file.banner]);

  useEffect(() => {
    if (uploadType === "link") {
      file?.banner !== null && deleteFile();
    } else {
      setLinkUrl("");
    }
  }, [uploadType]);

  useEffect(() => {
    showExisting && fetchModule();
  }, [searchTerm]);

  return (
    <Fragment>
      {accordionItems?.length === 0 ? (
        <Card className="px-2 py-2 mb-1 shadow-none">
          {loadingSyllabus ? (
            <LoadingComponent />
          ) : (
            <Card.Header className="bg-transparent border-0 p-0">
              <div className="border-0">
                <ContextAwareToggle>
                  <MdDragHandle />
                  <span className="text-muted fw-normal">
                    + Klik “New Add” untuk menambahkan
                  </span>
                </ContextAwareToggle>
              </div>
            </Card.Header>
          )}
        </Card>
      ) : (
        <>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="accordionItems" type="ACCORDION_ITEM">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {/* Your existing code for the accordion items */}
                  <Accordion defaultActiveKey={accordionItems?.[0]?.id}>
                    {accordionItems?.map((item, index) => {
                      const end = new Date(
                        item?.end_date?.replace(
                          /(\d{2})\/(\d{2})\/(\d{4}), (\d{2}:\d{2})/,
                          "$2/$1/$3 $4"
                        )
                      );
                      const expired = currentDate > end ? true : false;
                      return (
                        <Draggable
                          key={String(item?.id)} // Convert the ID to a string using String()
                          draggableId={String(item?.order_id)}
                          index={index}
                          isDragDisabled={report}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Card
                                key={item?.id}
                                className="px-2 py-2 mb-2 shadow-none"
                              >
                                <Card.Header className="bg-transparent border-0 p-2">
                                  <div className="border-0">
                                    <ContextAwareToggle
                                      eventKey={item?.id}
                                      startDate={item?.start_date}
                                      endDate={item?.end_date}
                                      idx={item?.idx}
                                      item={item}
                                      expired={expired}
                                    >
                                      <h4 className="mb-0 p-0 fw-bold">
                                        {" "}
                                        <MdDragHandle /> {item?.name}
                                      </h4>

                                      <p className="mt-1 mb-0 ms-3 text-black">
                                        Period Date : {item?.start_date} -{" "}
                                        {item?.end_date}{" "}
                                        {currentDate > end && (
                                          <Badge bg="danger" className="me-1">
                                            <i className="fe fe-alert-circle me-1"></i>
                                            Expired
                                          </Badge>
                                        )}
                                      </p>
                                    </ContextAwareToggle>
                                  </div>
                                </Card.Header>
                                <Accordion.Collapse eventKey={item?.id}>
                                  <Card.Body className="py-0">
                                    <>
                                      <Droppable
                                        droppableId={`syllabus-${item?.id}`}
                                        type="SYLLABUS_ACTIVITY"
                                      >
                                        {(provided) => (
                                          <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                          >
                                            {item?.syllabus_activity?.map(
                                              (data, id) => (
                                                <Draggable
                                                  key={String(data.id)} // Convert the ID to a string using String()
                                                  draggableId={String(
                                                    data.order_id
                                                  )}
                                                  index={id}
                                                  isDragDisabled={report}
                                                >
                                                  {(provided) => (
                                                    <div
                                                      ref={provided.innerRef}
                                                      {...provided.draggableProps}
                                                      {...provided.dragHandleProps}
                                                    >
                                                      {data?.type ===
                                                      "module" ? (
                                                        <GKAccordionModule
                                                          accordionItems={data}
                                                          uid={uid}
                                                          token={token}
                                                          fetchSilabus={
                                                            fetchSilabus
                                                          }
                                                          silabusId={item?.id}
                                                          report={report}
                                                        />
                                                      ) : (
                                                        <GKAccordionExam
                                                          accordionItems={data}
                                                          uid={uid}
                                                          token={token}
                                                          fetchSilabus={
                                                            fetchSilabus
                                                          }
                                                          silabusId={item?.id}
                                                          report={report}
                                                          questionList={
                                                            questionList
                                                          }
                                                          setQuestionList={
                                                            setQuestionList
                                                          }
                                                          questionCache={
                                                            questionCache
                                                          }
                                                          fetchQuestion={
                                                            fetchQuestion
                                                          }
                                                          updatedQuestion={
                                                            updatedQuestion
                                                          }
                                                          setUpdatedQuestion={
                                                            setUpdatedQuestion
                                                          }
                                                        />
                                                      )}
                                                    </div>
                                                  )}
                                                </Draggable>
                                              )
                                            )}
                                            {provided.placeholder}
                                          </div>
                                        )}
                                      </Droppable>

                                      {!report && (
                                        <>
                                          <p className="fs-6 text-muted mb-2 mt-2">
                                            + Tambahkan (exam atau module)
                                          </p>
                                          <div className="">
                                            <Button
                                              className="btn btn-outline-primary mb-1 fw-normal rounded-3"
                                              variant="outline-primary"
                                              size="sm"
                                              onClick={() => {
                                                setShowExam(true);
                                                setUpdatedId(item.id);
                                              }}
                                            >
                                              <Icon
                                                path={mdiNote}
                                                size={0.8}
                                                className="text-white bg-info p-1 me-1 icon-md icon-shape rounded-2"
                                              />
                                              Exam
                                            </Button>
                                            <Button
                                              size="sm"
                                              className="btn btn-outline-primary mb-1 ms-2 fw-normal rounded-3"
                                              variant="outline-primary"
                                              onClick={() => {
                                                setShowModule(true);
                                                setUpdatedId(item.id);
                                              }}
                                            >
                                              <Icon
                                                path={mdiFitToScreen}
                                                size={0.8}
                                                className="text-white bg-success me-1 p-1 rounded-2"
                                              />
                                              Module
                                            </Button>
                                          </div>
                                        </>
                                      )}
                                    </>
                                  </Card.Body>
                                </Accordion.Collapse>
                              </Card>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </Accordion>
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </>
      )}

      {pageNumber === 0 && (
        <div className=" pt-3">
          <Link
            onClick={(e) => {
              e.preventDefault();
              onClick(e);
            }}
            className="btn btn-outline-primary rounded-3 btn-sm mb-1"
          >
            Add Syllabus
          </Link>
        </div>
      )}

      {showExam && (
        <AddNewModal
          size="lg"
          setShow={setShowExam}
          show={showExam}
          buttonClassName="py-2 px-3 rounded-3"
          text1="Cancel"
          text2="Add"
          variant1="outline-primary"
          variant2="primary"
          title="Create Exam"
          onHide={() => {
            handleClose();
            setShowExam(false);
          }}
          disabled={
            !examTitle ||
            !questionShow ||
            questionShow === "0" ||
            !minScore ||
            minScore === "0" ||
            !chance ||
            chance === "0" ||
            !desc ||
            desc.trim().length === 0
              ? true
              : false
          }
          onClick={(e) => submitExam(e, updatedId)}
        >
          <Row>
            <Col md={12} xs={12} className="mb-3">
              <Form.Label>Exam Tittle</Form.Label>
              <Form.Control
                onChange={(e) => setExamTitle(e.target.value)}
                maxLength={40}
                type="text"
              />
              <Form.Text>
                Pastikan tidak melebihi dari 60 karakter dan tuliskan judul yang
                menggambarkan topik yang akan dibahas
              </Form.Text>
            </Col>
            <Col md={6} xs={12} className="mb-3">
              <Form.Label>Questions Show</Form.Label>
              <Form.Control
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const numericValue = inputValue.replace(/[^0-9]/g, "");

                  setQuestionShow(numericValue);
                }}
                value={questionShow}
                type="text"
                placeholder="Jumlah questions yang akan ditampilkan pada Exam "
              />
            </Col>
            <Col md={6} xs={12} className="mb-3">
              <Form.Label>
                Training Code <span className="text-muted">(optional)</span>{" "}
              </Form.Label>
              <Form.Control
                onChange={(e) => setTrainingCode(e.target.value)}
                placeholder="Contoh : 1111-AAAA-11111"
                type="text"
                maxLength={20}
              />
              <Form.Text>Tulis Training Code berdasarkan Proint</Form.Text>
            </Col>
            <Col md={6} xs={12} className="mb-3">
              <Form.Label>Chance</Form.Label>
              <Form.Control
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const numericValue = inputValue.replace(/[^0-9]/g, "");

                  setChance(numericValue);
                }}
                value={chance}
                type="text"
                placeholder="Tuliskan dalam angka"
              />
            </Col>
            <Col md={6} xs={12} className="mb-3">
              <Form.Label>Minimum Score</Form.Label>
              <Form.Control
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const numericValue = inputValue.replace(/[^0-9]/g, "");
                  const parsedValue = parseInt(numericValue, 10);

                  // Check if the numericValue is empty or not a valid number
                  if (isNaN(parsedValue)) {
                    setMinScore("");
                  } else if (parsedValue > 100) {
                    setMinScore("0");
                  } else {
                    setMinScore(parsedValue.toString());
                  }
                }}
                value={minScore}
                type="text"
                placeholder="Tuliskan dalam angka"
              />
            </Col>
            <Col md={12} xs={12} className="mb-3">
              <Form.Label>Description</Form.Label>
              <ReactQuill value={desc} onChange={handleChange} />
              <Form.Text>
                Pastikan tidak melebihi dari 250 karakter dan tuliskan judul
                yang menggambarkan topik yang akan dibahas
              </Form.Text>
            </Col>
          </Row>
        </AddNewModal>
      )}

      {showModule && (
        <AddNewModal
          size="lg"
          setShow={setShowModule}
          show={showModule}
          title="Create Module"
        >
          <Row>
            <p className="fs-6">
              Pilih “New Add” jika ingin menambahkan module baru, pilih “Add
              From Existing” jika ingin menambahkan dari module yang sudah ada
            </p>
            <div className="">
              <Button
                variant="outline-primary"
                size="sm"
                className="rounded-3 me-2"
                onClick={() => {
                  setShowNew(true);
                  setShowModule(false);
                }}
              >
                New Add
              </Button>
              <Button
                variant="outline-primary"
                size="sm"
                className="rounded-3"
                onClick={() => {
                  setShowExisting(true);
                  setShowModule(false);
                }}
              >
                Add From Existing
              </Button>
            </div>
          </Row>
        </AddNewModal>
      )}

      {showNew && (
        <AddNewModal
          size="lg"
          setShow={setShowNew}
          show={showNew}
          buttonClassName="py-2 px-3 rounded-3"
          text1="Cancel"
          text2="Add"
          disabled={loading || !moduleTitle || !uploadType}
          variant1="outline-primary"
          variant2="primary"
          title="Create New Module"
          onClick={(e) => submitModule(e, updatedId)}
          onHide={() => {
            handleClose();
            setShowNew(false);
          }}
        >
          <Row>
            <Col md={12} xs={12} className="mb-3">
              <Form.Label>Module Title</Form.Label>
              <Form.Control
                type="text"
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
                  checked={uploadType === "link"}
                  onChange={() => null}
                />
              </Form.Label>
              <Form.Control
                type="text"
                disabled={uploadType === "file" || uploadType === ""}
                placeholder="Sertakan link/url disini"
                onChange={(e) => setLinkUrl(e.target.value)}
                value={linkUrl}
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
              <div className="position-relative">
                <Form.Control
                  type="file"
                  accept=".ppt, .pptx"
                  disabled={
                    uploadType === "link" ||
                    uploadType === "" ||
                    file.banner !== null
                  }
                  onChange={onChangeFile}
                  ref={ref}
                />
                {/* {file.banner  && ( */}
                <div>
                  <CloseButton
                    onClick={deleteFile}
                    className="btn-close form-contol position-absolute"
                    style={{ top: "15px", right: "10px" }}
                  />
                </div>
                {/* )} */}
              </div>
              <div className="d-flex justify-content-between">
                <Form.Text>Upload format PPT (maks file 50 MB)</Form.Text>{" "}
                {loading && <LoadingComponent className="mt-3" />}
              </div>
            </Col>
          </Row>
        </AddNewModal>
      )}

      {showExisting && (
        <AddNewModal
          size="lg"
          setShow={setShowExisting}
          show={showExisting}
          title="Add Module Existing"
          onClick={(e) => submitExistingModule(e, updatedId)}
          text1="Cancel"
          text2="Add"
          variant1="outline-primary"
          variant2="primary"
          buttonClassName="py-2 px-3 rounded-3"
        >
          <Row>
            <Col md={12} xs={12} className="mb-3 pb-4">
              <Form.Label>
                Module Tittle <span className="text-danger"> *</span>{" "}
              </Form.Label>
              <Select
                name="colors"
                placeholder="Sarch Module"
                options={moduleExisting}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleSelectedModule}
                onInputChange={handleInputChange}
              />
            </Col>
            <Col md={12} xs={12} className="">
              <div className="border-bottom">
                <p className="fw-bold h5">Module List</p>
              </div>
              <div className="pt-4">
                <Icon
                  path={mdiFitToScreen}
                  size={0.8}
                  className="text-white bg-success me-1 p-1 rounded-2"
                />
                {selectedModuleName}
              </div>
            </Col>
          </Row>
        </AddNewModal>
      )}

      {showUpdateSilabus && (
        <AddNewModal
          size="lg"
          setShow={setShowUpdateSilabus}
          show={showUpdateSilabus}
          buttonClassName="py-2 px-3 rounded-3"
          text1="Cancel"
          text2="Save"
          variant1="outline-primary"
          variant2="primary"
          title="Edit Syllabus"
          disabled={!title || !flow || (startDate && !endDate) ? true : false}
          onHide={() => {
            setFlow("");
            setTitle("");
            setStartDate("");
            setEndDate("");
            setShowUpdateSilabus(false);
          }}
          onClick={(e) => updateSilabus(e, updatedId)}
        >
          <Row>
            <Col md={12} xs={12} className="mb-3">
              <Form.Label>
                Syllabus Title <span className="text-danger"> *</span>{" "}
              </Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Form.Text>
                Pastikan tidak melebihi dari 60 karakter dan tuliskan judul yang
                menggambarkan topik yang akan dibahas
              </Form.Text>
            </Col>
            <Col md={12} xs={12} className="mb-4">
              <Form.Label className="d-block">Syllabus Flow</Form.Label>
              <Form.Check
                type="radio"
                id="serial"
                label="Serial (Pengerjaan sesuai urutan)"
                className="form-check-inline"
                onClick={handleFlowChange}
                checked={flow === "serial"}
                onChange={() => null}
              />
              <Form.Check
                type="radio"
                id="partial"
                label="Partial (Pengerjaan bebas/tidak sesuai urutan)"
                className="form-check-inline"
                onClick={handleFlowChange}
                checked={flow === "partial"}
                onChange={() => null}
              />
            </Col>
            <Col md={6} xs={12} className="mb-3">
              <Form.Label>
                Start Date <span className="text-muted">(optional)</span>{" "}
              </Form.Label>
              <Form.Control
                type="text"
                as={FlatPickrTime}
                setDate={setStartDate}
                minDate={new Date(new Date().setDate(new Date().getDate() - 1))}
                // placeholderText={dateStart}
                defaultValue={formatDateTime(dateStart)}
              />
            </Col>
            <Col md={6} xs={12} className="mb-3">
              <Form.Label>
                End Date <span className="text-muted">(optional)</span>{" "}
              </Form.Label>
              <Form.Control
                type="text"
                as={FlatPickrTime}
                setDate={setEndDate}
                minDate={startDate ? new Date(startDate) : null}
                // placeholderText={dateEnd}
                defaultValue={formatDateTime(dateEnd)}
              />
            </Col>
          </Row>
        </AddNewModal>
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
      {success && (
        <NotifSuccessModal
          show={success}
          setShow={setSuccess}
          text={successMessage}
        ></NotifSuccessModal>
      )}
    </Fragment>
  );
};
export default GKAccordionActions;
