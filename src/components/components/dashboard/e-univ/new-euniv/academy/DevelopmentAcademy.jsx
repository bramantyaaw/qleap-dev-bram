import React, { Fragment, useEffect, useState } from "react";
import MainNavbar from "../../../../../../layouts/navbars/MainNavbar";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ModuleCard } from "../card/ModuleCard";
import Illustration from "../../../../../../assets/images/icon/pana.svg";
import CareerJourney from "../process/CareerJourney";
import Medal from "../../../../../../assets/images/svg/medal.svg";

import NewNavbar from "../../../../../../layouts/navbars/NewNavbar";
import Footer from "../../../../../../layouts/footers/Footer";
import EUnivLayout from "../../../../../../layouts/navbars/EUnivLayout";
import IframeLinkOutside from "../../../../marketing/specialty/IframeLinkOutside";

export const DevelopmentAcademy = () => {
  const [uid, setUid] = useState(localStorage.getItem("uid"));

  useEffect(() => {
    setUid(localStorage.getItem("uid"));
    // eslint-disable-next-line
  }, [localStorage]);
  return (
    <div>
      <Fragment>
        <EUnivLayout>
          <div className="pb-0">
            <IframeLinkOutside
              style={{ backgroundColor: "#f5f4f8" }}
              height="calc(100vh + 40px)"
              src={`https://qleap.erajaya.com/qleapci/corporateuniversity/program/view/2`}
              className="w-100"
            />
          </div>
        </EUnivLayout>
      </Fragment>
    </div>
    // <Fragment>
    //   <NewNavbar navs={navs} logoSectionImg={LogoEUniv} logoSize={20} />

    //   <section className="pt-9 pb-9 bg-white ">
    //     <Container className="px-8">
    //       <Row>
    //         <Col md={12} sm={12}>
    //           <div className="mb-5 d-flex justify-content-between">
    //             <h3 className="display-5 fw-bold">
    //               Here's{" "}
    //               <span className="text-primary">your Career Journey</span>
    //             </h3>
    //             <div>
    //               {" "}
    //               <Link
    //                 className="btn btn-outline-primary btn-sm rounded-3"
    //                 to="/e-univ"
    //               >
    //                 Back to Homepage
    //               </Link>
    //             </div>
    //           </div>
    //           {/* Form */}
    //         </Col>
    //       </Row>
    //       <Row>
    //         <Card className="card-hover p-2 rounded-5">
    //           <Col md={12} className="d-flex justify-content-around  ">
    //             <Image src={Medal} width={150} height={150} />
    //             <CareerJourney />
    //           </Col>
    //         </Card>
    //       </Row>
    //     </Container>
    //   </section>

    //   <section className="bg-body py-9 ">
    //     <Container className="px-8">
    //       <Fragment>
    //         <Row>
    //           <Col lg={12} className="d-flex justify-content-between">
    //             <div className="mb-5">
    //               <h2 className="display-6 fw-bold text-primary mb-1">
    //                 Last Development
    //               </h2>
    //               <p>Here is the development program that you are working on</p>
    //             </div>
    //             <div>
    //               <Link
    //                 className="btn btn-light-primary btn-sm text-primary rounded-3"
    //                 to="#"
    //               >
    //                 Show more program
    //               </Link>
    //             </div>
    //           </Col>
    //         </Row>
    //         <Row>
    //           <ModuleCard />
    //         </Row>
    //       </Fragment>
    //     </Container>
    //   </section>
    //   <section className="py-9 bg-white">
    //     <Container className="px-8">
    //       <div className="bg-primary rounded-5">
    //         <div className="d-flex justify-content-around">
    //           <div className="justify-content-start py-5">
    //             <h2 className="display-5 text-white mb-0">
    //               Let’s find your report from this learning{" "}
    //             </h2>
    //             <div className="d-flex mt-3 justify-content-between align-items-center">
    //               <p className="text-white text-wrap mb-0">
    //                 To see your result for Assessment, quiz and productivity in
    //                 learning, you can access in here
    //               </p>
    //             </div>
    //             <div className="mt-5">
    //               <Link
    //                 className="btn btn-dark btn-sm text-white rounded-3"
    //                 to="#"
    //               >
    //                 See Report
    //               </Link>
    //             </div>
    //           </div>
    //           <Image
    //             src={Illustration}
    //             className="justify-content-end align-self-center p-0 "
    //             width={250}
    //             height={200}
    //           />
    //         </div>
    //       </div>
    //     </Container>
    //   </section>
    //   <section className="bg-body py-9 ">
    //     <Container className="px-8">
    //       <Fragment>
    //         <Row>
    //           <Col lg={12} className="d-flex justify-content-between">
    //             <div className="mb-5">
    //               <h2 className="fw-bold text-primary mb-1">
    //                 Development Program
    //               </h2>
    //               <p>Here is the development program that you are working on</p>
    //             </div>
    //             <div>
    //               <Link
    //                 className="btn btn-light-primary btn-sm text-primary rounded-3"
    //                 to="#"
    //               >
    //                 Show more program
    //               </Link>
    //             </div>
    //           </Col>
    //         </Row>
    //         <Row>
    //           <ModuleCard />
    //           <ModuleCard />
    //           <ModuleCard />
    //         </Row>
    //       </Fragment>
    //     </Container>
    //   </section>
    // </Fragment>
  );
};
