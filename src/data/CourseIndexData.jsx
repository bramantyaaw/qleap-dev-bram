import Avatar1 from "../assets/images/avatar/avatar-1.jpg";
import Icon from "@mdi/react";
import {
  mdiPlay,
  mdiBookOpen,
  mdiCheckCircle,
  mdiNote,
  mdiFitToScreen,
} from "@mdi/js";
export const CourseIndex = [
  {
    id: 1,
    title: "Innovation",
    total_videos: 4,
    total_duratoin: "1 hour and 17 minutes",
    completed: 5, // Percent
    topics: [
      {
        id: 1,
        topic: "Introduction",
        duratoin: "1m 7s",
        status: "finished",
        icon: <Icon path={mdiPlay} size={0.8} />,
        iconColorVariant: "primary",
        locked: false,
      },
      {
        id: 2,
        topic: "Installing Development Software",
        duratoin: "3m 11s",
        status: "continue",
        icon: <Icon path={mdiBookOpen} size={0.8} />,
        iconColorVariant: "warning",
        locked: false,
      },
      {
        id: 3,
        topic: "Hello World Project from GitHub",
        duratoin: "2m 33s",
        status: "pending",
        locked: false,
        icon: <Icon path={mdiNote} size={0.8} />,
        iconColorVariant: "danger",
      },
      {
        id: 4,
        topic: "Our Sample Website",
        duratoin: "2m 15s",
        status: "pending",
        locked: false,
        icon: <Icon path={mdiFitToScreen} size={0.8} />,
        iconColorVariant: "success",
      },
      {
        id: 5,
        topic: "Learning Website",
        duratoin: "2m 15s",
        status: "pending",
        locked: true,
        icon: <Icon path={mdiFitToScreen} size={0.8} />,
        iconColorVariant: "secondary",
      },
    ],
  },
  {
    id: 2,
    title: "Leadership",
    total_videos: 8,
    total_duratoin: "34 minutes",
    completed: 0, // Percent
    topics: [
      {
        id: 1,
        topic: "Introduction",
        duratoin: "1m 41s",
        status: "pending",
        locked: true,
        iconColorVariant: "secondary",
      },
      {
        id: 2,
        topic: "Adding JavaScript Code to a Web Page",
        duratoin: "3m 39s",
        status: "pending",
        locked: true,
        iconColorVariant: "secondary",
      },
      {
        id: 3,
        topic: "Working with JavaScript Files",
        duratoin: "6m 18s",
        status: "pending",
        locked: true,
        iconColorVariant: "secondary",
      },
      {
        id: 4,
        topic: "Formatting Code",
        duratoin: "2m 18s",
        status: "pending",
        locked: true,
        iconColorVariant: "secondary",
      },
      {
        id: 5,
        topic: "Detecting and Fixing Errors",
        duratoin: "3m 14s",
        status: "pending",
        locked: true,
        iconColorVariant: "secondary",
      },
    ],
  },
  {
    id: 3,
    title: "Excellent Customer Service",
    total_videos: 10,
    total_duratoin: "3 hour and 24 minutes",
    completed: 0, // Percent
    topics: [
      {
        id: 1,
        topic: "Introduction",
        duratoin: "1m 19s",
        status: "pending",
        locked: true,
        iconColorVariant: "secondary",
      },
      {
        id: 2,
        topic: "What Is a Variable?",
        duratoin: "2m 11s",
        status: "pending",
        locked: true,
        iconColorVariant: "secondary",
      },
      {
        id: 3,
        topic: "Declaring Variables",
        duratoin: "2m 30s",
        status: "pending",
        locked: true,
        iconColorVariant: "secondary",
      },
      {
        id: 4,
        topic: "Using let to Declare Variables",
        duratoin: "3m 28s",
        status: "pending",
        locked: true,
        iconColorVariant: "secondary",
      },
      {
        id: 5,
        topic: "Naming Variables",
        duratoin: "3m 14s",
        status: "pending",
        locked: true,
        iconColorVariant: "secondary",
      },
      {
        id: 6,
        topic: "Common Errors Using Variables",
        duratoin: "3m 30s",
        status: "pending",
        locked: true,
        iconColorVariant: "secondary",
      },
    ],
  },
  {
    id: 4,
    title: "Agility",
    total_videos: 11,
    total_duratoin: "2 hour and 10 minutes",
    completed: 0, // Percent
    topics: [
      {
        id: 1,
        topic: "Introduction",
        duratoin: "1m 52s",
        status: "pending",
        locked: true,
        iconColorVariant: "secondary",
      },
      {
        id: 2,
        topic: "Clip Watched",
        duratoin: "4m 27s",
        status: "pending",
        locked: true,
        iconColorVariant: "secondary",
      },
      {
        id: 3,
        topic: "Conditionals Using if()",
        duratoin: "4m 25s",
        status: "pending",
        locked: true,
        iconColorVariant: "secondary",
      },
      {
        id: 4,
        topic: "Truthy and Falsy",
        duratoin: "3m 30s",
        status: "pending",
        locked: true,
        iconColorVariant: "secondary",
      },
      {
        id: 5,
        topic: "if ... else",
        duratoin: "3m 30s",
        status: "pending",
        locked: true,
        iconColorVariant: "secondary",
      },
    ],
  },
  {
    id: 5,
    title: "Digital",
    total_videos: 8,
    total_duratoin: "4 hour and 38 minutes",
    completed: 0, // Percent
    topics: [
      {
        id: 1,
        topic: "Introduction",
        duratoin: "1m 52s",
        status: "pending",
        locked: true,
      },
      {
        id: 2,
        topic: "Function Basics",
        duratoin: "2m 46s",
        status: "pending",
        locked: true,
      },
      {
        id: 3,
        topic: "Function Expressions",
        duratoin: "2m 32s",
        status: "pending",
        locked: true,
      },
      {
        id: 4,
        topic: "Passing Information to Functions",
        duratoin: "3m 19s",
        status: "pending",
        locked: true,
      },
      {
        id: 5,
        topic: "Function Return Values",
        duratoin: "3m 13s",
        status: "pending",
        locked: true,
      },
    ],
  },
  {
    id: 6,
    title: "Objects and the DOM",
    total_videos: 10,
    total_duratoin: "2 hour and 10 minutes",
    completed: 0, // Percent
    topics: [
      {
        id: 1,
        topic: "Introduction",
        duratoin: "1m 48s",
        status: "pending",
        locked: true,
      },
      {
        id: 2,
        topic: "Object Properties",
        duratoin: "4m 28s",
        status: "pending",
        locked: true,
      },
      {
        id: 3,
        topic: "Object Methods",
        duratoin: "3m 3s",
        status: "pending",
        locked: true,
      },
      {
        id: 4,
        topic: "Passing Objects to Functions",
        duratoin: "3m 27s",
        status: "pending",
        locked: true,
      },
      {
        id: 5,
        topic: "Standard Built-in Objects",
        duratoin: "6m 55s",
        status: "pending",
        locked: true,
      },
    ],
  },
];
export const Reviews = [
  {
    id: 1,
    student: "Max Hawkins",
    image: Avatar1,
    postedon: "2 Days ago",
    rating: 5,
    review: `<p>Lectures were at a really good pace and I never felt lost. The
        instructor was well informed and allowed me to learn and navigate
        Figma easily.</p>`,
  },
  {
    id: 2,
    student: "Arthur Williamson",
    image: Avatar1,
    postedon: "Days ago",
    rating: 5,
    review: `<p>Its pretty good.Just a reminder that there are also students with
        Windows, meaning Figma its a bit different of yours. Thank you!</p>`,
  },
  {
    id: 3,
    student: "Claire Jones",
    image: Avatar1,
    postedon: "4 Days ago",
    rating: 4.5,
    review: `<p>Great course for learning Figma, the only bad detail would be that
        some icons are not included in the assets. But 90% of the icons
        needed are included, and the voice of the instructor was very clear
        and easy to understood.</p>`,
  },
  {
    id: 4,
    student: "Bessie Pena",
    image: Avatar1,
    postedon: "5 Days ago",
    rating: 4.5,
    review: `<p>I have really enjoyed this class and learned a lot, found it very
        inspiring and helpful, thank you!<i className="em em-heart_eyes ms-2 fs-6"></i></p>`,
  },
];

export const CourseIndexData = [CourseIndex];
