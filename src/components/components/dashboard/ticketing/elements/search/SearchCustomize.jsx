import React from "react";
import { Form } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiMagnify as SearchIcon } from "@mdi/js";

const SearchInput = ({ setSearch }) => {
  return (
    <Form className="position-relative">
      <Icon
        path={SearchIcon}
        size={1}
        className="position-absolute custom-absolute-search text-kinda-grey"
      />
      <Form.Control
        type="search"
        placeholder="Search Name/NIK Here"
        // onChange={(e) => console.log(e)}
        className="h-25 border-light-white ps-5"
        // onKeyDown={(e) => console.log(e)}
      />
    </Form>
  );
};

export default SearchInput;
