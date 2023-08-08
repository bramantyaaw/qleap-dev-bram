import Icon from "@mdi/react";
import React from "react";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { StatLeftInfo } from "../../../common/stats/StatLeftInfo";
import {
  mdiInformationOutline as infoIcon,
  mdiSchoolOutline,
  mdiAccountArrowUpOutline,
} from "@mdi/js";

export const LastProgram = () => {
  return (
    <>
      <Card className="my-4 pb-2">
        <h4 className="p-4 pb-2 text-secondary fw-bold">
          {" "}
          Your Last Program{" "}
          <span>
            {" "}
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip
                  className="position-absolute"
                  style={{ top: "0", right: "0" }}
                >
                  <p className="mb-0 text-start">Here is your Last Program</p>
                </Tooltip>
              }
            >
              <div>
                <Icon
                  role="button"
                  path={infoIcon}
                  size={1}
                  className="position-absolute text-secondary"
                  style={{ top: "20", right: "20" }}
                />
              </div>
            </OverlayTrigger>
          </span>
        </h4>

        <span className="p-4 pb-10 text-center fst-italic align-items-center">
          Masih belum ada Program yang ditampilkan
        </span>

        {/* <StatLeftInfo
          title="Bootstrap 5 Beginner Tutorial"
          value4="30%"
          span1="12"
          value1="Module"
          span2="12"
          value2="Assessment"
          iconName={mdiSchoolOutline}
          iconColorVariant="primary"
          classValue="m-2  shadow-lg rounded-3 p-2 bg-white"
          progress
        /> */}
        {/* <StatLeftInfo
          title="Bootstrap 5 Beginner Tutorial"
          value4="30%"
          span1="12"
          value1="Module"
          span2="12"
          value2="Assessment"
          iconName={mdiAccountArrowUpOutline}
          iconColorVariant="success"
          classValue="m-2  shadow-lg rounded-3 p-2 bg-white"
          progress
        /> */}
        {/* <StatLeftInfo
          title="Bootstrap 5 Beginner Tutorial"
          value4="30%"
          span1="12"
          value1="Module"
          span2="12"
          value2="Assessment"
          iconName={mdiSchoolOutline}
          iconColorVariant="primary"
          classValue="m-2  shadow-lg rounded-3 p-2 bg-white"
          progress
        /> */}
      </Card>
    </>
  );
};
