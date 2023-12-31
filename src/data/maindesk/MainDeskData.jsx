import { v4 as uuid } from "uuid";
import {
  mdiMonitorAccount as ChecklistMonitorIcon,
  mdiAccountDetails as PerformanceIcon,
  mdiPoliceBadgeOutline as PolicyIcon,
  mdiHelpBoxMultipleOutline as CMSQuizIcon,
  mdiTrophyAward as EAAIcon,
  mdiMonitorEdit as ContentManagementIcon,
  mdiScaleBalance as LegalIcon,
  mdiStore as EraspaceIcon,
  mdiHomeCity as ErajayaIcon,
  mdiSchoolOutline as EmilIcon,
  mdiOffer as ATSIcon,
  mdiFountainPenTip as AssesmentIcon,
  mdiTicketConfirmation as TicketingIcon,
  mdiAccountMinusOutline,
} from "@mdi/js";
import Icon from "@mdi/react";
import Images from "./imageMainDeskData";

const MainDeskData = [
  // {
  //   id: uuid(),
  //   title: "Checklist Monitoring System",
  //   link: "/main-desk/checklist-monitoring",
  //   progress: "45",
  //   status: "Medium",
  //   complete: "983 List",
  //   listBucket: "233 List",
  //   overDue: "123 List",
  //   coverimage: null,
  //   badge: "12",
  //   badgecolor: "success",
  //   icon: <Icon path={ChecklistMonitorIcon} size={0.8} />,
  //   notBucket: true,
  // },
  // {
  //   id: uuid(),
  //   title: "Performance Management System",
  //   link: "/main-desk/performance-management",
  //   progress: "45",
  //   status: "Low",
  //   complete: "983 List",
  //   listBucket: "233 List",
  //   overDue: "123 List",
  //   badge: "12",
  //   badgecolor: "success",
  //   icon: <Icon path={PerformanceIcon} size={0.8} />,
  //   coverimage: null,
  //   notBucket: true,
  // },
  // {
  //   id: uuid(),
  //   title: "Policy Corner",
  //   link: "https://qleap.erajaya.com/app/policycorner",
  //   progress: "45",
  //   status: "High",
  //   complete: "983 List",
  //   listBucket: "233 List",
  //   overDue: "123 List",
  //   badge: "12",
  //   badgecolor: "success",
  //   icon: <Icon path={PolicyIcon} size={0.8} />,
  //   coverimage: null,
  //   notBucket: true,
  // },
  // {
  //   id: uuid(),
  //   title: "CMS Quiz",
  //   link: "https://qleap.erajaya.com/app/weekly",
  //   progress: "45",
  //   status: "High",
  //   complete: "983 List",
  //   listBucket: "233 List",
  //   overDue: "123 List",
  //   badge: "12",
  //   badgecolor: "success",
  //   icon: <Icon path={CMSQuizIcon} size={0.8} />,
  //   coverimage: null,
  //   notBucket: true,
  // },
  // {
  //   id: uuid(),
  //   title: "Erajaya Achivement Award",
  //   link: "/main-desk/eaa",
  //   progress: "45",
  //   status: "High",
  //   complete: "983 List",
  //   listBucket: "233 List",
  //   overDue: "123 List",
  //   badge: "12",
  //   badgecolor: "success",
  //   icon: <Icon path={EAAIcon} size={0.8} />,
  //   coverimage: null,
  //   notBucket: true,
  // },
  // {
  //   id: uuid(),
  //   title: "Offboarding",
  //   link: "https://qleap.erajaya.com/app/offboarding/resign",
  //   progress: "45",
  //   status: "Medium",
  //   complete: "983 List",
  //   listBucket: "233 List",
  //   overDue: "123 List",
  //   coverimage: null,
  //   badge: "12",
  //   badgecolor: "success",
  //   icon: <Icon path={mdiAccountMinusOutline} size={0.8} />,
  //   notBucket: true,
  // },
  // {
  //   id: uuid(),
  //   title: "Content Management",
  //   link: "/main-desk/content-management",
  //   progress: "45",
  //   status: "Medium",
  //   complete: "983 List",
  //   listBucket: "233 List",
  //   overDue: "123 List",
  //   coverimage: null,
  //   badge: "12",
  //   badgecolor: "success",
  //   icon: <Icon path={ContentManagementIcon} size={0.8} />,
  //   notBucket: true,
  // },
  // {
  //   id: uuid(),
  //   title: "Legal",
  //   link: "https://legal.erajaya.com/",
  //   progress: "45",
  //   status: "High",
  //   complete: "983 List",
  //   listBucket: "233 List",
  //   overDue: "123 List",
  //   badge: "12",
  //   badgecolor: "success",
  //   icon: <Icon path={LegalIcon} size={0.8} />,
  //   coverimage: null,
  //   notBucket: true,
  // },
  // {
  //   id: uuid(),
  //   title: "Eraspace",
  //   link: "https://eraspace.com/?SID=2ej8e3n3tjvae4vm8s6059bq06",
  //   progress: "45",
  //   status: "Medium",
  //   complete: "983 List",
  //   listBucket: "233 List",
  //   overDue: "123 List",
  //   coverimage: null,
  //   badge: "12",
  //   badgecolor: "success",
  //   icon: <Icon path={EraspaceIcon} size={0.8} />,
  //   notBucket: true,
  // },
  // {
  //   id: uuid(),
  //   title: "Erajaya",
  //   link: "https://www.erajaya.com/",
  //   progress: "45",
  //   status: "Low",
  //   complete: "983 List",
  //   listBucket: "233 List",
  //   overDue: "123 List",
  //   badge: "12",
  //   badgecolor: "success",
  //   icon: <Icon path={ErajayaIcon} size={0.8} />,
  //   coverimage: null,
  //   notBucket: true,
  // },
  // {
  //   id: uuid(),
  //   title: "Erajaya Micro Learning",
  //   link: "https://emil.erajaya.com/",
  //   progress: "45",
  //   status: "High",
  //   complete: "983 List",
  //   listBucket: "233 List",
  //   overDue: "123 List",
  //   badge: "12",
  //   badgecolor: "success",
  //   icon: <Icon path={EmilIcon} size={0.8} />,
  //   coverimage: null,
  //   notBucket: true,
  // },
  // {
  //   id: uuid(),
  //   title: "ATS",
  //   link: "https://ats.erajaya.com/en",
  //   progress: "45",
  //   status: "High",
  //   complete: "983 List",
  //   listBucket: "233 List",
  //   overDue: "123 List",
  //   badge: "12",
  //   badgecolor: "success",
  //   icon: <Icon path={ATSIcon} size={0.8} />,
  //   coverimage: null,
  //   notBucket: true,
  // },
  // {
  //   id: uuid(),
  //   title: "Assessment",
  //   link: "https://onlineassessment.erajaya.com/login",
  //   progress: "45",
  //   status: "High",
  //   complete: "983 List",
  //   listBucket: "233 List",
  //   overDue: "123 List",
  //   badge: "12",
  //   badgecolor: "success",
  //   icon: <Icon path={AssesmentIcon} size={0.8} />,
  //   coverimage: null,
  //   notBucket: true,
  // },
  // {
  //   id: uuid(),
  //   title: "Ticketing",
  //   link: "https://qleap.erajaya.com/app/ticketing",
  //   progress: "45",
  //   status: "High",
  //   complete: "983 List",
  //   listBucket: "233 List",
  //   overDue: "123 List",
  //   badge: "12",
  //   badgecolor: "success",
  //   icon: <Icon path={TicketingIcon} size={0.8} />,
  //   coverimage: null,
  //   notBucket: true,
  // },
];

const MainDeskData2 = [
  {
    id: uuid(),
    title: "Checklist Monitoring System",
    link: "/main-desk/checklist-monitoring",
    img: Images.checklistMonitoringIcon,
  },
  {
    id: uuid(),
    title: "Performance Management System",
    link: "/main-desk/performance-management",
    img: Images.performanceManagementIcon,
  },
  {
    id: uuid(),
    title: "Erajaya Achivement Award",
    link: "/main-desk/eaa",
    img: Images.eaaIcon,
  },
  {
    id: uuid(),
    title: "Content Management",
    link: "/main-desk/content-management",
    img: Images.contentManagementIcon,
  },
  // {
  //   id: uuid(),
  //   title: "Legal",
  //   link: "https://legal.erajaya.com/",
  //   img: Images.legalIcon,
  // },
  // {
  //   id: uuid(),
  //   title: "Eraspace",
  //   link: "https://eraspace.com/?SID=2ej8e3n3tjvae4vm8s6059bq06",
  //   img: Images.eraspace,
  // },
  // {
  //   id: uuid(),
  //   title: "Erajaya",
  //   link: "https://www.erajaya.com/",
  //   img: Images.erajaya,
  // },
  // {
  //   id: uuid(),
  //   title: "Erajaya Micro Learning",
  //   link: "https://emil.erajaya.com/",
  //   img: Images.MicroLearning,
  // },
  // {
  //   id: uuid(),
  //   title: "ATS",
  //   link: "https://ats.erajaya.com/en",
  //   img: Images.atsIcon,
  // },
  // {
  //   id: uuid(),
  //   title: "Assessment",
  //   link: "https://onlineassessment.erajaya.com/login",
  //   img: Images.asesmentIcon,
  // },
  // {
  //   id: uuid(),
  //   title: "Ticketing",
  //   link: "https://qleap.erajaya.com/app/ticketing",
  //   img: Images.ticketingIcon,
  // },
];

export { MainDeskData, MainDeskData2 };
