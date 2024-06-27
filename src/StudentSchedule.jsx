import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import {
  faSearch,
  faBars,
  faX,
  faCirclePlus,
  faSquarePlus,
  faCheck,
  faCircleCheck,
  faUser,
  faBook,
  faClock,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { Devices } from "./App";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
export const StudentSchedule = () => {
  const { listenToClasses, handleClassAdd } = useContext(Devices);

  const handleAddToClass = (e) => {
    handleClassAdd(e);
    listenToClasses();
  };

  const Classes = [
    {
      title: "Introduction to React",
      classTime: "previous class",
      tutor: "Mosh Hamedani",
      curriculum: "React Basics, JSX, Components, State and Props",
      duration: "1 hour 30 minutes",
      isAttended: "attended",
      classDate: "Monday Apr 13",
    },
    {
      title: "Advanced JavaScript",
      classTime: "next class",
      tutor: "Jane Smith",
      curriculum: "Closures, Promises, Async/Await, ES6 Features",
      duration: "1 hour",
      startingTime: "33 minutes left",
      classDate: "Wednesday Apr 15",
    },
  ];

  const StudentClasses = ({ classObj }) => {
    return (
      <div className="student-classes">
        <div className="specific-class">
          <p>{classObj.classTime}</p>
        </div>
        <div className="date-class-state">
          <p>{classObj.classDate}</p>
          <p
            style={{
              color: classObj.classTime === "previous class" ? "green" : "red",
              backgroundColor:
                classObj.classTime === "previous class"
                  ? "rgba(0, 128, 0, 0.1)"
                  : " rgba(255, 0, 0, 0.1)",
            }}
          >
            <FontAwesomeIcon
              icon={
                classObj.classTime === "previous class"
                  ? faCircleCheck
                  : faClock
              }
            />
            {classObj.classTime === "previous class"
              ? classObj.isAttended
              : classObj.startingTime}
          </p>
        </div>

        <div className="class-title-name">
          <h2>{classObj.title}</h2>
        </div>
        <div className="student-class-detail">
          <p>details</p>
          <p>
            <FontAwesomeIcon icon={faUser} style={{ color: "#ed7014" }} />
            {classObj.tutor}
          </p>
          <p>
            <FontAwesomeIcon icon={faBook} style={{ color: "#ed7014" }} />
            {classObj.curriculum}
          </p>
          <p>
            <FontAwesomeIcon icon={faClock} style={{ color: "#ed7014" }} />
            {classObj.duration}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="app-side">
      <div className="app-side-head">
        <h2>welcome back!</h2>
        <div className="app-second-head">
          <div className="search">
            <input
              type="text"
              placeholder="search for courses, teachers, fellows"
            />
            <FontAwesomeIcon
              icon={faSearch}
              style={{
                position: "absolute",
                right: "0.5em",
                top: "0.5em",
                color: "rgb(41, 41, 41)",
                cursor: "pointer",
              }}
            />
          </div>
          <div className=" responsive-search">
            <FontAwesomeIcon
              icon={faSearch}
              style={{ fontSize: "16px", cursor: "pointer" }}
            />
          </div>
          <div className="notificationBell">
            <FontAwesomeIcon
              icon={faBell}
              style={{ fontSize: "16px", cursor: "pointer" }}
            />
          </div>
        </div>
      </div>

      <div className="motivation-of-the-day">
        <div className="top-left-corner"></div>
        <div className="top-left-corner-effect"></div>
        <div className="facts-head">
          <p>facts of the day</p>
        </div>
        <div className="actual-fact">
          <h2>physics</h2>
          <p>light from the earth takes just 1255 seconds to reach the moon</p>
        </div>

        <div className="next-motivation-flex">
          <div className="font-motivation">
            <FontAwesomeIcon icon={faHeart} style={{ color: "white" }} />
          </div>
          <button>more quotes</button>
        </div>
      </div>

      <div className="student-groups">
        <StudentClasses classTime={"previous class"} classObj={Classes[0]} />
        <StudentClasses classTime={"next class"} classObj={Classes[1]} />
        {/* <p className = "student-p">No classes, enjoy the silence🥂🥂</p> */}
      </div>
    </div>
  );
};
