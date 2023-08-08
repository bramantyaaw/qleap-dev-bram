import React from "react";
import Icon from "@mdi/react";
import {
  mdiArrowLeftCircle as LeftArrow,
  mdiArrowRightCircle as RightArrow,
} from "@mdi/js";

const IconPrev = ({ className, disable }) => {
  return (
    <>
      {disable ? (
        <div
          className={`${className} text-light-white icon-wrapper-course-disable`}
        >
          <Icon path={RightArrow} size={1.5} />
        </div>
      ) : (
        <div className={`${className} text-primary icon-wrapper-course`}>
          <Icon role="button" path={RightArrow} size={1.5} />
        </div>
      )}
    </>
  );
};

export default IconPrev;
