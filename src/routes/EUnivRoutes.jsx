import { v4 as uuid } from "uuid";
import Icon from "@mdi/react";
import {
  mdiHomeOutline,
  mdiViewDashboardOutline,
  mdiBookshelf,
  mdiSchoolOutline,
} from "@mdi/js";

export const newRoutes = [
  {
    id: uuid(),
    title: "Homepage",
    link: "/learning",
    icon: <Icon path={mdiHomeOutline} className="nav-icon" size={0.8} />,
  },
  {
    id: uuid(),
    title: "Dashboard",
    link: "#",
    icon: (
      <Icon path={mdiViewDashboardOutline} className="nav-icon" size={0.8} />
    ),
  },
  {
    id: uuid(),
    title: "Learning",
    link: "#",
    icon: <Icon path={mdiBookshelf} className="nav-icon" size={0.8} />,
  },
  {
    id: uuid(),
    title: "Development",
    link: "#",
    icon: <Icon path={mdiSchoolOutline} className="nav-icon" size={0.8} />,
  },
];
export const EUnivRoutes = [
  {
    id: uuid(),
    title: "Learning Page",
    link: "/e-univ",
    icon: <Icon path={mdiHomeOutline} className="nav-icon" size={0.8} />,
  },
  {
    id: uuid(),
    title: "Dashboard",
    link: "#",
    icon: (
      <Icon path={mdiViewDashboardOutline} className="nav-icon" size={0.8} />
    ),
  },
  {
    id: uuid(),
    title: "Library",
    link: "#",
    icon: <Icon path={mdiBookshelf} className="nav-icon" size={0.8} />,
  },
];

export const OnBoardRoutes = [
  {
    id: uuid(),
    title: "Learning Page",
    link: "/e-univ",
    icon: <Icon path={mdiHomeOutline} className="nav-icon" size={0.8} />,
  },
  {
    id: uuid(),
    title: "Dashboard",
    link: "#",
    icon: (
      <Icon path={mdiViewDashboardOutline} className="nav-icon" size={0.8} />
    ),
    disabled: true,
  },
  {
    id: uuid(),
    title: "Library",
    link: "#",
    icon: <Icon path={mdiBookshelf} className="nav-icon" size={0.8} />,
    disabled: true,
  },
];
