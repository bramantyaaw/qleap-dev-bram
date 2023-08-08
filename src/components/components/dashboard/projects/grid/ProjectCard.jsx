// import node module libraries
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiAccountPlusOutline, mdiBookEducationOutline } from "@mdi/js";
import { Card, ProgressBar, Badge } from "react-bootstrap";
import { getStatusColor } from "../../../../../config/helper/utils";

const ProjectCard = ({
  item,
  completeProgress,
  listBucketProgress,
  overdueProgress,
}) => {
  const [listBucketCondition, setListBucketCondition] = useState(0);
  const [overdueCondition, setOverdueCondition] = useState(0);

  let total = listBucketProgress + overdueProgress;

  const countListBucketPercentage = () => {
    let totalCount = (100 * listBucketProgress) / total;
    return setListBucketCondition(totalCount);
  };

  const countOverduePercentage = () => {
    let totalCount = (100 * overdueProgress) / total;
    return setOverdueCondition(totalCount);
  };

  const conditionerIcon = (value) => {
    switch (value?.toLowerCase()) {
      case "ticketing":
        return <Icon path={mdiAccountPlusOutline} size={0.8} />;
      case "epcn":
        return <Icon path={mdiAccountPlusOutline} size={0.8} />;
      case "manage program":
        return <Icon path={mdiBookEducationOutline} size={0.8} />;
      default:
        return null;
    }
  };

  const CardHeading = (item) => {
    let name = item?.function_name;
    const string = name?.charAt(0).toUpperCase() + name?.slice(1);
    if (item?.icon != null) {
      return (
        <div className="d-flex align-items-center">
          <div className="icon-shape icon-md rounded-3 text-black border">
            {item?.function_name
              ? conditionerIcon(item?.function_name)
              : item?.icon}
            {/* {conditionerIcon(item?.function_name)} */}
          </div>
          <div className="ms-2">
            <h5 className="mb-0">
              <Link target="_top" to={item?.route} className="text-navy ">
                {string}
              </Link>

              <Badge
                className="ms-2 textc-9 px-2 pt-1 pb-1 rounded-4"
                bg={"success"}
              >
                New: {item?.badge}
              </Badge>
            </h5>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h4 className="mb-0">
            <Link to="#" className="text-inherit">
              {item?.title}
            </Link>
          </h4>
        </div>
      );
    }
  };

  const CardHeadingHardCode = (item) => {
    if (item?.icon != null) {
      return (
        <div className="d-flex align-items-center">
          <div className="icon-shape icon-md rounded-3 text-black border">
            {item?.function_name
              ? conditionerIcon(item?.function_name)
              : item?.icon}
            {/* {conditionerIcon(item?.function_name)} */}
          </div>
          <div className="ms-2">
            <h5 className="mb-0">
              <Link target="_top" to={item?.link} className="text-navy ">
                {item?.title}
              </Link>

              <Badge
                className="ms-2 textc-9 px-2 pt-1 pb-1 rounded-4"
                bg={"success"}
              >
                New: 0
              </Badge>
            </h5>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h4 className="mb-0">
            <Link to="#" className="text-inherit">
              {item?.title}
            </Link>
          </h4>
        </div>
      );
    }
  };

  useEffect(() => {
    // countCompletePercentage();
    countListBucketPercentage();
    countOverduePercentage();
    // eslint-disable-next-line
  }, [item]);

  return (
    <>
      {item?.notBucket === true ? (
        <Link to={item?.link} target="_top">
          <Card className="h-100">
            <Card.Body>
              {/* heading*/}
              {item?.coverimage == null ? (
                <div className="d-flex align-items-center justify-content-between">
                  {CardHeadingHardCode(item)}
                </div>
              ) : (
                CardHeadingHardCode(item)
              )}
              {/* progress */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center"></div>
                {/* text */}
                <div>
                  <>
                    <span
                      className={`badge bg-light-success text-success borderc-6`}
                    >
                      Low
                    </span>
                  </>
                </div>
              </div>
              <div>
                {/* progress bar */}
                <ProgressBar style={{ height: "8px" }}>
                  <ProgressBar
                    variant="success"
                    now={50}
                    style={{
                      width: "100%",
                    }}
                  />
                </ProgressBar>
              </div>
            </Card.Body>

            {/* card footer */}
            <Card.Footer className="bg-white p-0">
              <div className="d-flex justify-content-between ">
                <div className="w-50 py-3 ps-5 px-2">
                  <h6 className="mb-0 text-muted">List Bucket</h6>
                  <p className="text-warning fs-6 fw-semi-bold mb-0">0 List</p>
                </div>
                <div className="border-start w-50 py-3 ps-5 px-2">
                  <h6 className="mb-0 text-muted">Over Due</h6>
                  <p className="text-danger fs-6 fw-semi-bold mb-0">0 List</p>
                </div>
              </div>
            </Card.Footer>
          </Card>
        </Link>
      ) : (
        <Link to={item?.route} target="_top">
          <Card className="h-100">
            <Card.Body>
              {/* heading*/}
              {item?.coverimage == null ? (
                <div className="d-flex align-items-center justify-content-between">
                  {CardHeading(item)}
                </div>
              ) : (
                CardHeading(item)
              )}
              {/* progress */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center"></div>
                {/* text */}
                <div>
                  {item?.status !== "Nan" ? (
                    <span
                      className={`badge bg-light-${getStatusColor(
                        item?.status
                      )} text-${getStatusColor(item?.status)}`}
                    >
                      {item?.status}
                    </span>
                  ) : (
                    <>
                      <span
                        className={`badge bg-light-success text-success borderc-6`}
                      >
                        Low
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div>
                {/* progress bar */}
                <ProgressBar style={{ height: "8px" }}>
                  <ProgressBar
                    variant="success"
                    now={50}
                    style={{
                      width:
                        listBucketProgress === 0 && overdueProgress === 0
                          ? "100%"
                          : null,
                    }}
                  />
                  <ProgressBar
                    variant="warning"
                    now={50}
                    style={{ width: `${listBucketCondition}%` }}
                  />
                  <ProgressBar
                    variant="danger"
                    now={50}
                    style={{ width: `${overdueCondition}%` }}
                  />
                </ProgressBar>
              </div>
            </Card.Body>

            {/* card footer */}
            <Card.Footer className="bg-white p-0">
              <div className="d-flex justify-content-between ">
                <div className="w-50 py-3 ps-5 px-2">
                  <h6 className="mb-0 text-muted">List Bucket</h6>
                  <p className="text-warning fs-6 fw-semi-bold mb-0">
                    {item?.list_bucket} List
                  </p>
                </div>
                <div className="border-start w-50 py-3 ps-5 px-2">
                  <h6 className="mb-0 text-muted">Over Due</h6>
                  <p className="text-danger fs-6 fw-semi-bold mb-0">
                    {item?.overdue} List
                  </p>
                </div>
              </div>
            </Card.Footer>
          </Card>
        </Link>
      )}
    </>
  );
};

export default ProjectCard;
