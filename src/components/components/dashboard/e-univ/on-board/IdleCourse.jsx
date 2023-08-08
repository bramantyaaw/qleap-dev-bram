import React from "react";
import { Image } from "react-bootstrap";
import IdleIcon from "../../../../../assets/images/svg/e-univ-course.svg";

const IdleCourse = ({
  texth1,
  textp,
  classNameh1,
  classNamep,
  classNameImg,
  classNameh3,
  texth3,
}) => {
  return (
    <>
      <Image src={IdleIcon} className={`mb-5 ${classNameImg}`} fluid />
      {texth1 ? (
        <>
          <h1 className={`text-kinda-light-dark text-center ${classNameh1}`}>
            {texth1}
          </h1>
          <p className={`text-center text-darkest ${classNamep}`}>{textp}</p>
        </>
      ) : texth3 ? (
        <>
          <h3 className={`text-kinda-light-dark text-center ${classNameh3}`}>
            {texth3}
          </h3>
        </>
      ) : (
        <>
          <h1 className="text-kinda-light-dark text-center">
            Select Learning Module
          </h1>
          <p className="text-center text-darkest">
            Mohon pilih salah satu materi di Menu samping untuk melihat materi
            yang kamu ingin pelajari
          </p>
        </>
      )}
    </>
  );
};

export default IdleCourse;
