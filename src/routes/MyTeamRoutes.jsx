import { v4 as uuid } from "uuid";

import Icon from "@mdi/react";
import { mdiTrello } from "@mdi/js";

export const MyTeamRoutes = [
  {
    id: uuid(),
    link: "/project-overview",
    name: "Overview",
  },
  { id: uuid(), link: "/task", name: "Task" },
  {
    id: uuid(),
    link: "/sales",
    name: "Sales",
  },
  {
    id: uuid(),
    link: "/files",
    name: "Files",
  },
  { id: uuid(), link: "/team", name: "Team" },
];
