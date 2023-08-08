// import Icon from "@mdi/react";
import { Card } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiHomeOutline, mdiViewDashboardOutline, mdiBookshelf } from "@mdi/js";

const StatRightCenterIcon = (props) => {
  const {
    title,
    value,
    iconName,
    iconColorVariant,
    classValue,
    isDatabase,
    isCustom,
    classNameTitle,
    classNameValue,
    classNameIcon,
    colorName,
  } = props;

  return (
    <>
      {isCustom ? (
        <div className={`${classValue} d-flex align-items-center`}>
          <div
            className={`icon-shape icon-md bg-light-${colorName} text-dark-${colorName} rounded-circle`}
          >
            <Icon
              path={iconName}
              className={`nav-icon ${classNameIcon}`}
              size={0.8}
            />
          </div>
          <div className="mt-2 d-flex justify-content-between align-items-center ms-3">
            <div className="lh-1">
              <h4 className={classNameTitle}>{title}</h4>
              <p className={classNameValue}>{value}</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          {isDatabase ? (
            <div className={`${classValue} px-5 py-1`}>
              <div className="mt-2 d-flex justify-content-between align-items-center">
                <div className="lh-1">
                  <div className="d-flex justify-content-between align-items-center">
                    <h4 className="h1 fs-2 fw-bold mb-1">{title}</h4>
                    <div>
                      <span
                        className={`bg-light-${iconColorVariant} icon-shape icon-md rounded-3 text-dark-${iconColorVariant}`}
                      >
                        <Icon path={iconName} size={1} />
                      </span>
                    </div>
                  </div>
                  <p className=" text-kinda-light-dark h6">{value}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className={`${classValue}`}>
              <div className="mt-2 d-flex justify-content-between align-items-center">
                <div className="lh-1">
                  <h4
                    className={`${
                      classNameTitle ? classNameTitle : "h4"
                    } fw-bold mb-0`}
                  >
                    {title}
                  </h4>
                  <p>{value}</p>
                </div>
                <div>
                  <span
                    className={`bg-light-${iconColorVariant} icon-shape icon-md rounded-3 text-dark-${iconColorVariant}`}
                  >
                    <Icon path={iconName} size={0.8} />
                  </span>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default StatRightCenterIcon;
