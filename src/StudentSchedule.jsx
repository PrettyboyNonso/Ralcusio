import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import {
  faSearch,
  faCircleCheck,
  faUser,
  faBook,
  faClock,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { Devices } from "./App";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useEffect } from "react";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { database } from "./backend";
export const StudentSchedule = () => {
  const { userDataState, FetchFacts, fetchedFact, setFetchedFact } =
    useContext(Devices);

  const [loading, setLoading] = useState(false);
  const [lovedQuote, setLovedQuote] = useState(false);
  const [userInput, setUserInput] = useState("");
  const findPeople = async (e) => {
    setUserInput(e.target.value);
    const dataBaseRef = collection(database, "users");
    const SearchQuery = query(dataBaseRef, where("firstName", "==", userInput));
    const Users = await getDocs(SearchQuery);
    Users.forEach((snap) => {
      console.log(snap.data());
    });
  };

  async function MoreQuotes() {
    try {
      setLoading(true);
      const newfact = await FetchFacts();
      sessionStorage.setItem("dataFact", JSON.stringify(newfact));
      setFetchedFact(JSON.parse(sessionStorage.getItem("dataFact")));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

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

  const Spinner = () => {
    return (
      <div
        className="spin"
        style={{
          width: "1.3em",
          height: "1.3em",
          border: "2px solid black",
          borderTop: "2px solid white",
          borderRadius: "50%",
        }}
      ></div>
    );
  };

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
              placeholder="search for teachers or fellows"
              onChange={(e) => findPeople(e)}
            />
            <FontAwesomeIcon
              icon={faSearch}
              style={{
                position: "absolute",
                right: "0.5em",
                top: "0.5em",
                color: "rgb(41, 41, 41)",
                cursor: "pointer",
                backgroundColor: "white",
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
          <p>quote of the day</p>
        </div>
        <div className="actual-fact">
          <h2>{fetchedFact[0]?.author}</h2>
          <p>{`"${fetchedFact[0]?.quote}"`}</p>
        </div>

        <div className="next-motivation-flex">
          {/* <div className="font-motivation">
            <FontAwesomeIcon
              icon={faHeart}
              style={{ color: lovedQuote ? "red" : "white", cursor: "pointer" }}
              onClick={quoteFunc}
            />
          </div> */}
          <button onClick={MoreQuotes}>
            {loading ? <Spinner /> : "more quotes"}
          </button>
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
