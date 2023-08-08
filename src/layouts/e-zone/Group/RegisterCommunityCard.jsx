import React from "react";
import { Button, Card } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiLockOutline } from "@mdi/js";

<Icon path={mdiLockOutline} size={1} />;

const RegisterCommunityCard = ({ className, classNameDate, style, event }) => {
  return (
    <>
      {event?.map((data, id) => {
        const date = data?.event_date?.split(" ");
        const date2 = date[1] ? date[1]?.split(",") : "";
        return (
          <Card className={`rounded-4 ${className}`} style={style} key={id}>
            <Card.Body>
              <p className="text-navy-ezone" style={{ fontWeight: "700" }}>
                Event
              </p>
              <div className="d-flex align-items-center ">
                <div
                  className={`rounded-4 d-flex flex-column align-items-center justify-content-center w-25 ${classNameDate}`}
                  style={{ width: "65px", height: "71px" }}
                >
                  <h3 className="mb-0 text-center text-white lh-1">
                    {date ? date[0] : ""}
                  </h3>
                  <h1 className="mb-0 text-center text-white lh-1">
                    {date2 ? date2[0] : ""}
                  </h1>
                </div>
                <div className="w-75 ps-2">
                  <h5
                    className="mb-1 text-navy-ezone"
                    style={{ fontWeight: "700" }}
                  >
                    {data?.event_name}
                  </h5>
                  <p
                    className="text-grey-ezone-community lh-sm mb-0"
                    style={{ fontSize: "11px" }}
                  >
                    {data?.event_desc}
                  </p>
                </div>
              </div>
              <div className="mt-3 d-flex justify-content-end">
                <Button
                  variant="secondary"
                  disabled
                  className="text-white py-1 px-4 text-uppercase"
                  style={{ fontSize: "11px" }}
                >
                  Registrasi
                </Button>
              </div>
            </Card.Body>
          </Card>
        );
      })}
    </>
  );
};

export default RegisterCommunityCard;
