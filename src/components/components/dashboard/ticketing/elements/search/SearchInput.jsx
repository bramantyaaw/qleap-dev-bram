import React from "react";
import { Form } from "react-bootstrap";
import { FiSearch as SearchIcon } from "react-icons/fi";

const SearchInput = ({ setSearch }) => {
  return (
    <Form className="search-form">
      <SearchIcon size={20} color="79758F" />
      <Form.Control
        type="search"
        placeholder="Search"
        onChange={(e) => setSearch(e.target.value)}
      />
    </Form>
  );
};

export default SearchInput;
