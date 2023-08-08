import React from "react";
import DetailOrganizationTree from "./DetailOrganizationTree";

const OrganizationTree = ({
  selectedUid,
  arrGeneralData,
  setFetchOnClickData,
  fetchOnClickData,
  setIsClickTree,

  isClickTree,
}) => {
  return (
    <div>
      <DetailOrganizationTree
        selectedUid={selectedUid}
        arrGeneralData={arrGeneralData}
        setFetchOnClickData={setFetchOnClickData}
        fetchOnClickData={fetchOnClickData}
        setIsClickTree={setIsClickTree}
        isClickTree={isClickTree}
      />
    </div>
  );
};

export default OrganizationTree;
