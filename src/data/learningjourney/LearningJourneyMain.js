import { v4 as uuid } from "uuid";
import learning from "../../assets/images/icon/vector_learning.svg";
import read from "../../assets/images/icon/vector_read.svg";
import task from "../../assets/images/icon/vector_task.svg";

export const LearningJourneyMain = [
  {
    id: uuid(),
    icon: learning,
    tag: "all-score",
    title: "",
    link: "#",
    description: "",
    linkname: "View All Score",
    isButton: false,
  },
  {
    id: uuid(),
    icon: read,
    tag: "learning",
    title: "",
    link: "/e-univ",
    description: "Your last module",
    linkname: "Continue Learning",
    isButton: false,
  },
  {
    id: uuid(),
    icon: task,
    tag: "weekly",
    title: "Special Task",
    link: "#",
    description: "Weekly Quiz period : 12 Jul 2022 • 08:00 - 12:00 WIB",
    linkname: "Continue Learning",
    isButton: true,
  },
];

export default LearningJourneyMain;
