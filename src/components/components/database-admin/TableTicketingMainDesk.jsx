import React from "react";

const TableTicketingMainDesk = () => {
  return (
    <>
      <div className="table-responsive border-0 overflow-y-hidden">
        <Table {...getTableProps()} className="text-nowrap">
          <thead className="table-dark">
            {headerGroups?.map((headerGroup) => (
              <tr {...headerGroup?.getHeaderGroupProps()}>
                {headerGroup?.headers?.map((column) => (
                  <th {...column?.getHeaderProps()}>
                    {column?.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page?.map((row) => {
              prepareRow(row);
              return (
                <tr {...row?.getRowProps()}>
                  {row?.cells?.map((cell) => {
                    return (
                      <td {...cell?.getCellProps()}>{cell?.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
          {!approval_data && (
            <tbody>
              <tr>
                <td className="fst-italic" colSpan={columns.length}>
                  No records available
                </td>
              </tr>
            </tbody>
          )}
        </Table>
      </div>

      {/* Pagination @ Footer */}
      <Pagination
        previousPage={previousPage}
        pageCount={pageCount}
        pageIndex={pageIndex}
        gotoPage={gotoPage}
        nextPage={nextPage}
      />
    </>
  );
};

export default TableTicketingMainDesk;
