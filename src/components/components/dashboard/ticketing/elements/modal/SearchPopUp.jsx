import React from "react";

const SearchPopUp = ({ search, data, setSelectedValue }) => {
  const newArr = data?.filter((data) =>
    data?.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="position-absolute wrapper-search">
      {newArr?.slice(0, 10)?.map((data, id) => (
        <div
          key={id}
          className="search-items"
          role="button"
          value={data?.name}
          onClick={() => setSelectedValue(data)}
        >
          <p>
            ({data?.nik}) {data?.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SearchPopUp;
