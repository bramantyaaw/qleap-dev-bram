// import node module libraries
import { Card, Table, ProgressBar, Image } from "react-bootstrap";
import { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { profileAction } from "../../../redux/action/profileAction";

export const KPITable = () => {
  const dispatch = useDispatch();
  const { profileData } = useSelector((state) => state.profileReducer);
  const dataUser = profileData?.data?.data;

  useEffect(() => {
    const win = window.localStorage;
    const token = win.getItem("access_token");
    const uid = win.getItem("uid");
    profileData === null && dispatch(profileAction(token, uid));
  }, []);
  return (
    <Card>
      <Card.Header>
        <div className="mb-3 mb-lg-0">
          <h3 lassName="m-0">Key Perfomance Indicator</h3>
          <p className="m-0">You can find all of your order Invoices.</p>
        </div>
      </Card.Header>

      {/* table */}
      <div className="table-responsive overflow-y-hidden">
        <Table className="table mb-0 text-nowrap">
          <thead className="table-light">
            <tr>
              <th scope="col" className="border-top-0">
                KPI
              </th>
              <th scope="col" className="tborder-top-0 ">
                Weight
              </th>
              <th scope="col" className="border-top-0 ">
                Formula
              </th>
              <th scope="col" className="border-top-0 ">
                Review Periods
              </th>
            </tr>
          </thead>
          <tbody>
            {dataUser?.map((item, index) => {
              return (
                <Fragment key={index}>
                  {item.kpi &&
                    item.kpi.map((subitem, index) => {
                      return (
                        <tr key={index}>
                          <td className="">{subitem?.indicator}</td>
                          <td className="align-middle ">{subitem?.weight}</td>
                          <td className="text-wrap align-middle">
                            {subitem?.formula}
                          </td>
                          <td className="">{subitem?.period}</td>
                        </tr>
                      );
                    })}
                  {!item.kpi && (
                    <tr className="d-flex justify-content-start ">
                      <td>
                        <h5 className="text-muted fst-italic">
                          No Key Performance Indicator to Display
                        </h5>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </Table>
      </div>
    </Card>
  );
};
