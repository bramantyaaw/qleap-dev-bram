import { v4 as uuid } from "uuid";
import Icon from "@mdi/react";
import { mdiCheckCircle, mdiArrowUpCircle } from "@mdi/js";

const AssessmentData = [
  {
    id: uuid(),
    activity: "Marketing Development",
    activitybrief: `Good `,
    icon: <Icon path={mdiCheckCircle} className="nav-icon" size={0.8} />,
    iconColorVariant: "success",
  },
  {
    id: uuid(),
    activity: "Public Speaking",
    activitybrief: `Good `,
    icon: <Icon path={mdiCheckCircle} className="nav-icon " size={0.8} />,
    iconColorVariant: "success",
  },
  {
    id: uuid(),
    activity: "Improvement Prototype",
    activitybrief: `Good `,
    icon: <Icon path={mdiCheckCircle} className="nav-icon" size={0.8} />,
    iconColorVariant: "success",
  },
  {
    id: uuid(),
    activity: "Bussiness Marketing Planing",
    activitybrief: `Need to improve`,
    icon: <Icon path={mdiArrowUpCircle} size={0.8} />,
    iconColorVariant: "danger",
  },
];

export default AssessmentData;
