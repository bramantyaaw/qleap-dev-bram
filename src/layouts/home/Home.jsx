import { Fragment, useEffect, useState } from "react";

import MainLayout from "./MainLayout";
import HomeHeader from "./HomeHeader";
import AttendancePart from "./AttendancePart";
import CarouselPart from "./CarouselPart";
import LearningJourneyPart from "./LearningJourneyPart";
import EventPart from "./EventPart";
import SelfServicePart from "./SelfServicePart";

const Home = () => {
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [uid, setUid] = useState(localStorage.getItem("uid"));

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
    setUid(localStorage.getItem("uid"));
    // eslint-disable-next-line
  }, [localStorage]);

  return (
    <MainLayout>
      <Fragment>
        <HomeHeader />
        <AttendancePart token={token} uid={uid} />
        <CarouselPart token={token} />
        <LearningJourneyPart token={token} uid={uid} isHome={true} />
        <EventPart token={token} />
        {/* <TicketingPart /> */}
        <SelfServicePart />
      </Fragment>
    </MainLayout>
  );
};

export default Home;
