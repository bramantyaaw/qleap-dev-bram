import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiInformationOutline as InfoIcon } from "@mdi/js";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import CourseEzone from "./CourseEzone";
import IdleCourse from "../../../../components/components/dashboard/e-univ/on-board/IdleCourse";
import CardHeaderCourse from "../../../../components/components/dashboard/e-univ/on-board/details/CardHeaderCourse";

const RoomInnovation = () => {
  const [token, setToken] = useState(localStorage.getItem("access_token"));

  const [moduleData, setModuleData] = useState(null);

  const [arrPPT, setArrPPT] = useState([]);
  const [arrVideo, setArrVideo] = useState([]);
  const [arrMeeting, setArrMeeting] = useState([]);

  const { roomName } = useParams();
  const capitalizeName = roomName.charAt(0).toUpperCase() + roomName.slice(1);

  const fetchData = async () => {
    try {
      await axios
        .post(
          "/ezone/get-ilead-material",
          {
            value: roomName,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )

        .then((res) => {
          const newData = res?.data?.data;
          const ppt = newData?.filter((data) => data?.Type === "ppt");
          const sortPPT = ppt?.sort((a, b) =>
            a?.title?.localeCompare(b?.title)
          );
          setArrPPT(sortPPT);

          const video = newData?.filter((data) => data?.Type === "video");
          const sortVideo = video?.sort((a, b) =>
            a?.title?.localeCompare(b?.title)
          );
          setArrVideo(sortVideo);

          const meeting = newData?.filter((data) => data?.Type === "meeting");
          const sortMeeting = meeting?.sort((a, b) =>
            a?.title?.localeCompare(b?.title)
          );
          setArrMeeting(sortMeeting);
        });
    } catch (e) {
      return e;
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
    // eslint-disable-next-line
  }, [localStorage]);

  const link = moduleData?.embed_link;
  const splitLink = link?.split("/edit?");
  const firstIndexLink = splitLink ? splitLink[0] : "";

  return (
    <div>
      <CourseEzone
        arrPPT={arrPPT}
        arrVideo={arrVideo}
        arrMeeting={arrMeeting}
        text1={capitalizeName}
        link1={`/ezone/ilead/room/${roomName}`}
        setModuleData={setModuleData}
        title={capitalizeName}
      >
        {moduleData !== null ? (
          <CardHeaderCourse
            title={moduleData?.title}
            note={moduleData?.Note}
            notIcon={true}
          >
            <Card.Body className="">
              {moduleData?.embed_link === "" ||
              moduleData?.embed_link === " " ? (
                <p className="text-center">There is no data</p>
              ) : moduleData?.Type === "video" ? (
                <div>
                  <iframe
                    src={moduleData?.embed_link}
                    title="iframe-modal"
                    className=""
                    style={{
                      borderRadius: "8px",
                      width: "100%",
                      height: "100%",
                      minHeight: "400px",
                    }}
                  ></iframe>
                </div>
              ) : (
                <>
                  {/* <iframe
                    src={`${moduleData?.embed_link}&embedded=true`}
                    title="iframe"
                    className="iframe-modal"
                    style={{ width: "100%", height: "500px" }}
                  ></iframe> */}

                  <iframe
                    src={`${firstIndexLink}/edit?usp=sharing&rm=minimal&embedded=true`}
                    title="iframe"
                    className="iframe-modal"
                    style={{ width: "100%", height: "500px" }}
                  ></iframe>
                </>
              )}
            </Card.Body>
          </CardHeaderCourse>
        ) : (
          <IdleCourse />
        )}
      </CourseEzone>
    </div>
  );
};

export default RoomInnovation;
