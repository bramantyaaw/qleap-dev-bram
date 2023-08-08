import React, { useState } from "react";
import { Card, Col, Nav, Row, Tab } from "react-bootstrap";
import SearchInput from "../../../components/components/dashboard/ticketing/elements/search/SearchInput";
import TableProductSold from "./TableProductSold";

const ProductSold = ({ data }) => {
  const [search, setSearch] = useState("");

  return (
    <div className="pb-4">
      <div className="d-flex justify-content-end my-2">
        <SearchInput setSearch={setSearch} />
      </div>

      <TableProductSold arrData={data} searchText={search} />
    </div>
  );
};

export default ProductSold;
