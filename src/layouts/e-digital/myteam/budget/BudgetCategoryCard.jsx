// import node module libraries
import { Card, Table } from "react-bootstrap";

// import utility file
// import { numberWithCommas, getCategoryColor } from "/src/config/helper/utils";

import {
  numberWithCommas,
  getCategoryColor,
} from "../../../../config/helper/utils";

// import bootstrap icons
import { SquareFill } from "react-bootstrap-icons";

// Import required data files
// import BudgetCategoryData from "/src/data/dashboard/projects/BudgetCategoryData";
// import { BudgetCategoryData } from "../../../data/dashboard/projects/BudgetCategoryData";
import { BudgetCategoryData } from "../../../../data/dashboard/projects/BudgetCategoryData";

const BudgetCategoryCard = ({ brand }) => {
  const formatter = new Intl.NumberFormat("ID", {
    style: "currency",
    currency: "IDR",
  });

  return (
    <Card className="h-100">
      <Card.Header>
        <h4 className="mb-0">Brand Category</h4>
      </Card.Header>

      {/* table */}
      <div className="table-responsive">
        <Table className="text-nowrap mb-0">
          <thead className="table-light">
            <tr>
              <th>Category</th>
              <th>Total Sales</th>
              <th>Total Incentive</th>
            </tr>
          </thead>
          <tbody>
            {brand ? (
              <>
                <tr>
                  <td>{brand?.FTK?.brandName}</td>
                  <td>{formatter.format(brand?.FTK?.totalSales)}</td>
                  <td>{brand?.FTK?.totalIncentive}</td>
                </tr>
                <tr>
                  <td>{brand?.IND?.brandName}</td>
                  <td>{formatter.format(brand?.IND?.totalSales)}</td>
                  <td>{brand?.IND?.totalIncentive}</td>
                </tr>
                <tr>
                  <td>{brand?.IT1?.brandName}</td>
                  <td>{formatter.format(brand?.IT1?.totalSales)}</td>
                  <td>{brand?.IT1?.totalIncentive}</td>
                </tr>
                <tr>
                  <td>{brand?.LMA?.brandName}</td>
                  <td>{formatter.format(brand?.LMA?.totalSales)}</td>
                  <td>{brand?.LMA?.totalIncentive}</td>
                </tr>
                <tr>
                  <td>{brand?.LOP?.brandName}</td>
                  <td>{formatter.format(brand?.LOP?.totalSales)}</td>
                  <td>{brand?.LOP?.totalIncentive}</td>
                </tr>
                <tr>
                  <td>{brand?.MED?.brandName}</td>
                  <td>{formatter.format(brand?.MED?.totalSales)}</td>
                  <td>{brand?.MED?.totalIncentive}</td>
                </tr>
                <tr>
                  <td>{brand?.SAM?.brandName}</td>
                  <td>{formatter.format(brand?.SAM?.totalSales)}</td>
                  <td>{brand?.SAM?.totalIncentive}</td>
                </tr>
                <tr>
                  <td>{brand?.SCP?.brandName}</td>
                  <td>{formatter.format(brand?.SCP?.totalSales)}</td>
                  <td>{brand?.SCP?.totalIncentive}</td>
                </tr>
                <tr>
                  <td>{brand?.TKS?.brandName}</td>
                  <td>{formatter.format(brand?.TKS?.totalSales)}</td>
                  <td>{brand?.TKS?.totalIncentive}</td>
                </tr>
                <tr>
                  <td>{brand?.SMF?.brandName}</td>
                  <td>{brand?.SMF?.totalIncentive}</td>
                  <td>{brand?.SMF?.totalSales}</td>
                </tr>
                <tr>
                  <td>{brand?.UE1?.brandName}</td>
                  <td>{brand?.UE1?.totalIncentive}</td>
                  <td>{brand?.UE1?.totalSales}</td>
                </tr>
                <tr>
                  <td>{brand?.XLA?.brandName}</td>
                  <td>{brand?.XLA?.totalIncentive}</td>
                  <td>{brand?.XLA?.totalSales}</td>
                </tr>
              </>
            ) : (
              <p className="text-center my-2 ms-3 text-italic">
                No records available
              </p>
            )}
          </tbody>
        </Table>
      </div>
    </Card>
  );
};
export default BudgetCategoryCard;
