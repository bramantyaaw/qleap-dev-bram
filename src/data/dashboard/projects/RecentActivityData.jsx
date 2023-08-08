import { v4 as uuid } from "uuid";

export const RecentActivityData = [
  {
    id: uuid(),
    activity: "Tools to access information (QLEAP)",
    activitybrief: `Business Process HC & all HC related things`,
    time: "2 mins ago",
    icon: "check",
  },
  {
    id: uuid(),
    activity: "Socialization",
    activitybrief: `1st Socialization`,
    time: "1 hour ago",
    icon: "message-square",
  },
  // {
  //   id: uuid(),
  //   activity: "Task Overdue",
  //   activitybrief: `Task <a href="#"><u>status updatd for board</u></a> is overdue.`,
  //   time: "1 day",
  //   icon: "alert-triangle",
  // },
  // {
  //   id: uuid(),
  //   activity: "Update Send to Client",
  //   time: "1 day",
  //   activitybrief: `Jitu send email to update design for client Geeks UI.`,
  //   icon: "mail",
  // },
];
