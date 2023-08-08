import React, { Fragment, useEffect, useState } from "react";
import { Card, Col, ListGroup, Row, Image, Breadcrumb } from "react-bootstrap";
import GKStepper from "../../../../components/components/dashboard/ticketing/elements/stepper/GKStepper2";
import illustration from "../../../../assets/images/svg/faqCMS.svg";
import Icon from "@mdi/react";
import { mdiCheckCircle } from "@mdi/js";
import EdigitalLayout from "../../../home/EDigitalLayout";
import { CreateCategory } from "./create/CreateCategory";
import { CreateProgram } from "./create/CreateProgram";
import { CreateMatrix } from "./create/CreateMatrix";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NotifSuccessModal from "../../../../components/components/elements/modal/NotifSuccessModal";
import ErrorAlert from "../../../../components/components/dashboard/ticketing/elements/alerts/ErrorAlert";
import ProcessLoadingModal from "../../../../components/components/elements/modal/ProcessLoadingModal";
import { PreviewMatrix } from "./create/PreviewMatrix";

export const ManageCategory = () => {
  useEffect(() => {
    document.body?.classList.add("bg-white");
  });

  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [uid, setUid] = useState(localStorage.getItem("uid"));

  const [warning, setWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [preview, setPreview] = useState(false);
  const [previewData, setPreviewData] = useState([]);

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState();
  const [category, setCategory] = useState({
    category_type: "",
    category_name: "",
    category_id: 0,
    category_description: "",
  });
  const [program, setProgram] = useState({
    title: "",
    desc: "",
    banner: null,
    fileName: "",
    folderName: "",
    fileExtension: "",
    methods: "",
    endDate: "",
    startDate: "",
  });

  const [matrix, setMatrix] = useState(() => {
    const savedMatrix = localStorage.getItem("matrix");
    return savedMatrix ? JSON.parse(savedMatrix) : [];
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const next = () => {
    setCurrentStep(currentStep === 3 ? 1 : currentStep + 1);
  };
  const previous = () => {
    setCurrentStep(currentStep === 1 ? 1 : currentStep - 1);
  };

  const navigate = useNavigate();
  const submitData = async () => {
    try {
      setModalLoading(true);
      setDisableButton(true);
      let dataInput =
        category?.category_type === "new"
          ? {
              uid: uid,
              name: program?.title,
              description: program?.desc,
              type: program?.methods,
              start_date: program?.startDate,
              end_date: program?.endDate,
              category_name: category?.category_name,
              category_type: category?.category_type,
              array_matrix_competency: matrix,
              files: [
                {
                  folder_name: program?.folderName,
                  file_name: program?.fileName,
                  file_extension: program?.fileExtension,
                  collection_name: "banner_program",
                },
              ],
            }
          : {
              uid: uid,
              name: program?.title,
              description: program?.desc,
              type: program?.methods,
              start_date: program?.startDate,
              end_date: program?.endDate,
              category_id: parseInt(category?.category_id),
              category_type: category?.category_type,
              array_matrix_competency: matrix,
              files: [
                {
                  folder_name: program?.folderName,
                  file_name: program?.fileName,
                  file_extension: program?.fileExtension,
                  collection_name: "banner_program",
                },
              ],
            };
      await axios
        .post("/euniv/submit-program", dataInput, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res?.status === 200) {
            navigate("/main-desk/manage-program/");
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
            setModalLoading(false);
            setDisableButton(false);
          }
        });
    } catch (e) {
      return e;
    }
  };

  const steps = [
    {
      id: 1,
      title: "Program",
      content: (
        <CreateProgram
          data={formData}
          handleChange={handleChange}
          next={next}
          program={program}
          token={token}
          setProgram={setProgram}
        />
      ),
    },
    {
      id: 2,
      title: "Category",
      content: (
        <CreateCategory
          data={formData}
          handleChange={handleChange}
          next={next}
          category={category}
          setCategory={setCategory}
          previous={previous}
        />
      ),
    },
    {
      id: 3,
      title: "Matrix",
      content: (
        <CreateMatrix
          data={formData}
          token={token}
          handleChange={handleChange}
          next={next}
          previous={previous}
          matrix={matrix}
          setMatrix={setMatrix}
          submitData={submitData}
          addProgram
          disableButton={disableButton}
          isAuthor={true}
          setPreview={setPreview}
          preview={preview}
          setPreviewData={setPreviewData}
          previewData={previewData}
        />
      ),
    },
  ];

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
    setUid(localStorage.getItem("uid"));
  }, [localStorage]);

  return (
    <EdigitalLayout>
      <Fragment>
        <Row>
          <Col lg={12} md={12} sm={12}>
            <div className="d-flex align-items-center border-bottom mb-4 justify-content-between">
              <div className="mb-3 mb-md-0">
                <h1 className="mb-1 h2 fw-bold">Create Program</h1>
                <Breadcrumb>
                  <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                  <Breadcrumb.Item href="/main-desk">Main Desk</Breadcrumb.Item>
                  <Breadcrumb.Item href="/main-desk/manage-program">
                    Manage Program
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active href="#">
                    Create Program
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={12} xs={12}>
            <Row>
              <Col md={8} xs={12}>
                <div id="stepperForm" className="bs-stepper">
                  <Row>
                    <Card className="mb-4">
                      <Card.Body>
                        <div>
                          {/* Stepper Button and content */}
                          <GKStepper currentStep={currentStep} steps={steps} />
                        </div>
                      </Card.Body>
                    </Card>
                    {preview && <PreviewMatrix empData={previewData} />}
                  </Row>
                </div>
              </Col>
              <Col md={4} xs={12}>
                {/* card */}
                <Card className="bg-white shadow-none">
                  {/* card  body */}
                  <Card.Body className="p-5">
                    <div className="mb-4">
                      <Image
                        src={illustration}
                        width={80}
                        height={100}
                        alt=""
                      />
                    </div>
                    <h3 className="mb-3">FAQ </h3>
                    <ListGroup
                      bsPrefix="list-unstyled"
                      as="ul"
                      className="text-dark mb-0"
                    >
                      <ListGroup.Item
                        as="li"
                        bsPrefix=" "
                        className="d-flex align-items-start mb-3"
                      >
                        <Icon
                          path={mdiCheckCircle}
                          className="text-success me-2"
                          size={0.7}
                        />{" "}
                        Pada bagian ini akan diisi dengan FAQ berdasarkan
                        feedback yang ada{" "}
                      </ListGroup.Item>

                      {/* <ListGroup.Item
                        as="li"
                        bsPrefix=" "
                        className="d-flex align-items-start mb-3"
                      >
                        <Icon
                          path={mdiCheckCircle}
                          className="text-success me-2"
                          size={0.7}
                        />{" "}
                        Find a Job & grow your career
                      </ListGroup.Item> */}
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
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
    </EdigitalLayout>
  );
};
