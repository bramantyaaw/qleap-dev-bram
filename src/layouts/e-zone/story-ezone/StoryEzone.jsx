import React, { Component, Fragment } from "react";
import PageTitle from "../../../components/ezone/new/Story/PageTitle";
import Img from "../../../assets/images/avatar/avatar-6.jpg";
import bgStory from "../../../assets/ezone/images/jpg/bg-story.jpg";
import RightSideEzoneComponent from "../../../components/ezone/new/components/RightSideEzoneComponent";

const storyList = [
  {
    imageUrl: Img,
    name: "Aliqa Macale",
    email: "support@gmail.com",
    bgImage: "bg-story.jpg",
  },
  {
    imageUrl: Img,
    name: "Hendrix Stamp",
    email: "support@gmail.com",
    bgImage: "bg-story.jpg",
  },
  {
    imageUrl: Img,
    name: "Stephen Grider",
    email: "support@gmail.com",
    bgImage: "bg-story.jpg",
  },
  {
    imageUrl: Img,
    name: "Mohannad Zitoun",
    email: "support@gmail.com",
    bgImage: "bg-story.jpg",
  },
  {
    imageUrl: Img,
    name: "Aliqa Macale",
    email: "support@gmail.com",
    bgImage: "bg-story.jpg",
  },
  {
    imageUrl: Img,
    name: "Surfiya Zakir",
    email: "support@gmail.com",
    bgImage: "bg-story.jpg",
  },
  {
    imageUrl: Img,
    name: "Aliqa Macale",
    email: "support@gmail.com",
    bgImage: "bg-story.jpg",
  },
  {
    imageUrl: Img,
    name: "Surfiya Zakir",
    email: "support@gmail.com",
    bgImage: "bg-story.jpg",
  },
  {
    imageUrl: Img,
    name: "Aliqa Macale",
    email: "support@gmail.com",
    bgImage: "bg-story.jpg",
  },
  {
    imageUrl: Img,
    name: "Surfiya Zakir",
    email: "support@gmail.com",
    bgImage: "bg-story.jpg",
  },
  {
    imageUrl: Img,
    name: "Aliqa Macale",
    email: "support@gmail.com",
    bgImage: "bg-story.jpg",
  },
  {
    imageUrl: Img,
    name: "Surfiya Zakir",
    email: "support@gmail.com",
    bgImage: "bg-story.jpg",
  },
];

class StoryEzone extends Component {
  render() {
    return (
      <Fragment>
        {/* <LeftNav /> */}
        {/* <Rightchat /> */}
        <RightSideEzoneComponent>
          <div className="col-xl-12">
            <PageTitle title="Story" />

            <div className="row ps-2 pe-1">
              {storyList.map((value, index) => (
                <div key={index} className="col-md-3 col-xss-6 pe-2 ps-2">
                  <div
                    className="card h300 d-block border-0 shadow-xss rounded-3 bg-gradiant-bottom overflow-hidden mb-3 bg-image-cover"
                    // backgroundImage: `url("assets/images/${value.imageUrl}")`,

                    style={{
                      backgroundImage: `url(${bgStory})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <div className="card-body d-block w-100 position-absolute bottom-0 text-center">
                      <figure className="avatar ms-auto me-auto mb-0 position-relative w50 z-index-1">
                        <img
                          // src={`assets/images/${value.bgImage}`}

                          src={value?.imageUrl}
                          alt="avater"
                          className="float-right p-0 bg-white rounded-circle w-100 shadow-xss"
                        />
                      </figure>
                      <div className="clearfix"></div>
                      <h4 className="fw-600 position-relative z-index-1 ls-3 font-xssss text-white mt-2 mb-1">
                        {value.name}
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RightSideEzoneComponent>
        {/* <AppFooter /> */}
      </Fragment>
    );
  }
}

export default StoryEzone;
