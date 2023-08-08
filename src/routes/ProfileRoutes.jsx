import { v4 as uuid } from "uuid";
export const ProfileRoutes = [
  {
    id: uuid(),
    title: "My Dashboard",
    link: "/profile",
    icon: "home",
  },
  {
    id: uuid(),
    title: "Basic Profile",
    link: "/basicprofile",
    icon: "user",
  },
  // {
  //   id: uuid(),
  //   title: "R&R",
  //   link: "#",
  //   icon: "settings",
  //   children: [
  //     { id: uuid(), link: "#", name: "Top" },
  //     {
  //       id: uuid(),
  //       link: "#",
  //       name: "Compact",
  //     },
  //     {
  //       id: uuid(),
  //       link: "#",
  //       name: "Vertical",
  //     },
  //   ],
  // },
  // {
  //   id: uuid(),
  //   title: "Era Family",
  //   link: "/erafamily",
  //   icon: "heart",
  // },
  // {
  //   id: uuid(),
  //   title: "My Submit",
  //   link: "/mysubmit",
  //   icon: "file",
  // },
];
