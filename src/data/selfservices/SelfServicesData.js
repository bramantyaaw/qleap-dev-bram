import { v4 as uuid } from "uuid";

import digital_letter from "../../assets/images/icon/digital-letter-icon.svg";
import tunjangan from "../../assets/images/icon/tunjangan-suka-duka-icon.svg";
// import reward_trip from "../../assets/images/icon/reward-trip-icon.svg";
import offboarding from "../../assets/images/icon/offboarding-icon.svg";
import attendance from "../../assets/images/icon/attendance-icon.svg";
import koperasi from "../../assets/images/icon/koperasi-icon.svg";
import formAdm from "../../assets/images/icon/form-adm.svg";
import userTicket from "../../assets/images/icon/user-manual-ticketing.svg";
import memoryInternal from "../../assets/images/icon/memory-internal.svg";
import policyCorner from "../../assets/images/icon/policy-corner-icon.svg";

export const SelfServicesData = [
  {
    id: uuid(),
    icon: digital_letter,
    title: "Digital Letters",
    link: "/self-service/digital-letter",
    description: "You can download a certificate according to your needs.",
  },
  {
    id: uuid(),
    icon: tunjangan,
    title: "Tunjangan Suka Duka",
    link: "/self-service/tunjangan",
    description: "Access to applying for benefits is even easier, click here.",
  },
  // {
  //   id: uuid(),
  //   icon: reward_trip,
  //   title: "Reward Trip",
  //   link: "#",
  //   description:
  //     "If you get a reward trip opportunity, you can confirm it here.",
  // },
  {
    id: uuid(),
    icon: offboarding,
    title: "Offboarding",
    link: "/self-service/offboarding",
    description: "If you want to submit a resignation, you can access it here.",
  },
  // {
  //   id: uuid(),
  //   icon: memoryInternal,
  //   title: "Memo Internal",
  //   link: "/self-service/memo-internal",
  //   description: "Get the Latest Internal Company Memo here",
  // },
  // {
  //   id: uuid(),
  //   icon: policyCorner,
  //   title: "Policy Corner",
  //   link: "/self-service/policy-corner",
  //   description: "Learn about company policy here",
  // },

  // {
  //   id: uuid(),
  //   icon: koperasi,
  //   title: "Koperasi",
  //   link: "/self-service/koperasi",
  //   description: "If you want to apply for a loan, you can apply it here.",
  // },
  {
    id: uuid(),
    icon: formAdm,
    title: "Form Administration",
    link: "/self-service/form",
    description: "Create a Handover Form Here",
  },
  {
    id: uuid(),
    icon: attendance,
    title: "Attendance",
    link: "/self-service/attendance",
    description: "You can see your attendance data here.",
  },
  // {
  //   id: uuid(),
  //   icon: userTicket,
  //   title: "User Manual Ticketing",
  //   link: "/self-service/user-manual-ticketing",
  //   description: "Instructions for submitting tickets",
  // },
];
export default SelfServicesData;
