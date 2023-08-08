import React from "react";
import { SlArrowRight as ArrowIcon } from "react-icons/sl";
import { Link } from "react-router-dom";

const TicketPage = ({
  text1,
  text2,
  text3,
  text4,
  link1,
  link2,
  link3,
  reverse,
  onClick,
  className,
}) => {
  return (
    <>
      {reverse ? (
        <div className="d-flex align-items-center nav-menu ms-3 ms-sm-0 my-3">
          <p to={text4} className="ft-grey">
            {text4}
          </p>
          <ArrowIcon className="mx-2 text-primary" size={12} />
          <Link to={link1} onClick={onClick} className="ft-color">
            {text1}
          </Link>
          {text2 && (
            <>
              <ArrowIcon className="mx-2 text-primary" size={12} />
              <Link to={link2} className="ft-color">
                {text2}
              </Link>
            </>
          )}

          {text3 && (
            <>
              <ArrowIcon className="mx-2 text-primary" size={12} />
              <Link to={link3} className="ft-color">
                {text3}
              </Link>
            </>
          )}
        </div>
      ) : (
        <div
          className={
            className
              ? `${className} d-flex align-items-center nav-menu`
              : `d-flex align-items-center nav-menu ms-3 ms-sm-0 my-3 `
          }
        >
          <Link to={link1} onClick={onClick} className="ft-color">
            {text1}
          </Link>
          <ArrowIcon className="mx-2" size={12} />
          {text2 && (
            <>
              <Link to={link2} className="ft-color">
                {text2}
              </Link>
              <ArrowIcon className="mx-2" size={12} />
            </>
          )}

          {text3 && (
            <>
              <Link to={link3} className="ft-color">
                {text3}
              </Link>
              <ArrowIcon className="mx-2" size={12} />
            </>
          )}
          <p to={text4} className="ft-grey">
            {text4}
          </p>
        </div>
      )}
    </>
  );
};

export default TicketPage;
