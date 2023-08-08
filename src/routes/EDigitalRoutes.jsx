import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import {
  mdiToolboxOutline,
  mdiViewGridPlusOutline,
  mdiViewGridOutline,
  mdiAccountGroupOutline,
  mdiViewDashboardVariantOutline,
  mdiAccountArrowUpOutline,
} from "@mdi/js";
import Icon from "@mdi/react";

export const EDigitalData = () => {
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [uid, setUid] = useState(localStorage.getItem("uid"));

  const [totalBadge, setTotalBadge] = useState(0);

  const fetchPermissionsList = async () => {
    try {
      await axios
        .post(
          "/main-desk/get-data",
          {
            uid: uid,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          if (res?.status === 200) {
            const newData = res?.data?.data?.total_badge;
            setTotalBadge(newData);
          } else {
            return res;
          }
        });
    } catch (e) {
      return e;
    }
  };

  useEffect(() => {
    setUid(localStorage.getItem("uid"));
    setToken(localStorage.getItem("access_token"));
  }, [localStorage]);

  useEffect(() => {
    fetchPermissionsList();
  }, []);

  return totalBadge;
};

export const EdigitalMenu = [
  {
    id: uuid(),
    title: "Function",
    grouptitle: true,
  },
  {
    id: uuid(),
    title: "Main Desk",
    icon: (
      <Icon
        path={mdiViewGridPlusOutline}
        className="nav-icon me-2"
        size={0.8}
      />
    ),
    badge: EDigitalData(),
    badgecolor: "success",
    // <LogOut className="nav-icon me-2" />,

    link: "/main-desk",
  },
  {
    id: uuid(),
    title: "Roles & Responsibility",
    icon: (
      // "edit-3",
      // <FilePlus className="nav-icon me-2" />,
      <Icon path={mdiToolboxOutline} className="nav-icon me-2" size={0.8} />
    ),
    link: "#",
  },
  {
    id: uuid(),
    title: "Dashboard",
    icon: (
      <Icon path={mdiViewGridOutline} className="nav-icon me-2" size={0.8} />
    ),
    // <FilePlus className="nav-icon me-2" />,
    link: "#",
  },
  {
    id: uuid(),
    title: "Team ",
    grouptitle: true,
  },
  {
    id: uuid(),
    title: "My Team",
    icon: (
      <Icon
        path={mdiAccountGroupOutline}
        className="nav-icon me-2"
        size={0.8}
      />
    ),
    // <CheckSquare className="nav-icon me-2" />,

    link: "/myteam",
  },
  {
    id: uuid(),
    title: "Analytic",
    grouptitle: true,
  },
  {
    id: uuid(),
    title: "Managerial",
    icon: (
      <Icon
        path={mdiViewDashboardVariantOutline}
        className="nav-icon me-2"
        size={0.8}
      />
    ),
    // <CheckSquare className="nav-icon me-2" />,
    link: "https://development.erajaya.com/qleap/edigital/managerial",
  },
  {
    id: uuid(),
    title: "Talent Dashboard ",
    icon: (
      <Icon
        path={mdiAccountArrowUpOutline}
        className="nav-icon me-2"
        size={0.8}
      />
    ),
    // <CheckSquare className="nav-icon me-2" />,
    link: "/talent-dashboard",
  },
];
