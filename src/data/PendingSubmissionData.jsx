import { v4 as uuid } from "uuid";
import Icon from "@mdi/react";
import { mdiCheckCircle, mdiArrowUpCircle } from "@mdi/js";

export const PendingSubmissionData = [
  {
    id: uuid(),
    activity: "Tunjangan Suka Duka",
    activitybrief: `22 August, 2022 `,
    icon: <Icon path={mdiCheckCircle} className="nav-icon" size={0.8} />,
    iconColorVariant: "warning",
    result: "Pending",
  },
  {
    id: uuid(),
    activity: "Tunjangan Suka Duka",
    activitybrief: `22 August, 2022 `,
    icon: <Icon path={mdiCheckCircle} className="nav-icon " size={0.8} />,
    iconColorVariant: "warning",
    result: "Pending",
  },
  {
    id: uuid(),
    activity: "Tunjangan Suka Duka",
    activitybrief: `22 August, 2022 `,
    icon: <Icon path={mdiCheckCircle} className="nav-icon" size={0.8} />,
    iconColorVariant: "warning",
    result: "Pending",
  },
  {
    id: uuid(),
    activity: "Tunjangan Suka Duka",
    activitybrief: `22 August, 2022`,
    icon: <Icon path={mdiArrowUpCircle} size={0.8} />,
    iconColorVariant: "warning",
    result: "Pending",
  },
];
