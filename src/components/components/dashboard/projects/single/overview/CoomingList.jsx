// import node module libraries
import { Card, Table, ProgressBar, Image } from "react-bootstrap";

// import data files
import CoomingListData from "../../../../../../data/maindesk/CoomingListData";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";

const CoomingList = ({ data }) => {
  const [search, setSearch] = useState("");

  const [pageNumber, setPageNumber] = useState(0);
  const ticketPerPage = 5;
  const pageVisited = pageNumber * ticketPerPage;

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const newData = data?.filter((data) => {
    if (search === "") {
      return data;
    } else if (data?.title?.toLowerCase().includes(search.toLowerCase())) {
      return data;
    } else {
      return null;
    }
  });
  const pageCount = Math.ceil(newData?.length / ticketPerPage);
  const dataSliced = newData?.slice(pageVisited, pageVisited + ticketPerPage);

  return (
    <Card>
      <Card.Header>
        <h4 className="mb-0">Cooming List</h4>
      </Card.Header>

      {/* table */}
      <div className="table-responsive overflow-y-hidden">
        <Table className="table mb-0 text-nowrap">
          <thead className="table-light">
            <tr>
              <th scope="col" className="border-top-0">
                NIK
              </th>
              <th scope="col" className="border-top-0 ">
                Employee Name
              </th>
              <th scope="col" className="border-top-0 ">
                Superior
              </th>
              <th scope="col" className="border-top-0 ">
                Schedule
              </th>
              <th scope="col" className="border-top-0 ">
                Type
              </th>
              <th scope="col" className="border-top-0 ">
                Submit Period
              </th>
            </tr>
          </thead>
          <tbody>
            {dataSliced?.length > 0 ? (
              dataSliced?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="align-middle ">{item.nik}</td>
                    <td className="align-middle">{item.name}</td>
                    <td className="align-middle ">{item.superior}</td>
                    <td className="align-middle ">{item.schedule}</td>
                    <td className="align-middle ">{item.pcn_type}</td>
                    <td
                      className={`text-center ${
                        item.status_period === "overdue"
                          ? "text-danger"
                          : "text-success"
                      }`}
                    >
                      {item.submit_period} days
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                {" "}
                <p className="fst-italic align-self-center text-center">
                  No data to display{" "}
                </p>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <div className="my-2 page-wrapper d-flex flex-column flex-sm-row align-items-center justify-content-center">
        <ReactPaginate
          previousLabel={<ChevronLeft size="14px" />}
          nextLabel={<ChevronRight size="14px" />}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"justify-content-center mb-0 pagination"}
          previousLinkClassName={"page-link mx-1 rounded"}
          nextLinkClassName={"page-link mx-1 rounded"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link mx-1 rounded"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"active"}
        />
      </div>
    </Card>
  );
};
export default CoomingList;
