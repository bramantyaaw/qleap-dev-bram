import { v4 as uuid } from "uuid";

import memo from "../../assets/images/icon/memo-icon.svg";
import policy from "../../assets/images/icon/policy-icon.svg";
import competency from "../../assets/images/icon/competency-icon.svg";
import guide from "../../assets/images/icon/guide-icon.svg";
import faq from "../../assets/images/icon/faq-icon.svg";
import support from "../../assets/images/icon/support-icon.svg";
import contact_us from "../../assets/images/icon/contact-us-icon.svg";

export const HelpCenterFeaturesData = [
  {
    id: uuid(),
    icon: memo,
    title: "Internal Memo",
    link: "/help/memo-internal",
    description:
      "To view company announcements regarding policies issued by management, enter here",
    linkname: "View Internal Memo",
  },
  {
    id: uuid(),
    icon: policy,
    title: "Policy Corner",
    link: "/help/policy-corner",
    description:
      "To see company regulations that you must know, you can enter here",
    linkname: "View Policy Corner",
  },
  {
    id: uuid(),
    icon: competency,
    title: "Competency Corner",
    link: "/help/competency-corner",
    description:
      "To view data related to employee competencies, you can enter here",
    linkname: "View Competency Corner",
  },
  {
    id: uuid(),
    icon: guide,
    title: "Guides & Resources",
    link: "/help/guide",
    description:
      "If you experience confusion in using the programs in qleap. You can see guides for using each program, you can enter here",
    linkname: "Browse Guides",
  },
  {
    id: uuid(),
    icon: faq,
    title: "FAQs",
    link: "/help/faq",
    description:
      "FAQ, short for frequently asked questions, is a list of commonly asked questions and answers about a specific topic.",
    linkname: "View FAQ",
  },
  // {
  //   id: uuid(),
  //   icon: support,
  //   title: "Support",
  //   link: "/my-submission/ticket/create",
  //   description:
  //     "Support ticketing is a system to assist employees in solving issues",
  //   linkname: "Submit a Request",
  // },
  {
    id: uuid(),
    icon: contact_us,
    title: "Chat Whatsapp",
    link: "https://api.whatsapp.com/send?phone=628818865687",
    description: "If you have any problem, you can ask about Qleap here",
    linkname: "Chat Whatsapp",
  },
];

export default HelpCenterFeaturesData;
