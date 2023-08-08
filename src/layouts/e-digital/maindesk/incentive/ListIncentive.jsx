import React, { Fragment } from "react";
import { Button, Card, Table } from "react-bootstrap";

export const ListIncentive = () => {
  return (
    <Fragment>
      <Card>
        <Card.Header>
          <h4>List Incentive</h4>
        </Card.Header>
        <Card.Body>
          <Table>
            <thead className="table-light">
              <tr>
                <th scope="col" className="border-top-0">
                  No
                </th>
                <th scope="col" className="tborder-top-0 ">
                  File Name
                </th>
                <th scope="col" className="border-top-0 ">
                  Upload Date
                </th>
                <th scope="col" className="border-top-0 ">
                  Download
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="">1</td>
                <td className="align-middle ">Device</td>
                <td className="text-wrap align-middle">Monday, 12/10/2022</td>
                <td className="">
                  <Button className="text-white" size="xs" variant="danger">
                    Download
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Fragment>
  );
};
