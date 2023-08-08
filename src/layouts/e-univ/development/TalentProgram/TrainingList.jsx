import React from "react";
import { TalentProgram } from "./TalentProgram";
import { Card, Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "react-feather";

export const TrainingList = () => {
  const trainingData = [
    {
      id: 1,
      name: "SEMINAR : BERUBAH ATAU PUNAH, PAHAMI BURNING PLATFORM QUADRANT ANDA UNTUK SUKSES",
      type: "ITLS - Internal Training - LSD SME",
      code: "2002-ITLS-00019",
      date: "01/05/2023",
    },
    {
      id: 2,
      name: "SUPERVISORY DEVELOPMENT PROGRAM",
      type: "ITLS - Internal Training - LSD SME",
      code: "2002-ITLS-00019",
      date: "01/05/2023",
    },
    {
      id: 3,
      name: "Training Web Design, Web Program & Codeniter Framework",
      type: "ITLS - Internal Training - LSD SME",
      code: "2002-ITLS-00019",
      date: "01/05/2023",
    },
    {
      id: 4,
      name: "SEMINAR : SALES 4.0 (WINNING THE MARKET IN DIGITAL & TECHNOLOGY TRANSFORMATION ERA)",
      type: "ITLS - Internal Training - LSD SME",
      code: "2002-ITLS-00019",
      date: "01/05/2023",
    },
    {
      id: 5,
      name: "SEMINAR : INDONESIA ECONOMIC BUSINESS OUTLOOK 2020",
      type: "ITLS - Internal Training - LSD SME",
      code: "2002-ITLS-00019",
      date: "01/05/2023",
    },
  ];

  return (
    <TalentProgram>
      <Card>
        <Card.Header>
          <h4 className="display-7 fw-bold">Training List</h4>
        </Card.Header>

        <div className="table-responsive">
          <Table className="text-nowrap mb-0">
            <thead className="table-light">
              <tr>
                <th>Training Name</th>
                <th>Training Type</th>
                <th>Training Date </th>
              </tr>
            </thead>
            <tbody>
              {trainingData?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="col-7 text-wrap">
                      <span className="fs-6">{item.code}</span>
                      <h6 className="fw-bold mb-0">{item.name}</h6>
                    </td>
                    <td className="col-3">
                      <span className="fs-6">{item.type}</span>
                    </td>
                    <td className="col-2 align-item-center text-center text-wrap">
                      <span className="fs-6">{item.date}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <div className="my-2 page-wrapper d-flex flex-column flex-sm-row align-items-center justify-content-center">
            <ReactPaginate
              previousLabel={<ChevronLeft size="14px" />}
              nextLabel={<ChevronRight size="14px" />}
              pageCount={2}
              //   onPageChange={changePage}
              containerClassName={"justify-content-center mb-0 pagination"}
              previousLinkClassName={"page-link mx-1 rounded"}
              nextLinkClassName={"page-link mx-1 rounded"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link mx-1 rounded"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"active"}
            />
          </div>
        </div>
      </Card>
    </TalentProgram>
  );
};
