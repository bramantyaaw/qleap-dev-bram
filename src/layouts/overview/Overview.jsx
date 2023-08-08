import HelpCenterLayout from "../helpcenter/HelpCenterLayout";
import NewProfileLayout from "../../components/components/dashboard/ticketing/ticket-list/NewProfileLayout";
import TicketOverview from "./TicketOverview";
import SubmittionOverview from "./SubmittionOverview";

const Overview = () => {
  return (
    <HelpCenterLayout>
      <div className="subs-wrapper">
        <NewProfileLayout>
          <SubmittionOverview />
          <TicketOverview />
        </NewProfileLayout>
      </div>
    </HelpCenterLayout>
  );
};

export default Overview;
