import React, { useEffect, useState } from "react";
import avatarImg from "../../../assets/images/avatar/avatar-1.jpg";
import { Image, Button } from "react-bootstrap";

const NodeLabel = ({ className, nodeData, setDoesntHaveTeam }) => {
  return (
    <div
      className={className}
      style={{
        background: "#ffffff",
        // height: "170px",
        borderTop: "5px solid #2642CA",
        textAlign: "center",
        // position: "fixed",
        zIndex: "1000",
        // left: "-10px",
        boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.3)",
        padding: "5px 0",
        borderRadius: "10px",
      }}
    >
      <div className="mb-3">
        <Image
          src={nodeData?.photo}
          height={61}
          width={61}
          className="rounded-circle custom-img-talent"
        />
      </div>
      <p className="mb-1 text-black fw-bold h6">{nodeData?.name}</p>
      <p className="mb-1 textc-9">
        {nodeData.nik} • {nodeData?.level}
      </p>
      <p className="mb-3 textc-9">{nodeData.job_title}</p>
      {nodeData?.depth > 0 && (
        <Button
          variant="outline-primary"
          className="btn-tree textc-9 mb-2"
          onClick={() => setDoesntHaveTeam(true)}
        >
          See Talent Profile
        </Button>
      )}

      {nodeData?._children && (
        <Button variant="primary" className="btn-tree textc-9">
          See {nodeData?._children?.length} subordinate
        </Button>
      )}
    </div>
  );
};

export default NodeLabel;
