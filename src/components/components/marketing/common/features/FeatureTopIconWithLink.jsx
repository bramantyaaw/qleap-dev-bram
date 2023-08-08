/**
 * Section : Features
 * Style : Features with top icon and link to redirect
 * Added in	: v1.3.0
 *
 * Availalble Parameters
 *
 * item.icon		: 	Feather icon name
 * item.title		: 	Title of feature
 * item.link		: 	Link/url that for redirection
 * item.description	: 	Description of feature
 * item.linkname	:	linkname at footer that will be redirected to the link parameter
 * isCard			:	Optional - default false, use this parameter if you want to wrap with card.
 * isButton			:	Optional - default false, use this parameter if you want to show buttion as link, default it will show as hyperlink.
 * buttonVariant	:	Optional - default primary, it's useful if button paramenter has been used, possible value like, secondary, outline-success etc...
 *
 */

// import node module libraries
import PropTypes from "prop-types";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

// import MDI icons
import Icon from "@mdi/react";
import { mdiArrowRight } from "@mdi/js";

const FeatureTopIconWithLink = ({
  item,
  isCard,
  isButton,
  buttonVariant,
  className,
  isHeader,
  isMuted,
  isHome,
}) => {
  let desc = item?.description;
  let separateDesc = desc?.replace(/([A-Z])/g, " $1")?.trim();
  let capitalizeDesc =
    separateDesc?.charAt(0).toUpperCase() + separateDesc?.slice(1);

  let title = item?.description;
  let separateTitle = title?.replace(/([A-Z])/g, " $1")?.trim();
  let capitalizeTitle =
    separateTitle?.charAt(0).toUpperCase() + separateTitle?.slice(1);

  return (
    <Fragment>
      {isHome ? (
        isCard ? (
          <Card className="border mb-md-0 mb-4">
            <Card.Body>
              {/*  icon */}
              <div className="mb-4">
                <img
                  src={item.icon}
                  width={40}
                  height={40}
                  className="text-primary float-left"
                  alt="pic"
                />
              </div>

              {/* heading  */}
              <h3 className="fw-semi-bold text-left mt-7">
                <Link to={item.link} className="text-inherit black-font">
                  {capitalizeTitle}
                </Link>
              </h3>

              {/*  text */}
              <p>{capitalizeDesc}</p>

              {/* link or button */}
              {isButton ? (
                <Link
                  to={item.link}
                  className={`btn btn-${buttonVariant} btn-sm`}
                >
                  {item.linkname}
                </Link>
              ) : (
                <Link
                  to={item.link}
                  className="link-primary black-font fw-semi-bold"
                >
                  {item.linkname}
                  <Icon
                    path={mdiArrowRight}
                    className="text-primary ms-1"
                    size={0.6}
                  />
                </Link>
              )}
            </Card.Body>
          </Card>
        ) : isHeader ? (
          <Card className={`card-hover border ${className}`}>
            <div className="d-flex justify-content-between align-items-center p-4">
              <div className="d-flex">
                <Link to={item.link}>
                  <img src={item.icon} alt="" className="avatar-md" />
                </Link>
                <div className="ms-3">
                  <h4 className="mb-1 text-left">
                    <Link to={item.link} className="text-inherit">
                      {capitalizeTitle}
                    </Link>
                  </h4>
                  <p className="text-left mb-0 fs-6">{capitalizeDesc}</p>
                </div>
              </div>
            </div>
          </Card>
        ) : (
          <div className={`border-bottom-md-0 mb-3 mb-lg-0 ${className}`}>
            <div className="p-5">
              {/*  icon */}
              <div className="mb-4">
                <img
                  src={item.icon}
                  width={40}
                  height={40}
                  className="text-primary float-left"
                  alt="pic"
                />
              </div>

              {/* heading  */}
              <h3 className="fw-semi-bold text-left mt-7">
                <Link
                  to={item.link}
                  className="text-inherit black-font disabled"
                  style={{ textDecoration: "none" }}
                >
                  {capitalizeTitle}
                </Link>
              </h3>

              {/*  text */}
              <p className="text-left mt-4">{capitalizeDesc}</p>

              {/* link or button */}
              {isButton ? (
                <Link
                  to={item.link}
                  className={`btn btn-${buttonVariant} btn-sm float-left mb-3`}
                >
                  {item.linkname}
                </Link>
              ) : (
                <Link
                  to={item.link}
                  className="link-primary fw-semi-bold float-left mb-3"
                >
                  {item.linkname}
                  <Icon
                    path={mdiArrowRight}
                    className="text-primary ms-1"
                    size={0.6}
                  />
                </Link>
              )}
            </div>
          </div>
        )
      ) : isCard ? (
        <Card className="border mb-md-0 mb-4">
          <Card.Body>
            {/*  icon */}
            <div className="mb-4">
              <img
                src={item.icon}
                width={40}
                height={40}
                className="text-primary float-left"
                alt="pic"
              />
            </div>

            {/* heading  */}
            <h3 className="fw-semi-bold text-left mt-7">
              <Link to={item.link} className="text-inherit black-font">
                {item.title}
              </Link>
            </h3>

            {/*  text */}
            <p>{item.description}</p>

            {/* link or button */}
            {isButton ? (
              <Link
                to={item.link}
                className={`btn btn-${buttonVariant} btn-sm`}
              >
                {item.linkname}
              </Link>
            ) : (
              <Link
                to={item.link}
                className="link-primary black-font fw-semi-bold"
              >
                {item.linkname}
                <Icon
                  path={mdiArrowRight}
                  className="text-primary ms-1"
                  size={0.6}
                />
              </Link>
            )}
          </Card.Body>
        </Card>
      ) : isHeader ? (
        <Card className={`card-hover border ${className}`}>
          <div className="d-flex justify-content-between align-items-center p-4">
            <div className="d-flex">
              <Link to={item.link}>
                <img src={item.icon} alt="" className="avatar-md" />
              </Link>
              <div className="ms-3">
                <h4 className="mb-1 text-left">
                  <Link
                    to={item.link}
                    className="text-inherit"
                    style={{ fontWeight: "600" }}
                  >
                    {item.title}
                  </Link>
                </h4>
                <p className="text-left mb-0 fs-6">{item.description}</p>
              </div>
            </div>
          </div>
        </Card>
      ) : (
        <div className={`border-bottom-md-0 mb-3 mb-lg-0  ${className}`}>
          <div className="p-5">
            {/*  icon */}
            <div className="mb-4">
              <img
                src={item.icon}
                width={40}
                height={40}
                className="text-primary float-left"
                alt="pic"
              />
            </div>

            {/* heading  */}
            <h3 className="fw-semi-bold text-left mt-7">
              <Link
                to={item.link}
                className="text-inherit black-font disabled"
                style={{ textDecoration: "none" }}
              >
                {item.title}
              </Link>
            </h3>

            {/*  text */}
            <p className="text-left mt-4">{item.description}</p>

            {/* link or button */}
            {isButton ? (
              <Link
                to={item.link}
                className={`btn btn-${buttonVariant} btn-sm float-left mb-3`}
              >
                {item.linkname}
              </Link>
            ) : (
              <Link
                to={item.link}
                className="link-primary fw-semi-bold float-left mb-3"
              >
                {item.linkname}
                <Icon
                  path={mdiArrowRight}
                  className="text-primary ms-1"
                  size={0.6}
                />
              </Link>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};

FeatureTopIconWithLink.propTypes = {
  item: PropTypes.object.isRequired,
  isCard: PropTypes.bool,
  isButton: PropTypes.bool,
  className: PropTypes.string,
  buttonVariant: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "light",
    "dark",
    "outline-primary",
    "outline-secondary",
    "outline-success",
    "outline-danger",
    "outline-warning",
    "outline-info",
    "outline-light",
    "outline-dark",
  ]),
};

FeatureTopIconWithLink.defaultProps = {
  isCard: false,
  isButton: false,
  buttonVariant: "primary",
  className: "",
};

export default FeatureTopIconWithLink;
