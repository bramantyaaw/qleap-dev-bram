import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import PostView from "../../../components/ezone/new/Home/PostView";
import BannerEzone from "../../../components/ezone/new/Home/customize/BannerEzone";
import DivisionMoment from "../../../components/ezone/new/Home/customize/DivisionMoment";
import ErajayaNews from "../../../components/ezone/new/Home/customize/ErajayaNews";
import RightSideEzoneComponent from "../../../components/ezone/new/components/RightSideEzoneComponent";
import CarouselPart from "../../home/CarouselPart";
import ImgCarouselDummy from "../../../assets/ezone/images/home-banner/internal-memo-web-banner.jpg";
import ImgCarouselSecDummy from "../../../assets/ezone/images/home-banner/Email-Phising-web-banner.jpg";
// import ImgCarouselThridDummy from "../../../assets/ezone/images/png/dummy-third-banner-img.png";

import EmployeeCreatePost from "../../../components/ezone/new/Home/EmployeeCreatePost";
import LoadingComponent from "../../../components/components/elements/loading/LoadingComponent";
import { useRef } from "react";

const HomeEzone = () => {
  const [uid, setUid] = useState(localStorage.getItem("uid"));
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [contentHomepage, setContentHomepage] = useState([]);
  const [pinnedContent, setPinnedContent] = useState([]);
  const [page, setPage] = useState(1);
  const [prevY, setPrevY] = useState(0);

  const [modalLoading, setModalLoading] = useState(false);
  const [dummyLoading, setDummyLoading] = useState(false);

  let postRef = useRef({});
  let loadingRef = useRef(null);
  let prevYRef = useRef({});
  let pageRef = useRef({});
  postRef.current = contentHomepage;
  pageRef.current = page;
  prevYRef.current = prevY;

  const fetchPost = async (value) => {
    try {
      setModalLoading(true);

      await axios
        .post(
          `/ezone/get-post`,
          {
            type: "intern",
            page: value ? value : pageRef.current,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((data) => {
          setModalLoading(false);

          if (data?.status === 200) {
            setPinnedContent(data?.data?.data?.pinned);
            const newPost = data?.data?.data?.post;
            setContentHomepage([...postRef?.current, ...newPost]);
          }
        });
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    setPage(pageRef.current + 1);

    let options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const handleObserver = (entities) => {
      const y = entities[0].boundingClientRect.y;

      if (prevYRef.current > y) {
        if (pageRef?.current % 3 === 0) {
          setDummyLoading(true);
          setTimeout(() => {
            fetchPost();
            setPage(pageRef?.current + 1);
            setDummyLoading(false);
          }, 10000);
        } else {
          fetchPost();
          setPage(pageRef?.current + 1);
        }
      }
      setPrevY(y);
    };

    const observer = new IntersectionObserver(handleObserver, options);
    observer.observe(loadingRef.current);
    fetchPost(1);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setUid(localStorage.getItem("uid"));
    setToken(localStorage.getItem("access_token"));
    // eslint-disable-next-line
  }, [localStorage]);

  const arrCustom = [
    {
      url_banner: ImgCarouselDummy,
    },
    {
      url_banner: ImgCarouselSecDummy,
    },
    // {
    //   url_banner: ImgCarouselThridDummy,
    //   caption:
    //     "Kolaborasi Erajaya X LinkedIn Learning siap untuk memfasilitasi karyawan dalam mendukung proses belajar yang lebih fleksible dengan jutaan refrensi modul yang bisa diakses secara gratis khusus karyawan Erajaya.",
    // },
  ];

  return (
    <div>
      <Fragment>
        <RightSideEzoneComponent>
          <div className="col-xl-8 col-xxl-9 col-lg-8">
            <CarouselPart
              isCustom={true}
              arrCustom={arrCustom}
              className="mb-3 "
              style={{ borderRadius: "15px", height: "237px" }}
            />
            {/* <Createpost /> */}
            <EmployeeCreatePost uid={uid} token={token} />
            {pinnedContent?.map((data, id) => {
              const arrSplit =
                data?.type_attachment === "video" &&
                data?.link_attachment?.split("watch?v==");

              const idYoutube = arrSplit ? arrSplit[1] : "";

              return (
                <div key={id}>
                  <PostView
                    employeeUid={data?.uid}
                    data={data}
                    typepost={data?.type_attachment}
                    id={data?.status_id}
                    attacement={data?.link_attachment}
                    avatar={data?.photo}
                    user={data?.name}
                    time={data?.posting_date}
                    des={data?.posting}
                    token={token}
                    uid={uid}
                    linkVideo={idYoutube}
                    pinned
                  />
                </div>
              );
            })}
            <div>
              {contentHomepage?.map((data, id) => {
                const arrSplit =
                  data?.type_attachment === "video" &&
                  data?.link_attachment?.split("watch?v==");

                const idYoutube = arrSplit ? arrSplit[1] : "";

                return (
                  <div key={id}>
                    <PostView
                      employeeUid={data?.uid}
                      data={data}
                      typepost={data?.type_attachment}
                      id={data?.status_id}
                      attacement={data?.link_attachment}
                      avatar={data?.photo}
                      user={data?.name}
                      time={data?.posting_date}
                      des={data?.posting}
                      token={token}
                      uid={uid}
                      linkVideo={idYoutube}
                    />
                  </div>
                );
              })}
            </div>

            {loadingRef && (
              <div className="new-data-is-coming mb-4" ref={loadingRef}>
                {modalLoading && <LoadingComponent />}
              </div>
            )}
            {dummyLoading && <LoadingComponent />}
          </div>
          <div className="col-xl-4 col-xxl-3 col-lg-4 ps-lg-0">
            <BannerEzone />
            <DivisionMoment
              token={token}
              setModalLoading={setModalLoading}
              uid={uid}
            />
            <ErajayaNews token={token} />
            {/* <Friends />
                  <Contacts />
                  <Group />
                  <Events />
                  <ProfilePhoto /> */}
          </div>
          {/* {!isLaptop && <Footer />} */}
        </RightSideEzoneComponent>
        {/* <Popupchat /> */}
        {/* <AppFooter /> */}
        {/* <Footer /> */}
      </Fragment>
    </div>
  );
};

export default HomeEzone;
