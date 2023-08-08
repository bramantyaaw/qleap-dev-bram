import Icon from "@mdi/react";
import { mdiClose as CloseIcon } from "@mdi/js";
import { Fragment } from "react";
import { useState } from "react";
import { Button, Form, Image, Modal } from "react-bootstrap";
import Iconmg from "../../../../assets/ezone/images/svg/img-popup-icon.svg";
import FillInput from "../../../components/dashboard/ticketing/elements/input/FillInput";
import ErrorAlert from "../../../components/dashboard/ticketing/elements/alerts/ErrorAlert";
import axios from "axios";
import { useEffect } from "react";
import LoadingComponent from "../../../components/elements/loading/LoadingComponent";
import ProcessLoadingModal from "../../../components/elements/modal/ProcessLoadingModal";

const CreatePostModal = ({
  show,
  setShow,
  photoProfile,
  dataArr,
  imgIcon,
  videoIcon,
  token,
  uid,
  setIsClickImg,
  setIsClickVideo,
  isClickImg,
  isClickVideo,
}) => {
  const [warningFile, setWarningFile] = useState(false);

  const [file, setFile] = useState(null);
  const [fileExt, setFileExt] = useState("");
  const [fileUploaded, setFileUploaded] = useState("");
  const [folderUploaded, setFolderUploaded] = useState("");
  const [preview, setPreview] = useState("");

  const [textTweet, setTextTweet] = useState("");
  const [uploadLinkVideo, setUploadLinkVideo] = useState("");
  const [isYoutubeCorrect, setIsYoutubeCorrect] = useState(false);

  const [modalLoading, setModalLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onChangePicture = (e) => {
    if (e.target.files[0]?.size >= 1000000) {
      setWarningFile(true);
    } else {
      setFile(e.target.files[0]);
    }
  };

  const uploadPhoto = async () => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      setLoading(true);
      await axios
        .post("/upload/single-file", formData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setLoading(false);
          if (res?.status === 200) {
            const newFile = res?.data?.data?.file_name;
            const newFolder = res?.data?.data?.folder_name;
            const newPrev = res?.data?.data?.url;
            const newFileExt = res?.data?.data?.file_ext;
            setFileUploaded(newFile);
            setFolderUploaded(newFolder);
            setPreview(newPrev);
            setFileExt(newFileExt);
          } else {
            return res;
          }
        });
    } catch (err) {
      return err;
    }
  };

  const handleDeleteImg = async (folder) => {
    try {
      setLoading(true);
      await axios
        .delete(`/upload/remove-temp-folder/${folder}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setLoading(false);
          if (res?.status === 200) {
            if (folder === folderUploaded) {
              setPreview("");
              setFolderUploaded("");
              setFileExt("");
              setFile(null);
            }
          } else {
            return res;
          }
        });
    } catch (err) {
      return err;
    }
  };

  const uploadPost = async () => {
    const typeFile =
      preview !== "" && uploadLinkVideo !== ""
        ? "image & video"
        : preview !== ""
        ? "image"
        : uploadLinkVideo !== ""
        ? "video"
        : "";
    try {
      setModalLoading(true);
      axios
        .post(
          "/ezone/submit-status",
          {
            posting: textTweet,
            linkAttachment: uploadLinkVideo,
            anchorAttachment: "",
            typeAttachment: typeFile,
            postingBy: uid,
            flagUpdate: 0,
            PostingType: "intern",
            files:
              preview === ""
                ? []
                : [
                    {
                      file_ext: fileExt,
                      file_name: fileUploaded,
                      folder_name: folderUploaded,
                      collection_name: "status",
                    },
                  ],
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((data) => {
          setModalLoading(false);
          if (data?.status === 200) {
            setShow(false);
            window.location.reload(true);
          } else if (data?.status === 429) {
            setErrorModal(true);
            setErrorMessage(
              "Too many request at one moment, please try again later.."
            );
          } else {
            setErrorModal(true);
            setErrorMessage(data?.data?.message);
          }
        });
    } catch (err) {
      return err;
    }
  };

  // ytb
  const handleSubmit = () => {
    if (
      uploadLinkVideo?.startsWith("https://www.youtube.com/watch?v=") ||
      uploadLinkVideo?.startsWith("http://www.youtube.com/watch?v=") ||
      uploadLinkVideo?.startsWith("https://youtu.be/") ||
      uploadLinkVideo?.startsWith("http://youtu.be/")
    ) {
      return setIsYoutubeCorrect(true);
    } else {
      return setIsYoutubeCorrect(false);
    }
  };

  useEffect(() => {
    handleSubmit();
    // eslint-disable-next-line
  }, [uploadLinkVideo]);

  useEffect(() => {
    file !== null && uploadPhoto();
    //eslint-disable-next-line
  }, [file]);

  const PopUpImg = () => {
    return (
      <Fragment>
        <div className="border border-light-grey p-2 rounded-3">
          {preview === "" ? (
            <>
              {loading ? (
                <LoadingComponent />
              ) : (
                <>
                  <input
                    type="file"
                    id="uploadFoto"
                    accept=".mp4, .jpg, .jpeg"
                    className="d-none"
                    onChange={(e) => onChangePicture(e)}
                  />
                  <label htmlFor="uploadFoto" className="w-100" role="button">
                    <div className="bg-kinda-grey w-100 d-flex align-items-center justify-content-center rounded-3 py-8">
                      <Image src={Iconmg} />
                    </div>
                  </label>
                </>
              )}
            </>
          ) : (
            <div className="position-relative w-100 rounded-3">
              <Image src={preview} className="w-100 rounded-3" />
              <Icon
                path={CloseIcon}
                size={1}
                role="button"
                className="position-absolute h-100 icon-img-upload"
                style={{ right: "3%", top: "-40%" }}
                onClick={() => handleDeleteImg(folderUploaded)}
              />
            </div>
          )}
        </div>
      </Fragment>
    );
  };

  return (
    <>
      <Modal
        show={show}
        onHide={() => {
          setShow(false);
          setIsClickVideo(false);
          setIsClickImg(false);
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="font-md w-100" style={{ fontWeight: "700" }}>
            <p className="mb-0 text-center">Buat Postingan</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pb-2">
          {errorModal && (
            <ErrorAlert
              setState={setErrorModal}
              text1={errorMessage}
              className="m-0"
            />
          )}
          {warningFile && (
            <ErrorAlert
              setState={setWarningFile}
              text1="Foto yang diunggah lebih dari 1 MB,"
              span="Mohon unggah ulang dibawah 1 MB"
            />
          )}

          {dataArr?.map((data, id) => {
            return (
              <div key={id} className="d-flex">
                <div
                  className="avatar avatar-md rounded-circle me-2"
                  style={{ border: "1px solid #FFFFFF" }}
                >
                  <Image alt="" src={photoProfile} className="rounded-circle" />
                </div>
                <div className="d-flex flex-column justify-content-center">
                  <p
                    className="mb-1 lh-1 text-navy-ezone"
                    style={{ fontWeight: "600" }}
                  >
                    {data?.name}
                  </p>
                  <p className="mb-0 lh-1">{data?.roleTitle}</p>
                </div>
              </div>
            );
          })}
          <textarea
            name="message"
            className="h100 bor-0 w-100 rounded-xxl p-2 mt-3 font-xsss text-grey-500 fw-500 border-light-md theme-dark-bg text-area-post-ezone"
            cols="30"
            rows="10"
            placeholder="What's on your mind? (min. 20 characters)"
            style={{ border: "none" }}
            onChange={(e) => setTextTweet(e.target.value)}
          ></textarea>
          {isClickImg && <PopUpImg />}
          {isClickVideo && (
            <>
              <Form>
                <Form.Group className="mb-3">
                  <FillInput
                    type="text"
                    placeholder="Example : https://www.youtube.com/watch?v=D4kdyA7m-Oo"
                    setState={setUploadLinkVideo}
                    value={uploadLinkVideo}
                    withOutInputClassName={true}
                  />
                </Form.Group>
              </Form>
            </>
          )}
          <div className="w-25 d-flex mt-3">
            <div
              className="d-flex flex-row bg-secondary-ezone px-2 py-1 align-items-center rounded-3 me-2"
              style={{ width: "fitContent" }}
              onClick={() => {
                setIsClickVideo(false);
                setIsClickImg(true);
              }}
              role="button"
            >
              <Icon path={imgIcon} className="text-success" size={0.7} />
              <p className="mb-0 ms-1 font-xssss">Photo</p>
            </div>
            <div
              className="d-flex flex-row bg-secondary-ezone px-2 py-1 align-items-center rounded-3 "
              style={{ width: "fitContent" }}
              onClick={() => {
                setIsClickImg(false);
                setIsClickVideo(true);
              }}
              role="button"
            >
              <Icon path={videoIcon} className="text-danger" size={0.7} />
              <p className="mb-0 ms-1 font-xssss">Video</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant={
              textTweet?.length >= 20 ||
              preview !== "" ||
              isYoutubeCorrect === true
                ? "primary"
                : "kinda-grey"
            }
            className="w-100 py-1 text-white"
            onClick={uploadPost}
            disabled={
              textTweet?.length >= 20 ||
              preview !== "" ||
              isYoutubeCorrect === true
                ? false
                : true
            }
          >
            Kirim
          </Button>
        </Modal.Footer>
      </Modal>
      {modalLoading && (
        <ProcessLoadingModal show={modalLoading} setShow={setModalLoading} />
      )}
    </>
  );
};

export default CreatePostModal;
