import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import {
  faSearch,
  faCircleCheck,
  faUser,
  faBook,
  faClock,
  faBell,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Devices } from "./App";
import { useEffect } from "react";
import { LoadingHome } from "./LoadingHome";
import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "./backend";
export const StudentSchedule = () => {
  const {
    FetchFacts,
    fetchedFact,
    setFetchedFact,
    searchInput,
    findPeople,
    searchPeopleLoading,
  } = useContext(Devices);

  const [loading, setLoading] = useState(false);
  const [lovedQuote, setLovedQuote] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [StudentClassArray, setStudentClassArray] = useState(
    JSON.parse(sessionStorage.getItem("studentClass"))
  );
  const [upcomming, setUpcomming] = useState(null);
  const [previousClass, setPreviousClass] = useState(null);
  const [upcommingStatus, setClassStatus] = useState("");

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

  //  Dummy Mockup For Previous And Future Classes
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

  const getPreviousClass = () => {
    const todaysDate = new Date();
    const previousClass = StudentClassArray?.flatMap((value) => {
      return value?.curriculum?.filter(
        (myClass) => new Date(myClass?.endDate) <= todaysDate
      );
    });

    const sortedClass = previousClass?.sort(
      (a, b) => a?.startDate - b?.startDate
    );
    return sortedClass;
  };

  const getUpcommingClasses = () => {
    const todaysDate = new Date();
    const upcomingClass = StudentClassArray?.flatMap((value) => {
      return value?.curriculum?.filter(
        (myClass) =>
          (new Date(myClass?.startDate) >= todaysDate &&
            new Date(myClass?.endDate) > todaysDate) ||
          (new Date(myClass?.startDate) <= todaysDate &&
            new Date(myClass?.endDate) > todaysDate)
      );
    });

    console.log(upcomingClass);
    const sortedClass = upcomingClass?.sort(
      (a, b) => a?.startDate - b?.startDate
    );
    return sortedClass;
  };

  // Calls The "getUpcommingClasses" Function
  useEffect(() => {
    const upcomming = getUpcommingClasses();
    const previous = getPreviousClass();
    setUpcomming(upcomming);
    setPreviousClass(previous);
  }, [StudentClassArray]);

  useEffect(() => {
    if (upcomming) {
      const todayDate = new Date();
      if (
        (new Date(upcomming[0]?.startDate) >= todayDate &&
          new Date(upcomming[0]?.endDate) > todayDate) ||
        (new Date(upcomming[0]?.startDate) <= todayDate &&
          new Date(upcomming[0]?.endDate) > todayDate)
      ) {
        console.log("ongoing");
        setClassStatus("ongoing");
      } else {
        setClassStatus("class ended");
        console.log("class ended");
      }
    }
  }, [upcomming]);

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
    const [tutorName, setTutorName] = useState("");
    const fetchTutor = async () => {
      const dbRef = collection(database, "users");
      const q = query(dbRef, where("userId", "==", classObj?.tutorId));
      const docUment = await getDocs(q);
      setTutorName(docUment?.docs[0].data()?.fullName);
    };

    useEffect(() => {
      fetchTutor();
    }, []);
    return (
      <div className="student-classes">
        <div className="specific-class">
          <p>
            {(new Date(classObj?.startDate) >= new Date() &&
              new Date(classObj?.endDate) > new Date()) ||
            (new Date(classObj?.startDate) <= new Date() &&
              new Date(classObj?.endDate) > new Date())
              ? "next class"
              : "previous class"}
          </p>
        </div>
        <div className="date-class-state">
          <p>{new Date(classObj?.startDate)?.toLocaleDateString()}</p>
          <p
            style={{
              color:
                (new Date(classObj?.startDate) >= new Date() &&
                  new Date(classObj?.endDate) > new Date()) ||
                (new Date(classObj?.startDate) <= new Date() &&
                  new Date(classObj?.endDate) > new Date())
                  ? "red"
                  : "green",
              backgroundColor:
                new Date(classObj?.startDate) >= new Date() &&
                new Date(classObj?.endDate) > new Date()
                  ? "rgba(255, 0, 0, 0.1) "
                  : " rgba(0, 128, 0, 0.1)",
            }}
          >
            <FontAwesomeIcon
              icon={
                new Date(classObj?.startDate) >= new Date() &&
                new Date(classObj?.endDate) > new Date()
                  ? faClock
                  : faCircleCheck
              }
            />
            {new Date(classObj?.endDate) < new Date()
              ? "attended"
              : (() => {
                  if (new Date(classObj?.startDate) <= new Date()) {
                    return <p>{`class ongoing...`}</p>;
                  } else {
                    const now = new Date();
                    const startDate = new Date(classObj?.startDate);
                    const timeDiff = startDate - now;

                    const totalMinutes = Math.round(timeDiff / (1000 * 60));

                    const hours = Math.floor(totalMinutes / 60);
                    const minutes = totalMinutes % 60;

                    return (
                      <p>{`starts in ${hours} hour${
                        hours !== 1 ? "s" : ""
                      } : ${minutes} minute${minutes !== 1 ? "s" : ""}`}</p>
                    );
                  }
                })()}
          </p>
        </div>

        <div className="class-title-name">
          <h2>{classObj?.title}</h2>
        </div>
        <div className="student-class-detail">
          <p>details</p>
          <p>
            <FontAwesomeIcon icon={faUser} style={{ color: "#ed7014" }} />
            {tutorName}
          </p>
          {/* <p>
            <FontAwesomeIcon icon={faBook} style={{ color: "#ed7014" }} />
            {classObj.curriculum}
          </p> */}
          <p>
            <FontAwesomeIcon icon={faClock} style={{ color: "#ed7014" }} />
            {`${Math.floor(
              (new Date(classObj?.endDate) - new Date(classObj?.startDate)) /
                60000
            )} minutes`}
          </p>
          {(new Date(classObj?.startDate) >= new Date() &&
            new Date(classObj?.endDate) > new Date()) ||
            (new Date(classObj?.startDate) <= new Date() &&
              new Date(classObj?.endDate) > new Date() && (
                <button
                  style={{
                    marginTop: "0.8em",
                    backgroundColor: "green",
                    marginLeft: "0.5em",
                    border: "1px solid grey",
                    color: "white",
                    fontFamily: "Karla, sans-serif",
                    fontSize: "13px",
                    padding: "0.3em 0.8em",
                    width: "fit-content",
                    textTransform: "capitalize",
                    borderRadius: "2px",
                    cursor: "pointer",
                  }}
                >
                  join class
                </button>
              ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {searchPeopleLoading && <LoadingHome />}
      <div className="app-side">
        <div className="app-side-head">
          <h2>welcome back!</h2>
          <div className="app-second-head">
            <div className="search">
              <input
                type="text"
                placeholder="search for teachers or fellows"
                ref={searchInput}
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
                onClick={findPeople}
              />
            </div>
            <div
              className=" responsive-search"
              onClick={() => setOpenSearch(!openSearch)}
            >
              <FontAwesomeIcon
                icon={openSearch ? faXmark : faSearch}
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

        {openSearch && (
          <div className="responsive-search-two">
            <input
              type="text"
              placeholder="search for teachers or fellows"
              ref={searchInput}
            />
            <FontAwesomeIcon
              icon={faSearch}
              style={{
                position: "absolute",
                right: "0.5em",
                top: "0.8em",
                color: "rgb(41, 41, 41)",
                cursor: "pointer",
                backgroundColor: "white",
              }}
              onClick={findPeople}
            />
          </div>
        )}

        <div className="motivation-of-the-day">
          <div className="top-left-corner"></div>
          <div className="top-left-corner-effect"></div>
          <div className="facts-head">
            <p>quote of the day</p>
          </div>
          <div className="actual-fact">
            <h2>{fetchedFact[0]?.author}</h2>
            <p>
              {fetchedFact[0].quote.length <= 221
                ? `"${fetchedFact[0]?.quote}"`
                : `"${fetchedFact[0]?.quote.slice(0, 221)}..."`}
            </p>
          </div>

          <div className="next-motivation-flex">
            <button onClick={MoreQuotes}>
              {loading ? <Spinner /> : "more quotes"}
            </button>
          </div>
        </div>

        <div style={{ marginTop: "1em" }}>
          <div className="student-groups">
            {previousClass && previousClass.length > 0 && (
              <StudentClasses classObj={previousClass[0]} />
            )}
            {upcomming &&
              upcomming.length > 0 &&
              upcommingStatus === "ongoing" && (
                <StudentClasses classObj={upcomming[0]} />
              )}

            {!upcomming && !previousClass && (
              <p className="student-p">No classes, enjoy the silence🥂🥂</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
