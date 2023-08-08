import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import Icon from "@mdi/react";
import {
  mdiCakeLayered as BirthdayIcon,
  mdiBriefcase as AnnivIcon,
} from "@mdi/js";
import { Link } from "react-router-dom";
import axios from "axios";
import LoadingComponent from "../../../../components/elements/loading/LoadingComponent";

const DivisionMoment = ({ token, uid }) => {
  const [arrAnniv, setArrAnniv] = useState([]);
  const [arrBirthday, setArrBirthday] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchDivisionMoment = async () => {
    try {
      setLoading(true);
      await axios
        .post(
          "/ezone/get-anniv-date",
          {
            uid,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((data) => {
          setLoading(false);
          if (data?.status === 200) {
            const anniv = data?.data?.data?.anniversary;
            const birthday = data?.data?.data?.birthdays;

            // const compareDates = (a, b) => {
            //   const dateA = new Date(
            //     a?.anniv_date.split("/")?.reverse()?.join("/")
            //   );
            //   const dateB = new Date(
            //     b?.anniv_date.split("/")?.reverse()?.join("/")
            //   );
            //   const today = new Date();

            //   const diffA = Math?.abs(dateA - today);
            //   const diffB = Math?.abs(dateB - today);

            //   return diffA - diffB;
            // };
            const compareDates = (a, b) => {
              const dateA = new Date(a?.anniv_date);
              const dateB = new Date(b?.anniv_date);
              return dateA - dateB;
            };

            const sortedAnniv =
              anniv?.length > 0 ? anniv?.sort(compareDates) : null;
            const getFirstAnniv = sortedAnniv && sortedAnniv[0];
            let arrAnniv = [];
            anniv?.length > 0 && arrAnniv.push(getFirstAnniv);
            setArrAnniv(arrAnniv);

            const sortedBirthday =
              birthday?.length > 0 ? birthday?.sort(compareDates) : null;
            const getFirstBirthday = sortedBirthday && sortedBirthday[0];
            let arrBirthday = [];
            birthday?.length && arrBirthday.push(getFirstBirthday);
            setArrBirthday(arrBirthday);
          }
        });
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    fetchDivisionMoment();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
        <div className="card-body d-flex flex-column p-4">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h4
              className="mb-0 font-xs text-kinda-dark"
              style={{ fontWeight: "600" }}
            >
              Division Moment
            </h4>
            {(arrAnniv?.length > 0 || arrBirthday?.length > 0) && (
              <Link to="/ezone/celebration">
                <p className="mb-0 font-xsssss text-decoration-underline">
                  See More
                </p>
              </Link>
            )}
          </div>
          {arrAnniv?.length > 0 || arrBirthday?.length > 0 ? (
            <>
              {arrBirthday?.length > 0 &&
                arrBirthday?.map((data, id) => {
                  return (
                    <div
                      className={`d-flex justify-content-between align-items-center ${
                        arrAnniv?.length > 0 && "mb-3"
                      } `}
                      key={id}
                    >
                      <div className="d-flex align-items-center">
                        <div className="avatar avatar-md ">
                          <Image
                            alt="avatar"
                            src={data?.photo}
                            className="rounded-circle"
                            style={{ width: "40px" }}
                          />
                        </div>
                        <div className="d-flex flex-column ms-2">
                          <p className="mb-1 h5" style={{ fontWeight: "600" }}>
                            {data?.name}
                          </p>
                          <p className="mb-0">Birthday</p>
                        </div>
                      </div>

                      <Icon
                        path={BirthdayIcon}
                        size={1}
                        className="text-danger"
                      />
                    </div>
                  );
                })}

              {arrAnniv?.length > 0 &&
                arrAnniv?.map((data, id) => {
                  return (
                    <div
                      className={`d-flex justify-content-between align-items-center mb-0`}
                      key={id}
                    >
                      <div className="d-flex align-items-center">
                        <div className="avatar avatar-md ">
                          <Image
                            alt="avatar"
                            src={data?.photo}
                            className="rounded-circle"
                            style={{ width: "40px" }}
                          />
                        </div>
                        <div className="d-flex flex-column ms-2">
                          <p className="mb-1 h5" style={{ fontWeight: "600" }}>
                            {data?.name}
                          </p>
                          <p className="mb-0">Work Anniversary</p>
                        </div>
                      </div>

                      <Icon
                        path={AnnivIcon}
                        size={1}
                        className="text-primary"
                      />
                    </div>
                  );
                })}
            </>
          ) : (
            <>
              {loading ? (
                <LoadingComponent />
              ) : (
                <p
                  className="mb-0 text-center text-secondary mt-2"
                  style={{ fontSize: "11px" }}
                >
                  Nobody has had a birthday or work anniversary recently
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DivisionMoment;
