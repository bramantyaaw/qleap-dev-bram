import React from "react";
import { Badge } from "react-bootstrap";

const ProcessBadges = ({ time, colorVariant, badgeValue }) => {
  return (
    <>
      <Badge bg={colorVariant} className="badge-notif-overview">
        {badgeValue}
      </Badge>
    </>
  );
};

export default ProcessBadges;
