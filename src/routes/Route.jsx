import "../assets/scss/theme.scss";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { ProfileDashboard } from "../layouts/profile/mydashboard/ProfileDashboard";
import { EraFamily } from "../layouts/profile/erafamily/EraFamily";
import { MyTeam } from "../layouts/e-digital/myteam/MyTeam";
import { Submission } from "../layouts/e-digital/mysubmission/Submission";
import { DetailAttendance } from "../layouts/attendance/DetailAttendance";
import { EPCN } from "../layouts/e-digital/maindesk/epcn/EPCN";
import Login from "../layouts/login/Login";
import Home from "../layouts/home/Home";
import Ticketing from "../layouts/ticketing/Ticketing";
import BasicProfile from "../layouts/profile/basicprofile/BasicProfile";
import Learning from "../layouts/e-univ/Learning";
import HelpCenter from "../layouts/helpcenter/HelpCenter";
import GuideCenter from "../layouts/helpcenter/guide/GuideCenter";
import FAQMain from "../layouts/helpcenter/faq/FAQMain";
import MySubmit from "../layouts/selfservice/MySubmit";
import SelfService from "../layouts/selfservice/SelfService";
import MemoMain from "../layouts/helpcenter/memo/MemoMain";
import PolicyMain from "../layouts/helpcenter/policy/PolicyMain";
import TermsAndConditions from "../layouts/footers/termAndCondition/TermsAndConditions";
import MainDesk from "../layouts/e-digital/maindesk/MainDesk";
import Overview from "../layouts/overview/Overview";
import { CreateEPCN } from "../layouts/e-digital/mysubmission/epcn/CreateEPCN";
import KoperasiMain from "../layouts/selfservice/koperasi/KoperasiMain";
import { DetailSubmission } from "../layouts/e-digital/mysubmission/DetailSubmission";
import DetailTicketTunjangan from "../layouts/tunjangan/DetailTicketTunjangan";
import { DetailApproval } from "../layouts/e-digital/myapproval/DetailApproval";
import CourseQuetions from "../layouts/onboard/CourseQuetions";
import TicketDetailAdmin from "../layouts/database-admin/ticket/TicketDetailAdmin";
import { ManageIncentive } from "../layouts/e-digital/maindesk/incentive/ManageIncentive";
import { Koperasi } from "../layouts/e-digital/maindesk/koperasi/Koperasi";
import { DigitalLetter } from "../layouts/selfservice/digital-letter/DigitalLetter";
import MainDeskTicketing from "../layouts/e-digital/maindesk/ticketing/MainDeskTicketing";
import { TunjanganMainDesk } from "../layouts/e-digital/maindesk/tunjangan/TunjanganMainDesk";
import { DetailTunjangan } from "../layouts/e-digital/maindesk/tunjangan/DetailTunjangan";
import TalentDashboard from "../layouts/talent-dashboard/TalentDashboard";
import MaintenanceMode from "../components/components/marketing/specialty/MaintenanceMode";
import PageNotFound from "../components/components/marketing/specialty/PageNotFound";
import { Approval } from "../layouts/e-digital/myapproval/Approval";
import DetailIncentive from "../layouts/incentive/DetailIncentive";
import { DetailProfile } from "../layouts/e-digital/myteam/team/DetailProfile";
import HelpCenterGuideSingle from "../layouts/helpcenter/guide/HelpCenterGuideSingle";
import DevelopmentModule from "../layouts/e-univ/development/Module/DevelopmentModule";
import SendWa from "../components/components/marketing/specialty/SendWa";
import Memo from "../layouts/e-digital/maindesk/memo-internal/Memo";
import Policy from "../layouts/e-digital/maindesk/policy-corner/Policy";
import CreatePolicyTemplate from "../layouts/e-digital/maindesk/policy-corner/action/CreateMemoTemplate";
import CreateTemplateMemo from "../layouts/e-digital/maindesk/memo-internal/action/CreateTemplateMemo";
import EditTemplateMemo from "../layouts/e-digital/maindesk/memo-internal/action/EditTemplateMemo";
import EditPolicyTemplate from "../layouts/e-digital/maindesk/policy-corner/action/EditPolicyTemplate";
import CompetencyMain from "../layouts/helpcenter/competency-corner/CompetencyMain";

// Ezone
import HomeEzone from "../layouts/e-zone/home/HomeEzone";
import StoryEzone from "../layouts/e-zone/story-ezone/StoryEzone";
import GroupEzone from "../layouts/e-zone/Group/GroupEzone";
import Ilead from "../layouts/e-zone/ilead/Ilead";
import RoomInnovation from "../layouts/e-zone/ilead/room/RoomInnovation";
import { NewLearning } from "../layouts/e-univ/NewLearning";
import { LearningAcademy } from "../components/components/dashboard/e-univ/new-euniv/academy/LearningAcademy";
import CoursePathSingle from "../components/components/dashboard/e-univ/new-euniv/CoursePathSingle";
import { DevelopmentAcademy } from "../components/components/dashboard/e-univ/new-euniv/academy/DevelopmentAcademy";
import { TrainingList } from "../layouts/e-univ/development/TalentProgram/TrainingList";
import MentoringForm from "../layouts/e-univ/development/TalentProgram/MentoringForm";
import { UploadProject } from "../layouts/e-univ/development/TalentProgram/UploadProject";
import DiagnosticCourse from "../layouts/e-zone/ilead/room/DiagnosticCourse";
import EzoneNews from "../layouts/e-zone/erajaya-news/EzoneNews";
import Celebration from "../layouts/e-zone/celebrate/Celebration";
import ErajayaNewsDetail from "../layouts/e-zone/erajaya-news/ErajayaNewsDetail";
import { ManageCategory } from "../layouts/e-digital/maindesk/category/ManageCategory";
import { ManageProgram } from "../layouts/e-digital/maindesk/program/ManageProgram";
import { DetailProgram } from "../layouts/e-digital/maindesk/program/detail/DetailProgram";
import DetailGroup from "../layouts/e-zone/Group/DetailGroup";
import MainDeskToken from "../layouts/e-digital/maindesk/MainDeskToken";
import IleadRoom from "../layouts/e-zone/ilead/IleadRoom";
import IleadInsight from "../layouts/e-zone/ilead/IleadInsight";
import InsightDetail from "../layouts/e-zone/ilead/room/InsightDetail";
import RnR from "../layouts/rnr/RnR";
import EzoneEvent from "../layouts/e-zone/event/EzoneEvent";
import { EltvChannel } from "../layouts/e-univ/EltvChannel";
import Managerial from "../layouts/e-digital/managerial/Managerial";
import FormAdministration from "../layouts/helpcenter/form-adm/FormAdministration";
import TunjanganIframe from "../layouts/tunjangan/TunjanganIframe";
// import MemoIframe from "../layouts/helpcenter/memo/MemoIframe";
// import PolicyIframe from "../layouts/helpcenter/policy/PolicyIframe";
import CMSRnR from "../layouts/rnr/cms/CMSRnR";
import RnRCreate from "../layouts/rnr/cms/RnRCreate";
import OffboardingIframe from "../layouts/selfservice/offboarding/OffboardingIframe";
import OnBoardIframe from "../layouts/selfservice/iframe/OnBoardIframe";
import LearningJourneyOnlineIframe from "../layouts/selfservice/iframe/LearningJourneyOnlineIframe";
import OurInsIframe from "../layouts/selfservice/iframe/OurInsIframe";
import SOBIframe from "../layouts/selfservice/iframe/SOBIframe";
import SOLIframe from "../layouts/selfservice/iframe/SOLIframe";
import SOBSIframe from "../layouts/selfservice/iframe/SOBSIframe";
import OffboardingPICIframe from "../layouts/selfservice/offboarding/OffboardingPICIframe";
import OffboardingAllIframe from "../layouts/selfservice/offboarding/OffboardingAllIframe";
import ChecklistMonitoring from "../layouts/selfservice/iframe/ChecklistMonitoring";
import PerformanceManagement from "../layouts/selfservice/iframe/PerformanceManagement";
import EAA from "../layouts/selfservice/iframe/EAA";
import ContentManagement from "../layouts/selfservice/iframe/ContentManagement";
import Redirect from "../components/components/marketing/specialty/Redirect";
import TicketListLayout from "../layouts/ticketing/TicketListLayout";
import ComingSoon from "../components/components/marketing/specialty/ComingSoon";
import TicketComing from "../components/components/marketing/specialty/TicketComing";
import { GuidesResources } from "../layouts/e-digital/maindesk/guides-resources/GuidesResources";
import { CreateGuides } from "../layouts/e-digital/maindesk/guides-resources/action/CreateGuides";
import PrivateRoute from "../config/helper/PrivateRoute";

const RouteApp = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route element={<ProtectedRoute />}>
      {/* <Route element={<PrivateRoute />}> */}
      <Route path="/" element={<Home />} />
      <Route path="/rnr" element={<RnR />} />
      <Route path="/profile" element={<ProfileDashboard />} />
      <Route path="/self-service/attendance" element={<DetailAttendance />} />
      <Route path="/profile/incentive" element={<DetailIncentive />} />
      <Route path="/basicprofile" element={<BasicProfile />} />
      <Route path="/erafamily" element={<EraFamily />} />
      <Route path="/learning/learning-academy" element={<LearningAcademy />} />
      <Route path="/maintenance-mode" element={<MaintenanceMode />} />
      <Route path="/send-wa" element={<SendWa />} />
      <Route path="/coming-soon" element={<TicketComing />} />

      {/* e-univ */}

      <Route path="/e-univ/old" element={<Learning />} />
      <Route path="/e-univ" element={<NewLearning />} />
      <Route path="/e-univ/learning" element={<LearningAcademy />} />
      <Route path="/e-univ/development" element={<DevelopmentAcademy />} />
      <Route path="/e-univ/onboard" element={<OnBoardIframe />} />
      <Route path="/e-univ/eltv" element={<EltvChannel />} />
      <Route
        path="/e-univ/learning-journey-online"
        element={<LearningJourneyOnlineIframe />}
      />
      <Route path="/e-univ/our-instructors" element={<OurInsIframe />} />
      <Route path="/e-univ/school-of-business" element={<SOBIframe />} />
      <Route path="/e-univ/school-of-leadership" element={<SOLIframe />} />
      <Route path="/e-univ/school-of-b-support" element={<SOBSIframe />} />

      <Route
        path="/e-univ/learning/:categoryName"
        element={<CoursePathSingle />}
      />

      <Route
        path="/e-univ/learning/courses/:program_id"
        element={<CourseQuetions />}
      />
      <Route
        path="/e-univ/development/course"
        element={<DevelopmentModule />}
      />
      <Route
        path="/e-univ/talent-program/training-list"
        element={<TrainingList />}
      />
      <Route
        path="/e-univ/talent-program/mentoring-form"
        element={<MentoringForm />}
      />
      <Route
        path="/e-univ/talent-program/upload-project"
        element={<UploadProject />}
      />

      {/* e-service */}
      <Route path="/help" element={<HelpCenter />} />
      <Route path="/help/guide" element={<GuideCenter />} />
      <Route
        path="/help/guide/:categoryslug/:articleslug"
        element={<HelpCenterGuideSingle />}
      />
      <Route path="/my-submission" element={<MySubmit />} />
      <Route path="/my-submission/detail" element={<DetailTicketTunjangan />} />
      <Route path="/self-service" element={<SelfService />} />
      <Route path="/self-service/koperasi" element={<KoperasiMain />} />
      <Route path="/self-service/digital-letter" element={<DigitalLetter />} />
      <Route path="/self-service/tunjangan" element={<TunjanganIframe />} />
      {/* <Route path="/self-service/memo-internal" element={<MemoIframe />} />
      <Route path="/self-service/policy-corner" element={<PolicyIframe />} /> */}
      <Route path="/self-service/form" element={<FormAdministration />} />
      <Route path="/self-service/offboarding" element={<OffboardingIframe />} />
      <Route
        path="/self-service/offboarding/pic"
        element={<OffboardingPICIframe />}
      />
      <Route
        path="/self-service/offboarding/all"
        element={<OffboardingAllIframe />}
      />
      <Route path="/help/faq" element={<FAQMain />} />
      <Route path="/my-submission/ticket/create" element={<Ticketing />} />
      <Route path="/my-submission/ticket" element={<TicketListLayout />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      <Route path="/overview" element={<Overview />} />
      <Route path="/tunjangan/detail-view" element={<DetailTunjangan />} />
      <Route path="/help/memo-internal" element={<MemoMain />} />
      <Route path="/help/policy-corner" element={<PolicyMain />} />
      <Route path="/help/competency-corner" element={<CompetencyMain />} />

      {/* e-digital */}
      <Route path="/main-desk" element={<MainDesk />} />
      <Route
        path="/edigital/main-desk"
        element={<Redirect navigateRoute="/main-desk" />}
      />

      <Route
        path="/main-desk/manage-program/create"
        element={<ManageCategory />}
      />
      <Route path="/main-desk/manage-program" element={<ManageProgram />} />
      <Route
        path="/main-desk/manage-program/detail/:program_id"
        element={<DetailProgram />}
      />
      <Route path="/main-desk/epcn" element={<EPCN />} />
      <Route path="/main-desk/ticket" element={<MainDeskTicketing />} />
      <Route path="/main-desk/tunjangan" element={<TunjanganMainDesk />} />
      <Route path="/main-desk/incentive" element={<ManageIncentive />} />
      <Route path="/main-desk/koperasi" element={<Koperasi />} />
      <Route
        path="/main-desk/checklist-monitoring"
        element={<ChecklistMonitoring />}
      />
      <Route
        path="/main-desk/performance-management"
        element={<PerformanceManagement />}
      />
      <Route path="/main-desk/eaa" element={<EAA />} />
      <Route
        path="/main-desk/content-management"
        element={<ContentManagement />}
      />
      <Route
        path="/main-desk/ticket/detail/:idTicket"
        element={<TicketDetailAdmin />}
      />
      <Route path="/myteam" element={<MyTeam />} />
      <Route path="/myteam/detail-profile/:uid" element={<DetailProfile />} />
      <Route path="/submission" element={<Submission />} />
      <Route
        path="/edigital/submission"
        element={<Redirect navigateRoute="/submission" />}
      />
      <Route path="/submission/list-submission" element={<Submission />} />
      <Route path="/submission/create-epcn" element={<CreateEPCN />} />
      <Route
        path="/submission/detail-employee/:pcn_id"
        element={<DetailSubmission button={false} />}
      />
      <Route path="/approval" element={<Approval />} />
      <Route
        path="/edigital/approval"
        element={<Redirect navigateRoute="/approval" />}
      />
      <Route
        path="/approval/detail-employee/:pcn_id"
        element={
          <DetailApproval
            first="E-Digital"
            second="Approval"
            firstLink="/main-desk"
            secLink="/approval"
            button={true}
          />
        }
      />
      <Route
        path="/main-desk/approval/detail-employee/:pcn_id"
        element={
          <DetailApproval
            first="Main Desk"
            second="List Approval"
            firstLink="/main-desk"
            secLink="/main-desk/epcn?activeKey=transaction"
            button={true}
          />
        }
      />
      <Route path="/managerial" element={<Managerial />} />
      <Route path="/talent-dashboard" element={<TalentDashboard />} />
      <Route path="/main-desk/memo-internal" element={<Memo />} />
      <Route path="/main-desk/policy-corner" element={<Policy />} />
      <Route path="/main-desk/guide-resources" element={<GuidesResources />} />
      <Route
        path="/main-desk/policy-corner/create"
        element={<CreatePolicyTemplate />}
      />
      <Route
        path="/main-desk/memo-internal/create"
        element={<CreateTemplateMemo />}
      />
      <Route
        path="/main-desk/memo-internal/edit/:id"
        element={<EditTemplateMemo />}
      />
      <Route
        path="main-desk/guides-resources/create"
        element={<CreateGuides />}
      />
      <Route
        path="/main-desk/policy-corner/edit/:id"
        element={<EditPolicyTemplate />}
      />
      <Route path="/edigital/rnr" element={<CMSRnR />} />
      <Route path="/edigital/rnr/create" element={<RnRCreate />} />

      {/* Ezone */}
      <Route path="/ezone" element={<HomeEzone />} />
      <Route path="/ezone/event" element={<EzoneEvent />} />
      <Route path="/ezone/news" element={<EzoneNews />} />
      <Route path="/ezone/news/:id" element={<ErajayaNewsDetail />} />
      <Route path="/ezone/story" element={<StoryEzone />} />
      <Route path="/ezone/community" element={<GroupEzone />} />
      <Route path="/ezone/community/:id" element={<DetailGroup />} />
      <Route path="/ezone/celebration" element={<Celebration />} />
      <Route path="/ezone/ilead/diagnostic" element={<Ilead />} />
      <Route
        path="/ezone/ilead/diagnostic/course"
        element={<DiagnosticCourse />}
      />
      <Route path="/ezone/ilead/room" element={<IleadRoom />} />
      <Route path="/ezone/ilead/room/:roomName" element={<RoomInnovation />} />
      <Route path="/ezone/ilead/insight" element={<IleadInsight />} />
      <Route path="/ezone/ilead/insight/detail" element={<InsightDetail />} />
    </Route>

    <Route path="*" element={<PageNotFound />} />
    <Route
      path="/edigital/main-desk/:nik"
      element={<MainDeskToken linkNavigate="/main-desk" />}
    />
    <Route
      path="/edigital/submission/:nik"
      element={<MainDeskToken linkNavigate="/submission" />}
    />
    <Route
      path="/edigital/approval/:nik"
      element={<MainDeskToken linkNavigate="/approval" />}
    />
  </Routes>
);
export default RouteApp;
