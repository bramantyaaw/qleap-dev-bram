import React from "react";
import Icon from "@mdi/react";
import {
  mdiWeb as YourPostIcon,
  mdiNewspaperVariantMultiple as NewsIcon,
  mdiAccountGroup as CommunityIcon,
  mdiBookOpenPageVariantOutline as ILeadIcon,
} from "@mdi/js";
import NewNavbar from "../../../../layouts/navbars/NewNavbar";
import logoEzone from "../../../../assets/ezone/images/svg/logo-header-ezone.svg";
import Footer from "../../../../layouts/footers/Footer";

const NewEzoneLayout = ({ withoutTheBottomBar, children }) => {
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
  const navs = [
    { title: "Discover", link: "/ezone" },
    // { title: "Employees", link: "/ezone/story" },
    { title: "Event", link: "/ezone/event" },
    // { title: "Publication", link: "/" },
  ];
  return (
    <>
      <NewNavbar
        navs={navs}
        logoSectionImg={logoEzone}
        logoSize={12}
        isEzone={true}
        navLeftCustom={navLeftCustom}
        withoutTheBottomBar={withoutTheBottomBar}
      />
      {children}
      <Footer />
    </>
  );
};

export default NewEzoneLayout;
