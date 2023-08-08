import { v4 as uuid } from "uuid";

// import media files
import Avatar2 from "../../../assets/images/avatar/avatar-2.jpg";
import Avatar3 from "../../../assets/images/avatar/avatar-2.jpg";
import Avatar4 from "../../../assets/images/avatar/avatar-2.jpg";
import Avatar5 from "../../../assets/images/avatar/avatar-2.jpg";
import Avatar6 from "../../../assets/images/avatar/avatar-2.jpg";

const UpcomingDeadlinesData = [
  {
    id: uuid(),
    member: "HCBP",
    memberimage: Avatar2,
    task: `STO 2023`,
    deadline: "31/03/2023",
    workload: "90",
  },
  {
    id: uuid(),
    member: "HCBP",
    memberimage: Avatar3,
    task: `Role & Responsibility 2023`,
    deadline: "31/03/2023",
    workload: "50",
  },
  {
    id: uuid(),
    member: "HCBP",
    memberimage: Avatar4,
    task: `KPI 2023`,
    deadline: "31/03/2023",
    workload: "80",
  },
  {
    id: uuid(),
    member: "TODC (Dian & Dike)",
    memberimage: Avatar5,
    task: `Career Path Apoteker`,
    deadline: "31/03/2023",
    workload: "60",
  },
  {
    id: uuid(),
    member: "Payroll (Ruth)",
    memberimage: Avatar6,
    task: `New Comben Scheme Apoteker`,
    deadline: "30/04/2023",
    workload: "50",
  },
  {
    id: uuid(),
    member: "Payroll (Ruth)",
    memberimage: Avatar6,
    task: `New Comben Scheme All Unit`,
    deadline: "30/09/2023",
    workload: "70",
  },
];

export default UpcomingDeadlinesData;
