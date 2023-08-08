// import node module libraries
import React from "react";
import { Link } from "react-router-dom";
import { Card, Image } from "react-bootstrap";

const TeamGridCard = ({ item }) => {
  // The forwardRef is important!!
  // Dropdown needs access to the DOM node in order to position the Menu

  return (
    <Card className="h-100">
      <Card.Body className="d-flex flex-column justify-content-between">
        <div className="d-flex align-items-top">
          <div className="rounded-circle avatar avatar-lg">
            <Image
              alt=""
              src={item?.photo}
              // height={50}
              className="rounded-circle avatar avatar-lg"
              style={{ width: "50px", height: "60px" }}
            />
          </div>
          <div className="ms-3">
            <h4 className="mb-0">
              <Link
                to={`/myteam/detail-profile/${item?.uid}`}
                className="text-inherit"
              >
                {item?.name}
              </Link>
            </h4>
            <p className="mb-0 text-muted">
              {item?.nik} • {item?.level}{" "}
            </p>
            <p className="mb-0 text-muted">{item?.job_title}</p>
          </div>
        </div>

        <div className="mt-4 lh-1 d-flex justify-content-end align-content-end">
          <Link
            to={`/myteam/detail-profile/${item?.uid}`}
            state={item}
            className="btn btn-outline-primary btn-xs mt-auto"
          >
            View Detail
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TeamGridCard;
