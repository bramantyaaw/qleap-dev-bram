import React, { Fragment, useEffect, useState } from "react";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import IllustrationImg from "../../../assets/ezone/images/png/community-form-illustration.png";
import TextForm from "../../../components/components/dashboard/ticketing/elements/text/TextForm";
import FillInput from "../../../components/components/dashboard/ticketing/elements/input/FillInput";
import { useMediaQuery } from "react-responsive";
import Icon from "@mdi/react";
import { mdiArrowLeft as ArrowIcon } from "@mdi/js";
import SelectAutocorrect from "../../../components/components/dashboard/ticketing/elements/form-select/SelectAutocorrect";
import axios from "axios";
import ErrorAlert from "../../../components/components/dashboard/ticketing/elements/alerts/ErrorAlert";
import LoadingComponent from "../../../components/components/elements/loading/LoadingComponent";

const CommunityForm = ({
  token,
  setIsClickJoin,
  isClickJoin,
  id,
  uid,
  setSuccess,
}) => {
  const [whatsapp, setWhatsapp] = useState("");
  const [whatsappRegex, setWhatsappRegex] = useState("");
  const [locationId, setLocationId] = useState(0);
  const [listLocation, setListLocation] = useState([]);

  // const [errorRegex, setErrorRegex] = useState(false);
  const [loading, setLoading] = useState(false);

  const isLaptop = useMediaQuery({
    query: "(min-width: 700px)",
  });

  const fetchListLocation = async () => {
    try {
      await axios
        .get("/master/get-location-id", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((data) => {
          if (data?.status === 200) {
            const newData = data?.data?.data;
            const filteredData = newData?.filter(
              (data) => data?.locName !== "(None)"
            );
            const objData = filteredData?.map((data) => {
              return {
                value: data?.locId,
                label: data?.locName,
              };
            });

            setListLocation(objData);
          }
        });
    } catch (err) {
      return err;
    }
  };

  const handleChangeLocation = (selectedOption) => {
    setLocationId(selectedOption?.value);
  };

  const handleSubmitData = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios
        .post(
          "/ezone/register-community",
          {
            community_id: parseInt(id),
            uid,
            phone: whatsappRegex,
            work_location: locationId,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          setLoading(false);
          if (res?.status === 200) {
            setSuccess(true);
            setTimeout(() => {
              window.location.reload(true);
            }, 1500);
          }
        });
    } catch (err) {
      return err;
    }
    // }
  };

  useEffect(() => {
    const regex = /^[0-9]*$/;
    let regexChecker = regex.test(whatsapp);
    if (regexChecker === true && whatsapp?.startsWith("0")) {
      return setWhatsappRegex(whatsapp);
    } else if (whatsapp?.length === 0) {
      return setWhatsappRegex("");
    }
  }, [whatsapp]);

  useEffect(() => {
    isClickJoin === true && fetchListLocation();
    // eslint-disable-next-line
  }, [isClickJoin]);

  return (
    <>
      <Card
        className="mb-3 rounded-4 position-relative"
        style={{ maxHeight: "fitContent" }}
      >
        <Row>
          <div
            className={`icon-shape icon-md bg-white text-black rounded-circle  position-absolute`}
            style={{ width: "37px", left: "10px", top: "10px" }}
            onClick={() => setIsClickJoin(false)}
            role="button"
          >
            <Icon path={ArrowIcon} className="nav-icon fw-bold" size={2} />
          </div>
          {isLaptop && (
            <Col lg={6} md={6} sm={6} xs={6}>
              <div className="d-flex justify-content-start">
                <Image src={IllustrationImg} className="w-100 h-100" />
              </div>
            </Col>
          )}

          <Col
            lg={isLaptop ? 6 : 12}
            md={isLaptop ? 6 : 12}
            sm={isLaptop ? 6 : 12}
            xs={isLaptop ? 6 : 12}
          >
            <div
              className={`d-flex flex-column align-items-center justify-content-center h-100 w-100  pe-md-6 ${
                isLaptop ? null : "px-4 py-6"
              }`}
            >
              <p
                style={{ color: "#111", fontWeight: "800" }}
                className={`text-center mb-0 ${isLaptop ? "h1" : "h2"}`}
              >
                Join Community
              </p>
              <div className="w-100">
                <div className="w-100 mt-5 border-bottom">
                  <TextForm
                    text="Whatsapp Number"
                    className="text-ezone-body-color font-xsss "
                  />
                  <FillInput
                    type="text"
                    placeholder="Enter your whatsapp number"
                    withOutInputClassName
                    value={whatsappRegex}
                    setState={setWhatsapp}
                    style={{
                      border: "none",
                      fontSize: "12px",
                      paddingLeft: "8px",
                    }}
                    className="input-outline-none shadow-none"
                  />
                </div>
                <div className="w-100 mt-3 border-bottom">
                  <TextForm
                    text="Work Location"
                    className="text-ezone-body-color font-xsss"
                  />

                  <SelectAutocorrect
                    handleChange={handleChangeLocation}
                    arrData={listLocation}
                    placeholder=""
                    style={{ border: "none", fontSize: "12px" }}
                    className="input-outline-none shadow-none px-0 mx-0"
                    border="none"
                    isCustom
                    paddingLeft="0px"
                  />
                </div>
              </div>
              <div
                className={`mt-3 w-100  ${
                  isLaptop
                    ? "d-flex justify-content-end"
                    : "d-flex justify-content-center"
                }`}
              >
                {loading ? (
                  <LoadingComponent />
                ) : (
                  <Button
                    variant={
                      locationId !== 0 && whatsappRegex?.length >= 8
                        ? "primary"
                        : "kinda-grey"
                    }
                    onClick={handleSubmitData}
                    disabled={
                      locationId !== 0 && whatsappRegex?.length >= 8
                        ? false
                        : true
                    }
                  >
                    Submit
                  </Button>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default CommunityForm;
