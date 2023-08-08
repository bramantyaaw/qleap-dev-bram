import React from "react";
import { Dropdown } from "react-bootstrap";

const SortByStatus = ({
  selectedItem,
  setSelectedItem,
  title,
  className,
  dataArrSort,
}) => {
  return (
    <Dropdown className={`dropdown-sortby ${className}`}>
      {selectedItem === "" ? (
        <Dropdown.Toggle id="dropdown-basic">{title}</Dropdown.Toggle>
      ) : (
        <Dropdown.Toggle id="dropdown-basic">{selectedItem}</Dropdown.Toggle>
      )}
      <Dropdown.Menu>
        {dataArrSort?.map((data, id) => (
          <Dropdown.Item key={id} onClick={() => setSelectedItem(data)}>
            {data}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SortByStatus;
