import React, { Fragment, useEffect, useRef, useState } from "react";
import EdigitalLayout from "../../../../home/EDigitalLayout";
import {
  Breadcrumb,
  Button,
  Card,
  CloseButton,
  Col,
  Form,
  Image,
  Nav,
  Row,
  Tab,
} from "react-bootstrap";
import Learning from "../../../../../assets/images/svg/CARD_NO_IMAGE.svg";
import Icon from "@mdi/react";
import {
  mdiBookEducationOutline,
  mdiBookMultipleOutline,
  mdiClose as CloseIcon,
} from "@mdi/js";
import { ListSyllabus } from "../list/ListSyllabus";
import { AddNewModal } from "../../category/modal/AddNewModal";
import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ReportProgram } from "../list/ReportProgram";
import { FlatPickrTime } from "../../../../../components/components/elements/flat-pickr/FlatPickrTime";
import Select from "react-select";
import ProcessLoadingModal from "../../../../../components/components/elements/modal/ProcessLoadingModal";
import NotifSuccessModal from "../../../../../components/components/elements/modal/NotifSuccessModal";
import ErrorAlert from "../../../../../components/components/dashboard/ticketing/elements/alerts/ErrorAlert";
import { EditMatrix } from "../../category/edit/EditMatrix";
import { formatDateTime } from "../../../../../config/helper/utils";

export const DetailProgram = () => {
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [uid, setUid] = useState(localStorage.getItem("uid"));

  const [program, setProgram] = useState([]);
  const [matrix, setMatrix] = useState([]);
  const [exMatrix, setExMatrix] = useState([]);
  const { program_id } = useParams();
  const idProgram = parseInt(program_id, 10);
  const [silabus, setSilabus] = useState([]);
  const [loadingSyllabus, setLoadingSyllabus] = useState(false);

  const [showEdit, setShowEdit] = useState(false);
  const [title, setTitle] = useState(
    program?.general_information?.[0]?.name
      ? program?.general_information?.[0]?.name
      : ""
  );
  const [file, setFile] = useState({
    banner: null,
    fileName: "",
    folderName: "",
    fileExtension: "",
    collection_name: "",
    prev: "",
  });
  const [desc, setDesc] = useState(
    program?.general_information?.[0]?.description
      ? program?.general_information?.[0]?.description
      : null
  );
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");

  const createdBy = program?.general_information?.[0]?.create_by_uid;
  const isAuthor = createdBy === uid ? true : false;

  const [warningFile, setWarningFile] = useState(false);
  const photo = program?.files?.map((item) => item.url);

  const [arrAuthor, setArrAuthor] = useState([]);
  const [arrCategory, serArrCategory] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryIsOpen, setCategoryIsOpen] = useState(false);
  const [authorIsOpen, setAuthorIsOpen] = useState(false);

  const [disableButton, setDisableButton] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [warning, setWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  const [deletedMatrixIds, setDeletedMatrixIds] = useState([]);

  const ref = useRef();
  const programName = program?.general_information?.[0]?.name;

  function handleChange(value) {
    setDesc(value);
  }

  const handleChangeAuthor = (selectedOption) => {
    setAuthor(selectedOption?.uid);
  };
  const handleChangeCategory = (selectedOption) => {
    setCategory(selectedOption?.value);
  };

  const onChangeFile = (e) => {
    const fileData = e.target.files[0];
    if (fileData) {
      if (fileData.size >= 5000000) {
        setWarningFile(true);
      } else {
        setFile({
          ...file,
          banner: fileData,
        });
      }
    }
  };

  const fetchCategory = async () => {
    try {
      await axios
        .get("/euniv/get-category", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const newData = res?.data?.data;
          const newObjArr = newData?.map((data) => {
            const obj = {
              value: data?.id,
              label: data?.name,
            };
            return obj;
          });
          serArrCategory(newObjArr);
        });
    } catch (e) {
      return e;
    }
  };

  const fetchProgram = async () => {
    try {
      setModalLoading(true);
      await axios
        .post(
          "/euniv/get-program-detail",
          {
            program_id: idProgram,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          if (res?.status === 200) {
            setModalLoading(false);
            setProgram(res?.data?.data);
            const dataFile = res?.data?.data?.files;
            setFile({
              prev: dataFile !== 0 ? dataFile?.[0]?.folder_name : "",
            });
            setTitle(res?.data?.data?.general_information?.[0]?.name);
            setDesc(res?.data?.data?.general_information?.[0]?.description);
            setExMatrix(res?.data?.data?.matrix_competency);
          } else {
            setModalLoading(false);
          }
        });
    } catch (e) {
      return e;
    }
  };

  const fetchAuthor = async () => {
    try {
      await axios
        .get(`/master/search-employee?search=${search}&type_search=euniv`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const newData = res?.data?.data;
          const objData = newData?.map((data) => {
            return {
              value: data?.nik,
              label: data?.name,
              uid: data?.uid,
            };
          });

          setArrAuthor(objData);
        });
    } catch (e) {
      return e;
    }
  };

  const updateProgram = async () => {
    try {
      setModalLoading(true);
      setDisableButton(true);
      const authorToUpdate =
        author || program?.general_information?.[0]?.create_by_uid;
      const categoryToUpdate =
        category || program?.general_information?.[0]?.category_id;
      const start = startDate || program?.general_information?.[0]?.start_date;
      const end = endDate || program?.general_information?.[0]?.endDate;
      const type = program?.general_information?.[0]?.type_program;
      let dataInput = file?.banner
        ? {
            id: idProgram,
            uid: uid,
            uid_to_update: authorToUpdate,
            name: title,
            description: desc,
            type: type,
            start_date: start,
            end_date: end,
            category_id: parseInt(categoryToUpdate),
            deleted_id: deletedMatrixIds,
            array_matrix_competency: matrix,
            files: [
              {
                folder_name: file.folderName,
                file_name: file.fileName,
                file_extension: file.fileExtension,
                collection_name: "program_files",
              },
            ],
          }
        : {
            id: idProgram,
            uid: uid,
            uid_to_update: authorToUpdate,
            name: title,
            description: desc,
            type: type,
            start_date: start,
            end_date: end,
            category_id: parseInt(categoryToUpdate),
            deleted_id: deletedMatrixIds,
            array_matrix_competency: matrix,
          };
      const res = await axios.post("/euniv/update-program", dataInput, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res?.status === 200) {
        await fetchProgram();
        setShowEdit(false);
        setModalLoading(false);
        setDisableButton(false);
      } else if (res?.status === 400) {
        setModalLoading(false);
        setDisableButton(false);
        setWarning(true);
        setWarningMessage("input all field");
      } else if (res?.status === 429) {
        setModalLoading(false);
        setDisableButton(false);
        setWarning(true);
        setWarningMessage("Too many request, please try again later");
      } else if (res?.status === 500) {
        setModalLoading(false);
        setDisableButton(false);
        setWarning(true);
        setWarningMessage(res?.data?.message);
      } else {
        setModalLoading(false);
        setDisableButton(false);
      }
    } catch (e) {
      return e;
    }
  };

  const fetchSilabus = async () => {
    try {
      setLoadingSyllabus(true);
      await axios
        .post(
          "/euniv/get-syllabus-trainer",
          {
            program_id: idProgram,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          if (res?.status === 200) {
            setLoadingSyllabus(false);
            setSilabus(res?.data?.data);
          } else if (res?.status === 500) {
            setWarning(true);
            setWarningMessage(res?.data?.message);
            setLoadingSyllabus(false);
          } else {
            setLoadingSyllabus(false);
          }
        });
    } catch (e) {
      return e;
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
    // let folder = program?.files?.map((data) => data?.folder_name);
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
            await fetchProgram();
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

  const handleInputChange = (inputValue) => {
    if (inputValue?.length <= 14) {
      if (inputValue?.length % 3 === 0) {
        setSearch(inputValue);
      }
    } else if (inputValue?.length >= 14) {
      setSearch(inputValue);
    }
  };

  useEffect(() => {
    fetchSilabus();
  }, []);

  useEffect(() => {
    fetchProgram();
  }, []);

  useEffect(() => {
    categoryIsOpen === true && fetchCategory();
  }, [categoryIsOpen]);

  useEffect(() => {
    authorIsOpen === true && fetchAuthor();
  }, [authorIsOpen, search]);

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
    setUid(localStorage.getItem("uid"));
  }, []);

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
  return (
    <EdigitalLayout>
      <Fragment>
        <Row>
          <Col lg={12} md={12} sm={12}>
            <div className="d-md-flex align-items-center justify-content-between">
              <div className="mb-3 mb-md-0">
                <Breadcrumb>
                  <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                  <Breadcrumb.Item href="/main-desk">Main Desk</Breadcrumb.Item>
                  <Breadcrumb.Item href="/main-desk/manage-program">
                    Manage Program
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active>{programName}</Breadcrumb.Item>
                </Breadcrumb>
              </div>
            </div>
          </Col>
          <Col lg={12} md={12} sm={12}>
            {program?.general_information?.map((program, index) => {
              return (
                <div
                  className="card-bordered p-3 bg-white rounded-3 mb-4 card-hover cursor-pointer"
                  key={index}
                >
                  <div className="d-flex flex-lg-row flex-column w-100">
                    <div className="mb-lg-0 d-flex justify-content-center w-100 w-lg-30">
                      <Image
                        src={photo.length > 0 ? photo : Learning}
                        className="rounded-3"
                        width={300}
                        height={150}
                        style={{ maxWidth: "100%" }}
                      />
                    </div>
                    <div className="ms-lg-3 mt-xl-1 w-100 w-lg-70">
                      <div className="mb-2 mt-3 mt-lg-0">
                        <div className="d-flex flex-lg-row flex-column justify-content-between">
                          <p className="mb-1 text-black fw-semi-bold display-5">
                            {program?.name ? program?.name : ""}
                          </p>
                          <div>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              className="rounded-3"
                              onClick={() => setShowEdit(true)}
                            >
                              Edit Details
                            </Button>
                          </div>
                        </div>
                      </div>
                      <Row>
                        <Col lg={6} md={12} sm={12}>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: program?.description,
                            }}
                            className="d-flex flex-row justify-content-md-start align-items-md-start justify-content-center align-items-center"
                          ></div>
                          <div className="mb-md-0 d-flex flex-row justify-content-md-start align-items-md-start justify-content-center align-items-center">
                            <div>
                              <span className="me-2">
                                <Icon
                                  path={mdiBookEducationOutline}
                                  size={0.7}
                                  className="text-muted"
                                />
                                <span className="mx-1">
                                  {program?.count_syllabus}
                                </span>
                                <span className="">Syllabus</span>
                              </span>
                              <span>• </span>
                              <span className="me-2">
                                <Icon
                                  path={mdiBookMultipleOutline}
                                  size={0.7}
                                  className="text-muted"
                                />
                                <span className="mx-1">
                                  {program?.type_program}
                                </span>
                              </span>
                            </div>
                          </div>
                          <div className="d-flex flex-row justify-content-md-start align-items-md-start justify-content-center align-items-center">
                            <span className="text-kinda-dark mb-0">
                              Category :{" "}
                            </span>
                            <span className="ms-1">
                              {program?.category_name}
                            </span>
                          </div>
                        </Col>
                        <Col lg={6} md={12} sm={12}>
                          <div className="d-flex justify-content-md-end justify-content-center mt-3 mt-md-0">
                            <p className="text-kinda-dark me-1 mb-1">
                              Author :{" "}
                            </p>
                            <span>{program?.create_by_name}</span>
                          </div>
                          <div className="d-flex justify-content-md-end justify-content-center mt-0 mt-md-3">
                            <span className="text-kinda-dark">
                              Last Modified :
                            </span>
                            <span className="ms-1">{program?.updated_at}</span>
                            {program?.LatestUpdateBy && (
                              <span className="ms-1">
                                , {program?.LatestUpdateBy}
                              </span>
                            )}
                          </div>

                          <div className="d-flex justify-content-md-end justify-content-center">
                            <p className="text-kinda-dark me-1 mb-1">
                              Period :
                            </p>
                            <span>
                              {program?.start_date} - {program?.end_date}
                            </span>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
              );
            })}
          </Col>
        </Row>
        <Row>
          <Col lg={12} md={12} sm={12}>
            <Tab.Container defaultActiveKey="all">
              <Card>
                <Card.Header className="border-bottom-0 p-0 bg-white">
                  <Nav className="nav-lb-tab">
                    <Nav.Item>
                      <Nav.Link eventKey="all" className="mb-sm-3 mb-md-0">
                        List Syllabus
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="approved" className="mb-sm-3 mb-md-0">
                        Report Program
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Card.Header>
              </Card>
              {/* <Card.Body className=""> */}
              <Tab.Content>
                <Tab.Pane eventKey="all" className="pb-4">
                  <ListSyllabus
                    program_id={program_id}
                    fetchSilabus={fetchSilabus}
                    silabus={silabus}
                    loadingSyllabus={loadingSyllabus}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="approved" className="pb-4">
                  <ReportProgram
                    program_id={program_id}
                    fetchSilabus={fetchSilabus}
                    silabus={silabus}
                  />
                </Tab.Pane>
              </Tab.Content>
              {/* </Card.Body> */}
            </Tab.Container>
          </Col>
        </Row>

        {modalLoading && (
          <ProcessLoadingModal show={modalLoading} setShow={setModalLoading} />
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
        {showEdit && (
          <AddNewModal
            size="lg"
            setShow={setShowEdit}
            show={showEdit}
            buttonClassName="py-2 px-3 rounded-3"
            text1="Cancel"
            text2="Save"
            variant1="outline-primary"
            variant2="primary"
            title="Edit Program"
            className="p-0"
            classBody="p-0"
            disabled={
              desc?.length > 150 || disableButton || (startDate && !endDate)
                ? true
                : false
            }
            onClick={() => updateProgram()}
          >
            {program?.general_information?.map((program, index) => {
              return (
                <div key={index}>
                  <Tab.Container defaultActiveKey="all">
                    <Nav className="nav-lb-tab">
                      <Nav.Item>
                        <Nav.Link eventKey="all" className="mb-sm-3 mb-md-0">
                          Detail Program{" "}
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link
                          eventKey="approved"
                          className="mb-sm-3 mb-md-0"
                        >
                          Detail Matrix
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>

                    <Tab.Content>
                      <Tab.Pane eventKey="all" className="pb-4 px-0">
                        <Row className="px-4 pb-3">
                          <Col md={12} xs={12} className="mb-3 pt-4">
                            <Form.Label>Program Tittle </Form.Label>
                            <Form.Control
                              onChange={(e) => setTitle(e.target.value)}
                              type="text"
                              defaultValue={program?.name}
                              maxLength={60}
                            />
                            <Form.Text>
                              Pastikan tidak melebihi dari 60 karakter dan
                              tuliskan judul yang menggambarkan topik yang akan
                              dibahas
                            </Form.Text>
                          </Col>
                          <Col md={12} xs={12} className="mb-3">
                            <Form.Label>
                              Upload Banner{" "}
                              <span className="text-danger"> *</span>{" "}
                            </Form.Label>
                            {file?.prev !== "" &&
                            file?.prev !== null &&
                            file?.prev !== undefined ? (
                              <div className="position-relative">
                                <input
                                  type="file"
                                  id="file"
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
                                  className="position-absolute icon-file-upload h-100"
                                  onClick={handleDeleteRecentFile}
                                />
                              </div>
                            ) : (
                              <div className="position-relative">
                                <Form.Control
                                  type="file"
                                  onChange={onChangeFile}
                                  accept=".png,.jpg,.jpeg"
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
                            <Form.Text>Pastikan tidak melebihi 1 MB</Form.Text>
                          </Col>
                          <Col md={12} xs={12} className="mb-3">
                            <Form.Label>Description </Form.Label>
                            <ReactQuill
                              value={desc ? desc : program?.description}
                              onChange={handleChange}
                            />
                            <Form.Text>
                              Pastikan tidak melebihi 40 karakter
                            </Form.Text>
                          </Col>
                          <Col md={6} xs={12} className="mb-3">
                            <Form.Label>
                              Start Date{" "}
                              <span className="text-muted">(optional)</span>{" "}
                            </Form.Label>
                            <Form.Control
                              type="text"
                              as={FlatPickrTime}
                              setDate={setStartDate}
                              minDate={
                                new Date(
                                  new Date().setDate(new Date().getDate() - 1)
                                )
                              }
                              disabled={true}
                              placeholderText={program?.start_date}
                              defaultValue={formatDateTime(program?.start_date)}
                            />
                          </Col>
                          <Col md={6} xs={12} className="mb-3">
                            <Form.Label>
                              End Date{" "}
                              <span className="text-muted">(optional)</span>{" "}
                            </Form.Label>
                            <Form.Control
                              type="text"
                              as={FlatPickrTime}
                              setDate={setEndDate}
                              placeholderText={program?.end_date}
                              defaultValue={formatDateTime(program?.end_date)}
                              minDate={
                                startDate
                                  ? new Date(startDate)
                                  : new Date(
                                      new Date().setDate(
                                        new Date().getDate() - 1
                                      )
                                    )
                              }
                              disabled
                            />
                          </Col>
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="approved" className="pb-4 px-4">
                        <Row className="pt-4">
                          <EditMatrix
                            isAuthor={isAuthor}
                            matrix={matrix}
                            setMatrix={setMatrix}
                            token={token}
                            exMatrix={exMatrix}
                            setDeletedMatrixIds={setDeletedMatrixIds}
                            deletedMatrixIds={deletedMatrixIds}
                          />
                          <Col md={12} xs={12} className="mb-3">
                            <Form.Label>Category</Form.Label>
                            {/* <Form.Control
                              type="text"
                              value={program?.category_name}
                              readOnly
                            /> */}
                            <Select
                              onChange={handleChangeCategory}
                              // onInputChange={handleInputChange}
                              options={arrCategory}
                              defaultInputValue={program?.category_name}
                              isSearchable
                              isClearable={true}
                              className="form-control-md"
                              onMenuOpen={() => setCategoryIsOpen(true)}
                              onMenuClose={() => setCategoryIsOpen(false)}
                            />
                          </Col>
                          <Col md={12} xs={12} className="mb-3">
                            <Form.Label>Author</Form.Label>

                            <Select
                              onChange={handleChangeAuthor}
                              onInputChange={handleInputChange}
                              options={arrAuthor}
                              isSearchable
                              isClearable={true}
                              className="form-control-md"
                              defaultInputValue={program?.create_by_name}
                              onMenuOpen={() => setAuthorIsOpen(true)}
                              onMenuClose={() => setAuthorIsOpen(false)}
                            />
                            <Form.Text>
                              Pastikan author yang dipilih sudah tepat, karena
                              jika diubah maka author sebelumnya tidak dapat
                              melakukan edit
                            </Form.Text>
                          </Col>
                        </Row>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              );
            })}
          </AddNewModal>
        )}
      </Fragment>
    </EdigitalLayout>
  );
};
