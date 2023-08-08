import React from "react";
import { Button, Card, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { overdueData } from "../../../../../../data/maindesk/OverdueListData";

export const OverdueList = ({ data }) => {
  return (
    <Card>
      <Card.Header>
        <h4 className="mb-0">Overdue List</h4>
      </Card.Header>

      {/* table */}
      <div className="table-responsive overflow-y-hidden">
        <Table className="table mb-0 text-nowrap">
          <thead className="table-light">
            <tr>
              <th scope="col" className="border-top-0">
                EPCN TYPE
              </th>
              <th scope="col" className="border-top-0 ">
                Overdue
              </th>
              <th scope="col" className="border-top-0 ">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 ? (
              data?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="align-middle ">{item.type}</td>
                    <td className="align-middle">
                      {item.overdue}{" "}
                      <i className="fe fe-alert-triangle text-danger"></i>
                    </td>
                    <td className="align-middle ">
                      <Link className="btn btn-info btn-xs text-white">
                        View Detail
                      </Link>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="align-item-center justify-content-center text-center">
                <p className="fst-italic align-self-center text-center">
                  No data to display
                </p>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <Card.Footer className="d-flex justify-content-center">
        <Link className="text-center">View All</Link>
      </Card.Footer>
    </Card>
  );
};
