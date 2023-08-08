import React from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

const EUnivMenu = ({ data }) => {
  return (
    <>
      {data?.map((item, index) => (
        <Nav.Item
          as="li"
          key={index}
          className={`${
            item?.link !== "#" && window.location?.pathname.includes(item?.link)
              ? "active"
              : ""
          }`}
        >
          {item?.disabled ? (
            <span className="navlink-disabled" disabled>
              {typeof item.icon === "string" ? (
                <i className={`fe fe-${item.icon} nav-icon`}></i>
              ) : (
                item.icon
              )}
              {item.title}
            </span>
          ) : (
            <Link className={`nav-link`} to={item.link}>
              {typeof item.icon === "string" ? (
                <i className={`fe fe-${item.icon} nav-icon`}></i>
              ) : (
                item.icon
              )}
              {item.title}
            </Link>
          )}
        </Nav.Item>
      ))}
    </>
  );
};

export default EUnivMenu;
