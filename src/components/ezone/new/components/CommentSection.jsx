import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import FillInput from "../../../components/dashboard/ticketing/elements/input/FillInput";
import { Fragment } from "react";
import axios from "axios";
import LoadingComponent from "../../../components/elements/loading/LoadingComponent";
const CommentSection = ({
  data,
  token,
  userData,
  uid,
  setUserHasComment,
  setLoading,
  loading,
  totalPage,
  setPage,
  page,
  setArrPeopleComment,
  pageFromFetch,
}) => {
  const [photoProfile, setPhotoProfile] = useState(
    localStorage.getItem("photo")
  );
  const [inputComment, setInputComment] = useState("");
  const [isEnter, setIsEnter] = useState(false);

  const handleOnKeyDown = (event) => {
    if (event.key === "Enter") {
      (async () => {
        await setUserHasComment(false);
        await setIsEnter(true);
      })();
    }
  };

  useEffect(() => {
    const handlePostComment = async () => {
      const id = parseInt(userData?.status_id);
      try {
        setLoading(true);
        await axios
          .post(
            "/ezone/submit-comment",
            {
              statusId: id,
              commentText: inputComment,
              postingBy: uid,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then((res) => {
            setLoading(false);
            if (res?.status === 200) {
              (async () => {
                await setArrPeopleComment([]);
                await setPage(1);
                await setUserHasComment(true);

                await setIsEnter(false);
                await setInputComment("");
              })();
            }
          });
      } catch (err) {
        return err;
      }
    };
    isEnter === true && inputComment !== "" && handlePostComment();
    // eslint-disable-next-line
  }, [isEnter]);

  useEffect(() => {
    setPhotoProfile(localStorage.getItem("photo"));
    // eslint-disable-next-line
  }, [localStorage]);

  const PeopleComment = () => {
    return (
      <Fragment>
        {data?.map((data, id) => {
          return (
            <div className="d-flex mt-3" key={id}>
              <div
                className="avatar avatar-md rounded-circle me-2"
                style={{ border: "1px solid #FFFFFF" }}
              >
                <Image alt="" src={data?.photo} className="rounded-circle" />
              </div>

              <div
                className="bg-gray-200 w-100 p-3"
                style={{
                  borderTopLeftRadius: "0px",
                  borderTopRightRadius: "5px",
                  borderBottomRightRadius: "5px",
                  borderBottomLeftRadius: "5px",
                }}
              >
                <div className="d-flex flex-row justify-content-between w-100">
                  <p className="text-grey-ezone">{data?.name}</p>
                  <p className="text-grey-ezone">{data?.commentDate}</p>
                </div>
                <p className=" text-navy-ezone mb-0">{data?.commentText}</p>
              </div>
            </div>
          );
        })}
        {pageFromFetch !== 0 && totalPage !== pageFromFetch && (
          <p
            className="mb-0 text-center font-xsss mt-3"
            role="button"
            onClick={async () => {
              await setUserHasComment(false);
              await setPage(page + 1);
            }}
          >
            See more comments
          </p>
        )}
      </Fragment>
    );
  };

  return (
    <div className="mt-3">
      <div className="d-flex">
        <div
          className="avatar avatar-md rounded-circle me-2"
          style={{ border: "1px solid #FFFFFF" }}
        >
          <Image alt="" src={photoProfile} className="rounded-circle" />
        </div>
        <FillInput
          placeholder="Add comment..."
          value={inputComment}
          setState={setInputComment}
          withOutInputClassName
          handleOnKeyDown={handleOnKeyDown}
          className="input-outline-none rounded-3 py-2 bg-gray-200 shadow-none"
        />
      </div>
      <div className="mt-3">
        <PeopleComment />
      </div>
      {loading && <LoadingComponent className="mt-3" />}
    </div>
  );
};

export default CommentSection;
