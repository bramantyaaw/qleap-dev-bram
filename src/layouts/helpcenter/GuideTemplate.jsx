import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import HeaderBreadcrumb from "../../components/components/marketing/pages/help-center/HeaderBreadcrumb";
import HelpCenterLayout from "./HelpCenterLayout";
//import {postData} from "../../routes/Fetch"

const GuideTemplate = (props) => {
  const location = useLocation();

  const title = [
    {
      link: "/help/guide",
      title: "Guides & Resources",
      description:
        "If you experience confusion in using the programs in qleap. See guides for using each program",
    },
    {
      link: "/help/faq",
      title: "Frequently Asked Question",
      description:
        "FAQ, short for frequently asked questions, is a list of commonly asked questions and answers about a specific topic.",
    },
    {
      link: "/help/memo-internal",
      title: "Memo Internal",
      description:
        "To view company announcements regarding policies issued by management",
    },
    {
      link: "/help/policy-corner",
      title: "Policy Corner",
      description:
        "To see company regulations that you must know in order to create a positive work environment",
    },
    {
      link: "/help/competency-corner",
      title: "Competency Corner",
      description:
        "Kembangkan potensi sesuai kompetensi, pelajari tentang kompetensi perusahaan disini.",
    },
  ];

  const breadcrumb = [
    {
      page: "Self Service",
      link: "/self-service",
    },
    {
      page: "Help Center",
      link: "/help",
    },
    {
      page: "Guides & Resources",
      link: "/help/guide",
    },
  ];

  const titleName = title?.map((value) => {
    if (value?.link.toString() === location.pathname.toString()) {
      if (value.link !== "/help/guide") {
        breadcrumb.push({ page: value.title, link: value.link });
      } else {
        breadcrumb[2].link = "#";
      }
      return value.title;
    }
  });

  const titleDescription = title?.map((value) => {
    if (value?.link.toString() === location.pathname.toString()) {
      if (value.description !== undefined) {
        return value.description;
      }
    }
  });

  return (
    <HelpCenterLayout>
      <Fragment>
        <div className="bg-wrapper">
          <HeaderBreadcrumb
            title={titleName}
            breadcrumb={breadcrumb}
            desc={titleDescription}
          />
          {props.children}
        </div>
      </Fragment>
    </HelpCenterLayout>
  );
};
export default GuideTemplate;
