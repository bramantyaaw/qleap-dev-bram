import React from "react";
import { Badge, Tooltip, OverlayTrigger } from "react-bootstrap";

const TicketListBadge = ({ time, text, className }) => {
  return (
    <OverlayTrigger placement="top" overlay={<Tooltip>{time}</Tooltip>}>
      <Badge className={`badge-notif ${className}`}>{text}</Badge>
    </OverlayTrigger>
  );
};

export default TicketListBadge;
