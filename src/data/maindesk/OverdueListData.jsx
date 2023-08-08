export const overdueData = [
  {
    id: 1,
    type: "Probation",
    overdue: "5 Days",
  },
  {
    id: 2,
    type: "Mutation",
    overdue: "3 Days",
  },
  {
    id: 3,
    type: "Contract to Permanent",
    overdue: "3 Days",
  },
  {
    id: 4,
    type: "Re-contract",
    overdue: "3 Days",
  },
];

export const typeData = [
  {
    id: 1,
    type: "Probation",
    color: "info",
  },
  {
    id: 2,
    type: "Promotion",
    color: "danger",
  },

  {
    id: 3,
    type: "Demotion",
    color: "warning",
  },
  {
    id: 4,
    type: "Relocation",
    color: "primary",
  },
  {
    id: 5,
    type: "Re-contract",
    color: "info",
  },
  {
    id: 7,
    type: "Correction",
    color: "info",
  },
  {
    id: 8,
    type: "Mutation",
    color: "info",
  },
  {
    id: 9,
    type: "Internal-Recruitment",
    color: "info",
  },
  {
    id: 10,
    type: "Contract to Permanent",
    color: "info",
  },
];
export const OverdueListData = [overdueData, typeData];

export default OverdueListData;
