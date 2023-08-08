import React, { Fragment, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import {
  mdiCheckboxMarkedCircleOutline,
  mdiClockOutline,
  mdiCloseCircleOutline,
  mdiCheckAll,
  mdiCogOutline as SettingsIcon,
  mdiCloseCircleOutline as RevisionIcon,
} from "@mdi/js";
import StatLeftBGIcon from "../common/stats/StatLeftBGIcon";
import { Link } from "react-router-dom";

export const CMSDashboard = ({
  data,
  setStatus,
  isDatabase,
  arrStatus,
  status,
}) => {
  const [linkClicked, setLinkClicked] = useState(0);
  const [isActive, setIsActive] = useState(false);

  function getStatusName(status) {
    if (status === "N") {
      return {
        name: "Waiting for approval",
        icon: mdiClockOutline,
        iconColorVariant: "secondary",
      };
    } else if (status === "R") {
      return {
        name: "Reject",
        icon: mdiCloseCircleOutline,
        iconColorVariant: "danger",
      };
    } else if (status === "A") {
      return {
        name: "Approve",
        icon: mdiCheckboxMarkedCircleOutline,
        iconColorVariant: "info",
      };
    } else if (status === "F") {
      return {
        name: "Full Approve",
        icon: mdiCheckAll,
        iconColorVariant: "success",
      };
    } else {
      return {
        name: "",
        icon: null,
      };
    }
  }

  useEffect(() => {
    if (data && data?.length > 0) {
      const firstItem = data[0];
      if (firstItem?.status === "N") {
        setIsActive(true);
      }
    }
  }, []);

  return (
    <Fragment>
      {isDatabase ? (
        <Row>
          {arrStatus?.map((data, id) => {
            const handleName = (status) => {
              switch (status) {
                case "N":
                  return "OPEN";
                case "A":
                  return "PROCESS";
                case "R":
                  return "REVISION";
                case "F":
                  return "CLOSED";
                default:
                  return null;
              }
            };
            const handleIcon = (status) => {
              switch (status) {
                case "N":
                  return mdiClockOutline;
                case "A":
                  return mdiCheckboxMarkedCircleOutline;
                case "R":
                  return RevisionIcon;
                case "F":
                  return mdiCheckAll;
                default:
                  return null;
              }
            };
            const handleIconColor = (status) => {
              switch (status) {
                case "N":
                  return "primary";
                case "A":
                  return "info";
                case "R":
                  return "danger";
                case "F":
                  return "success";
                default:
                  return null;
              }
            };

            return (
              <Col xl={3} lg={6} md={12} sm={12} key={id}>
                <div role="button" onClick={() => setStatus(data?.status)}>
                  <StatLeftBGIcon
                    title={handleName(data?.status)}
                    value={data?.count}
                    // summary="+ 12 Per 16 August 2022"
                    iconName={handleIcon(data?.status)}
                    iconColorVariant={handleIconColor(data?.status)}
                    classValue={
                      status?.toLowerCase() === data?.status?.toLowerCase()
                        ? "mb-4 bg-primary text-white"
                        : "mb-4"
                    }
                    classText={
                      status?.toLowerCase() === data?.status?.toLowerCase()
                        ? "h1 fw-bold mb-1 text-white"
                        : "h1 fw-bold mb-1"
                    }
                    spanClassName={
                      status?.toLowerCase() === data?.status?.toLowerCase()
                        ? "h6 text-white"
                        : "h6 text-kinda-light-dark"
                    }
                  />
                </div>
              </Col>
            );
          })}
        </Row>
      ) : (
        <Row>
          {Array.isArray(data) &&
            data.map((item, index) => {
              const isItemActive =
                (isActive && index === 0) || index === linkClicked;
              const { name, icon, iconColorVariant } = getStatusName(
                item.status
              );
              return (
                <Col xl={3} lg={6} md={12} sm={12} key={index}>
                  <Link
                    variant="transparant"
                    className="p-0"
                    onClick={() => {
                      setStatus(item?.status);
                      setLinkClicked(index);
                      setIsActive(false);
                    }}
                  >
                    <StatLeftBGIcon
                      title={name}
                      value={item.count}
                      // summary="+ ? Per 16 August 2022"
                      iconName={icon}
                      iconColorVariant={iconColorVariant}
                      classValue={`mb-4 ${
                        isItemActive
                          ? "bg-primary text-white"
                          : "text-dark mb-4"
                      }`}
                      classText={`h1 fw-bold mb-1 ${
                        isItemActive
                          ? "text-white"
                          : "h1 text-dark fw-bold mb-1"
                      }`}
                      spanClassName={`h6 ${
                        isItemActive ? "text-white" : "h6 text-kinda-light-dark"
                      }`}
                    />
                  </Link>
                </Col>
              );
            })}
        </Row>
      )}
    </Fragment>
  );
};
