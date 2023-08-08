import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Tree from "react-d3-tree";
import NodeLabel from "./NodeLabel";
import * as d3 from "d3";
import axios from "axios";

const DetailOrganizationTree = ({
  selectedUid,
  arrGeneralData,
  setFetchOnClickData,
  setIsClickTree,
  isClickTree,
  fetchOnClickData,
}) => {
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [dataChild, setDataChild] = useState([]);

  const [doesntHaveTeam, setDoesntHaveTeam] = useState(false);

  const test = {
    shape: "rect",
    shapeProps: {
      width: 0,
      height: 0,
      x: -20,
      y: 20,
      stroke: "#2F80ED",
    },
  };

  const LinkVerticalCustomHeight = ({
    orientation,
    source,
    target,
    ...restProps
  }) => {
    const link = d3.linkVertical()({ source, target });
    link.y = link.y + 30 * (source.depth + 1); // Increase y by 30 pixels per depth level
    return <path d={link} {...restProps} />;
  };

  const fetchDataChild = async () => {
    let newUid = isClickTree ? fetchOnClickData : selectedUid;
    try {
      await axios
        .post(
          "/team/list-my-team",
          {
            UID: newUid,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => setDataChild(res?.data?.data));
    } catch (e) {
      return e;
    }
  };

  useEffect(() => {
    fetchDataChild();
    // eslint-disable-next-line
  }, [selectedUid, fetchOnClickData, isClickTree]);

  const newData = [
    {
      name: arrGeneralData?.map((data) => data.name),
      level: arrGeneralData?.map((data) => data.level),
      nik: arrGeneralData?.map((data) => data.nik),
      job_title: arrGeneralData?.map((data) => data.job_title),
      children: dataChild,

      photo: arrGeneralData?.map((data) => data.photo),
    },
  ];

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
  }, []);

  const handleFetchNewData = (e) => {
    if (doesntHaveTeam === true) {
      setIsClickTree(true);
      setFetchOnClickData(e?.uid);
    }
  };

  return (
    <Card className=" border-0 h-100">
      <Card.Header className="border-bottom px-4 py-3">
        <p className="mb-0 h5">Details Organisation Tree</p>
        <p className="h6 text-gray-700 mb-0">
          Here is the organisation tree based on subordinate this employee
        </p>
      </Card.Header>
      <Card.Body className="d-flex flex-column justify-content-around p-0 height-org-tree p-3">
        <div className="App-Tree h-100 w-100">
          <div id="treeWrapper" className="h-100 w-100">
            <Tree
              data={newData}
              // nodeSvgShape={svgSquare}
              nodeSvgShape={test}
              pathFunc="step"
              separation={{ siblings: 2, nonSiblings: 2 }}
              orientation="vertical"
              translate={{ x: 450, y: 100 }}
              allowForeignObjects={true}
              nodeLabelComponent={{
                render: (
                  <NodeLabel
                    className="myLabelComponentInSvg p-3"
                    setDoesntHaveTeam={setDoesntHaveTeam}
                  />
                ),
                foreignObjectWrapper: {
                  width: 220,
                  height: 300,
                  y: -30,
                  x: -100,
                },
              }}
              initialDepth={0.03}
              linkComponent={LinkVerticalCustomHeight}
              nodeSize={{ x: 220, y: 270 }}
              onClick={(e) => handleFetchNewData(e, true)}
            />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default DetailOrganizationTree;
