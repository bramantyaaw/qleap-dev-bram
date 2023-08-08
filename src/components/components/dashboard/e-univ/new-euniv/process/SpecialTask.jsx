import React from "react";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import StatCenterInfo from "../../../common/stats/StatCenterInfo";
import Icon from "@mdi/react";
import {
  mdiInformationOutline as infoIcon,
  mdiSchoolOutline,
  mdiAccountArrowUpOutline,
} from "@mdi/js";
import { StatLeftInfo } from "../../../common/stats/StatLeftInfo";

export const SpecialTask = () => {
  return (
    <>
      <Card className=" pb-2 bg-primary">
        <h4 className="p-4 pb-2 fw-bold text-white">
          {" "}
          Special Task{" "}
          <span>
            {" "}
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip
                  className="position-absolute"
                  style={{ top: "0", right: "0" }}
                >
                  <p className="mb-0 text-start">Here is your Special Task</p>
                </Tooltip>
              }
            >
              <div>
                <Icon
                  role="button"
                  path={infoIcon}
                  size={1}
                  className="position-absolute text-white"
                  style={{ top: "20", right: "20" }}
                />
              </div>
            </OverlayTrigger>
          </span>
        </h4>

        <span className="text-white p-4 pb-6 text-center fst-italic align-items-center">
          Masih belum ada Special Task yang tersedia
        </span>

        {/* <StatLeftInfo
          title="Weekly Quiz"
          value1="WQ Samsung S23 ultra"
          value4="01/12/2021"
          iconName={mdiSchoolOutline}
          iconColorVariant="primary"
          classValue="m-2 rounded-3 p-2 bg-white"
        />
        <StatLeftInfo
          title="Talent Development"
          value1="Certification For leader"
          value4="01/12/2021"
          iconName={mdiAccountArrowUpOutline}
          iconColorVariant="success"
          classValue="m-2 rounded-3 p-2 bg-white"
        /> */}
      </Card>
    </>
  );
};
