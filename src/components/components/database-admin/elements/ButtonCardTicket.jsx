import React from "react";
import ButtonBadgePIC from "../../../../layouts/database-admin/ticket/elements/ButtonBadgePIC";

const ButtonCardTicket = ({
  arrData,
  ticketStatus,
  setProcessModal,
  setSolveModal,
  setRevisionModal,
  locCode,
}) => {
  return (
    <div className="d-flex justify-content-end mt-4">
      {ticketStatus === "S" || ticketStatus === "E" || ticketStatus === "RO" ? (
        <ButtonBadgePIC
          onClick={setProcessModal}
          text="Process"
          bg="outline-primary"
          className="px-3 py-2"
        />
      ) : (
        <ButtonBadgePIC
          hidden="true"
          text="Process"
          bg="outline-primary"
          className="px-3 py-2"
        />
      )}

      {ticketStatus === "P" ? (
        <>
          <ButtonBadgePIC
            onClick={setRevisionModal}
            text="Revisi"
            bg="danger"
            className="px-3 py-2"
          />
          <div className="mx-3">
            {arrData[0]?.issue_id === 1 && locCode === "" ? (
              <ButtonBadgePIC
                onClick={setSolveModal}
                text="Solve"
                bg="primary"
                className="px-3 py-2"
                disabled="true"
              />
            ) : (
              <ButtonBadgePIC
                onClick={setSolveModal}
                text="Solve"
                bg="primary"
                className="px-3 py-2"
              />
            )}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default ButtonCardTicket;
