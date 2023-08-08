import React, { Fragment } from "react";
import { useMediaQuery } from "react-responsive";
import Icon from "@mdi/react";
import {
  mdiWeb as YourPostIcon,
  mdiNewspaperVariantMultiple as NewsIcon,
  mdiAccountGroup as CommunityIcon,
  mdiBookOpenPageVariantOutline as ILeadIcon,
} from "@mdi/js";
import LeftNavCustom from "../Header/LeftNavCustom";
import NewEzoneLayout from "../Header/NewEzoneLayout";

const RightSideEzoneComponent = ({ children }) => {
  const isLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  const isTab = useMediaQuery({
    query: "(min-width: 992px)",
  });

  const navLeftCustom = [
    {
      link: "/ezone",
      title: "Kata Qleap",
      icon: <Icon path={YourPostIcon} size={1} />,
    },
    {
      link: "/ezone/news",
      title: "ILEAD News",
      icon: <Icon path={NewsIcon} size={1} />,
    },
    {
      link: "/ezone/community",
      title: "Erajaya Communities",
      icon: <Icon path={CommunityIcon} size={1} />,
    },
    {
      link: "/ezone/ilead/diagnostic",
      title: "ILEAD Zone",
      icon: <Icon path={ILeadIcon} size={1} />,
    },
  ];

  return (
    <div className="">
      <Fragment>
        {/* <HeaderEzone /> */}

        <NewEzoneLayout>
          {isTab && <LeftNavCustom navLeftCustom={navLeftCustom} />}
          <div
            style={{
              paddingTop: isLaptop ? "60px" : "10px",
              minHeight: "100vh",
            }}
            className="main-content right-chat-active "
          >
            <div className="middle-sidebar-bottom">
              <div className="middle-sidebar-left pe-0 pe-md-2">
                <div className={`${isTab && "row"} feed-body mx-0`}>
                  {children}
                </div>
              </div>
            </div>
          </div>
        </NewEzoneLayout>
      </Fragment>
    </div>
  );
};

export default RightSideEzoneComponent;
