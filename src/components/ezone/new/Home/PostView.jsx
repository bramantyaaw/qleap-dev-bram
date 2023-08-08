import React, { useRef, useState, useEffect } from "react";
import Icon from "@mdi/react";
import {
  mdiCommentOutline as commentIcon,
  mdiPin as pinnedIcon
} from "@mdi/js";
import axios from "axios";
import CommentSection from "../components/CommentSection";
import { getEmployeePhoto } from "../../../../redux/action/profileAction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Avatar from "../../../../assets/images/svg/icon user-01.svg";

const PostView = (props) => {
  const {
    user,
    time,
    des,
    avatar,
    attacement,
    id,
    typepost,
    data,
    token,
    uid,
    linkVideo,
    pinned,
    employeeUid
  } = props;

  const [showFullString, setShowFullString] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const [arrPeopleComment, setArrPeopleComment] = useState([]);
  const [page, setPage] = useState(1);
  const [pageFromFetch, setPageFromFetch] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [userHasComment, setUserHasComment] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { employeePhoto } = useSelector((state) => state.profileReducer);
  const photo = localStorage.getItem("photo");

  const doesEmployeeHaveAPhoto = employeePhoto?.filter(
    (data) => data?.uid === employeeUid
  );

  const toggleStringVisibility = () => {
    setShowFullString(!showFullString);
  };

  const contentRef = useRef(null);
  const currentPost = openComment === false ? [] : arrPeopleComment;

  const handleComment = async () => {
    const id = parseInt(data?.status_id);

    try {
      setLoading(true);
      await axios
        .post(
          "/ezone/get-comment",
          {
            id,
            page
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
        .then((res) => {
          setLoading(false);
          if (res?.status === 200 && res?.data?.data !== null) {
            setPageFromFetch(res?.data?.data?.page);
            setTotalPage(res?.data?.data?.total_page);
            const newData = res?.data?.data?.comment?.sort(
              (a, b) => b?.commentId - a?.commentId
            );

            setArrPeopleComment([...currentPost, ...newData]);
          }
        });
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    const handleFetchPhoto = async () => {
      try {
        await dispatch(getEmployeePhoto(token, employeeUid));
      } catch (err) {
        return err;
      }
    };
    if (
      (doesEmployeeHaveAPhoto?.length === 0 ||
        doesEmployeeHaveAPhoto === undefined) &&
      employeeUid !== uid
    ) {
      handleFetchPhoto();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    openComment === true && pageFromFetch !== totalPage && handleComment();
    userHasComment === true && handleComment();

    // eslint-disable-next-line
  }, [userHasComment, openComment, page]);

  useEffect(() => {
    if (openComment === false && pageFromFetch !== totalPage) {
      setArrPeopleComment([]);
      setPage(1);
    }
    // eslint-disable-next-line
  }, [openComment]);

  return (
    <div
      className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3 position-relative"
      key={id}
      ref={contentRef}
    >
      {pinned && (
        <Icon
          path={pinnedIcon}
          size={1}
          className="position-absolute"
          style={{ top: "20px", right: "20px" }}
        />
      )}

      <div className="card-body p-0 d-flex">
        <figure className="avatar me-3">
          <img
            src={
              employeeUid === uid
                ? photo
                : employeeUid === "ID0076313"
                ? avatar
                : doesEmployeeHaveAPhoto?.length > 0
                ? doesEmployeeHaveAPhoto[0]?.notPhoto === false
                  ? doesEmployeeHaveAPhoto[0]?.photo
                  : Avatar
                : Avatar
            }
            alt="avatar"
            className="shadow-sm rounded-circle w45"
          />
        </figure>
        <h4 className="fw-700 text-grey-900 font-xssss mt-1">
          {user}
          <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
            {time}
          </span>
        </h4>
      </div>
      {typepost === "video" && (
        <div className="card-body p-0 mb-3 rounded-3 overflow-hidden uttam-die">
          <iframe
            src={`https://www.youtube.com/embed/${linkVideo}`}
            title="iframe-modal"
            className=""
            style={{
              borderRadius: "8px",
              width: "100%",
              height: "100%",
              minHeight: "400px"
            }}
          ></iframe>
        </div>
      )}
      <div className="card-body p-0 me-lg-5">
        <div />

        {des?.length < 150 ? (
          <div>
            <div
              dangerouslySetInnerHTML={{ __html: des }}
              className="fw-500 text-grey-500 lh-26 font-xssss w-100 mb-2"
            />
          </div>
        ) : showFullString ? (
          <div>
            <div
              dangerouslySetInnerHTML={{ __html: des }}
              className="fw-500 text-grey-500 lh-26 font-xssss w-100 mb-1"
            />
            <p
              onClick={toggleStringVisibility}
              className="fw-600 text-primary mb-0 font-xssss mb-2"
              role="button"
            >
              See less
            </p>
          </div>
        ) : (
          <div>
            <div
              dangerouslySetInnerHTML={{
                __html: des?.substring(0, 150) + "..."
              }}
              className="fw-500 text-grey-500 lh-26 font-xssss w-100 mb-1"
            />
            <p
              onClick={toggleStringVisibility}
              className="fw-600 text-primary mb-0 font-xssss mb-2"
              role="button"
            >
              See more
            </p>
          </div>
        )}
      </div>
      {(typepost === "image" || data?.files !== null) && (
        <div className="card-body d-block p-0 mb-3">
          <div className="row ps-2 pe-2">
            <div className="col-sm-12 p-1">
              {data?.files !== null ? (
                data?.files?.map((data, id) => {
                  return (
                    <div key={id} className="d-flex justify-content-center">
                      <img
                        src={data?.file}
                        className="rounded-3"
                        alt="post"
                        style={{
                          width: "fitContent",
                          height: "fitContent",
                          maxHeight: "500px",
                          maxWidth: "100%"
                        }}
                      />
                    </div>
                  );
                })
              ) : (
                <img src={attacement} className="rounded-3 w-100" alt="post" />
              )}
            </div>
          </div>
        </div>
      )}
      <div className="card-body d-flex p-0">
        <div
          className="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"
          onClick={() => {
            setOpenComment((state) => !state);
            // setCommentId(id);
          }}
          role="button"
        >
          <Icon
            path={commentIcon}
            size={0.5}
            className="text-dark text-grey-900 font-lg me-1"
          />
          <span className="d-none-xss">
            {data?.count_comment}{" "}
            {data?.count_comment > 1 ? "Comments" : "Comment"}
          </span>
        </div>
      </div>
      {openComment && (
        <CommentSection
          userData={data}
          data={arrPeopleComment}
          token={token}
          openComment={openComment}
          uid={uid}
          setUserHasComment={setUserHasComment}
          loading={loading}
          setLoading={setLoading}
          totalPage={totalPage}
          setPage={setPage}
          page={page}
          setArrPeopleComment={setArrPeopleComment}
          pageFromFetch={pageFromFetch}
          setOpenComment={setOpenComment}
        />
      )}
    </div>
  );
};

export default PostView;
