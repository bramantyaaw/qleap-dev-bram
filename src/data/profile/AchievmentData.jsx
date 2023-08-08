import { v4 as uuid } from "uuid";
import Icon from "@mdi/react";
import { mdiCheckCircle, mdiArrowUpCircle } from "@mdi/js";

export const AchievmentData = [
  {
    id: uuid(),
    activity: "Reward Trip",
    activitybrief: `Reward Trip to KL dari Indosat dari 26 - 28 Feb 2020 `,
    icon: <Icon path={mdiCheckCircle} className="nav-icon" size={0.8} />,
    iconColorVariant: "info",
  },
  {
    id: uuid(),
    activity: "Erajaya Achievement Award",
    activitybrief: `Project EAA 2018-2019 - Leap Journey - Silver `,
    icon: <Icon path={mdiCheckCircle} className="nav-icon " size={0.8} />,
    iconColorVariant: "success",
  },
  {
    id: uuid(),
    activity: "Erajaya Achievement Award",
    activitybrief: `Project EAA 2018-2019 - HR Super Apps - Platinum `,
    icon: <Icon path={mdiCheckCircle} className="nav-icon" size={0.8} />,
    iconColorVariant: "success",
  },
  {
    id: uuid(),
    activity: "Erajaya Achievement Award",
    activitybrief: `Project EAA 2018-2019 - MIERS - Gold`,
    icon: <Icon path={mdiArrowUpCircle} size={0.8} />,
    iconColorVariant: "success",
  },
];
