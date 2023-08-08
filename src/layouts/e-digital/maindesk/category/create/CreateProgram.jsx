import React, { useEffect, useRef, useState } from "react";
import { Col, Form, Row, Button, CloseButton } from "react-bootstrap";
import FormSelect from "../../../../../components/components/elements/form-select/FormSelect";
import ReactQuill from "react-quill";
import ErrorAlert from "../../../../../components/components/dashboard/ticketing/elements/alerts/ErrorAlert";
import { FlatPickrTime } from "../../../../../components/components/elements/flat-pickr/FlatPickrTime";
import axios from "axios";
import LoadingComponent from "../../../../../components/components/elements/loading/LoadingComponent";

export const CreateProgram = (props) => {
  const { next, program, setProgram, token } = props;

  // const [endDate, setEndDate] = useState("");

  const [banner, setBanner] = useState(null);
  const [message, setMessage] = useState("");
  const [warningMessage, setWarningMessage] = useState(false);
  const [warningFile, setWarningFile] = useState(false);
  const [disableFile, setDisableFile] = useState(false);
  const [bannerPreview, setBannerPreview] = useState(null);

  const [loadingFile, setLoadingFile] = useState(false);

  const methodOptions = [
    { value: "development", label: "Development" },
    { value: "learning", label: "Learning" },
  ];

  function handleChange(value) {
    setProgram({ ...program, desc: value });
  }

  const ref = useRef();
  const deleteFile = () => {
    ref.current.value = "";
    setBanner(null);
    setDisableFile(false);
    deleteFolder(program.folderName);
  };

  const deleteFolder = async (folderName) => {
    try {
      await axios
        .delete(`/upload/remove-temp-folder/${folderName}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(async (res) => {
          if (res?.status === 200) {
            setProgram({ ...program, fileName: "", folderName: "" });
          } else {
            return res;
          }
        });
    } catch (e) {
      return e;
    }
  };

  const onChangeFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size >= 1000000) {
        setWarningFile(true);
        setDisableFile(true);
      } else {
        setBanner(file);
        const reader = new FileReader();
        reader.onload = () => {
          const previewUrl = reader.result;
          setBannerPreview(previewUrl);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("file", banner);
    try {
      setLoadingFile(true);
      await axios
        .post("/upload/single-file", formData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res?.status === 200) {
            const newFile = res?.data?.data?.file_name;
            const newFolder = res?.data?.data?.folder_name;
            const newExt = res?.data?.data?.file_ext;
            setProgram({
              ...program,
              fileName: newFile,
              folderName: newFolder,
              fileExtension: newExt,
            });
            setLoadingFile(false);
          } else if (res?.status === 400) {
            setWarningMessage(true);
            setMessage(res?.data?.message);
            setLoadingFile(false);
          } else {
            setLoadingFile(false);
          }
        });
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    banner !== null && uploadFile();
  }, [banner]);

  return (
    <>
      <Form>
        <div className="mb-4">
          <h4 className="mb-0 fw-bold">Create Program</h4>
          <span className="fs-6">Tambahkan Program disini</span>
        </div>
        {/* row */}
        <Row>
          <Col md={12} xs={12} className="mb-4">
            <Form.Group>
              <Form.Label>Program Title</Form.Label>
              <Form.Control
                type="text"
                value={program?.title}
                onChange={(e) =>
                  setProgram({ ...program, title: e.target.value })
                }
                maxLength={60}
              />
              <Form.Text className="text-muted">
                Pastikan tidak melebihi dari 40 karakter dan tuliskan judul yang
                menggambarkan topik yang akan dibahas
              </Form.Text>
            </Form.Group>
          </Col>
          {warningFile && (
            <ErrorAlert
              setState={setWarningFile}
              text1="Foto yang diunggah lebih dari 1 MB,"
              span="Mohon unggah ulang dibawah 1 MB"
            />
          )}
          {warningMessage && (
            <ErrorAlert setState={setWarningMessage} text1={message} />
          )}
          <Col md={12} xs={12} className="mb-4">
            <Form.Group>
              <Form.Label>Upload Banner</Form.Label>
              <div className="position-relative">
                <Form.Control
                  type="file"
                  onChange={onChangeFile}
                  accept=".png, .jpg, .jpeg"
                  ref={ref}
                  disabled={banner !== null || disableFile}
                />
                {loadingFile === false ? (
                  <div>
                    <CloseButton
                      onClick={deleteFile}
                      className="btn-close form-contol position-absolute"
                      style={{ top: "15px", right: "10px" }}
                    />
                  </div>
                ) : null}
              </div>
              <div className="d-flex justify-content-between">
                <Form.Text className="text-muted">
                  Pastikan upload dibawah 1 MB
                </Form.Text>
                {loadingFile && <LoadingComponent className="mt-3" />}
              </div>
            </Form.Group>
          </Col>
          <Col md={12} xs={12} className="mb-4">
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <ReactQuill value={program.desc} onChange={handleChange} />
              <Form.Text className="text-muted">
                Pastikan tidak melebihi dari 40 karakter dan tuliskan judul yang
                menggambarkan topik yang akan dibahas
              </Form.Text>
            </Form.Group>
          </Col>
          <Col md={12} xs={12} className="mb-4">
            <Form.Group>
              <Form.Label>Methods</Form.Label>
              <Form.Control
                as={FormSelect}
                className="form-select-md"
                options={methodOptions}
                placeholder={
                  program.methods ? program.methods : "Select Method"
                }
                defaultValue={program.methods}
                onChange={(e) =>
                  setProgram({ ...program, methods: e.target.value })
                }
              />
              <Form.Text className="text-muted">
                Pilih berdasarkan Learning atau Development
              </Form.Text>
            </Form.Group>
          </Col>
          <Col md={6} xs={12} className="mb-4">
            <Form.Group>
              <Form.Label>
                Start Date <span className="text-secondary">(Optional)</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholderText={program.startDate}
                value={program.startDate}
                as={FlatPickrTime}
                setDate={(date) => setProgram({ ...program, startDate: date })}
                minDate={new Date(new Date().setDate(new Date().getDate() - 1))}
                className="border"
              />
            </Form.Group>
          </Col>
          <Col md={6} xs={12} className="mb-4">
            <Form.Group>
              <Form.Label>
                End Date <span className="text-secondary">(Optional)</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholderText={program.endDate}
                value={program.endDate}
                as={FlatPickrTime}
                setDate={(date) => setProgram({ ...program, endDate: date })}
                minDate={program.startDate ? new Date(program.startDate) : null}
                className="border"
              />
            </Form.Group>
          </Col>
          <Col xs={12} className="d-flex justify-content-end">
            {/* Button */}
            <Button
              variant="primary"
              className="rounded-3"
              disabled={
                program.title === "" ||
                program.desc === "" ||
                program.fileName === "" ||
                program.methods === "" ||
                (program.startDate && !program.endDate)
                  ? true
                  : false
              }
              onClick={next}
            >
              Next
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};
