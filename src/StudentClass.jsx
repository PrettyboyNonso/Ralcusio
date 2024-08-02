import { useContext, useEffect, useReducer, useState } from "react";
import { Dates } from "./DateUI";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";
import {
  faCalendarDays,
  faCircleCheck,
  faCircleXmark,
  faCreditCard,
  faPeopleLine,
  faSearch,
  faSort,
} from "@fortawesome/free-solid-svg-icons";

export const StudentClass = () => {
  const [activeNav, setActiveNav] = useState("");
  const [viewClassState, dispatchClassState] = useReducer(reducerClassState, {
    viewed: false,
  });
  const [typeOfClass, setTypeOfClass] = useState("");

  function reducerClassState(state, action) {
    switch (action.type) {
      case "OPEN":
        return { viewed: true };
      case "CLOSE":
        return { viewed: false };
      default:
        return state;
    }
  }

  const handleClassNavCursor = (e) => {
    const clickedElem = e.target.closest(".first-flex-create-type-sec");
    const activeElementId = clickedElem.id;
    const activeElem = document.getElementById(activeElementId);
    if (activeElem) {
      setActiveNav(activeElementId);
      sessionStorage.setItem("activeNav", activeElementId);
      if (activeElem.classList.contains("active-create-navigation")) {
        // do nothing
      } else if (!activeElem.classList.contains("active-create-navigation")) {
        document
          .querySelectorAll(".first-flex-create-type-sec")
          .forEach((value, index) => {
            if (value.classList.contains("active-create-navigation")) {
              value.classList.remove("active-create-navigation");
            }
          });
        activeElem.classList.add("active-create-navigation");
      }
    }
  };
  const AllClasses = () => {
    const handleTypeOfClass = (e) => {
      const targetVal = e.target.closest(".second-head");
      const targetId = targetVal.id;
      console.log(targetId);
      setTypeOfClass(targetId);
      sessionStorage.setItem("classTypeId", targetId);
      const clickedElem = document.getElementById(targetId);
      if (clickedElem) {
        if (clickedElem.classList.contains("all-class-active")) {
          // do nothing
        } else if (!clickedElem.classList.contains("all-class-active")) {
          document.querySelectorAll(".second-head").forEach((value, index) => {
            if (value.classList.contains("all-class-active")) {
              value.classList.remove("all-class-active");
            }
          });
          clickedElem.classList.add("all-class-active");
        }
      }
    };

    useEffect(() => {
      const sessionStored = sessionStorage.getItem("classTypeId");
      if (sessionStored) {
        setTypeOfClass(sessionStored);
        const activeElem = document.getElementById(sessionStored);
        if (activeElem) activeElem.classList.add("all-class-active");
      } else {
        sessionStorage.setItem("classTypeId", "all");
        setTypeOfClass("all");
      }
    }, []);

    const AllClassesBody = () => {
      return (
        <div className="all-class-body-checkbox">
          <input type="checkbox" />
          <div className="all-classes-body">
            <p>learning and setting example as a leader - full course</p>

            <p>December, 26, 2023</p>

            <p>active</p>

            <p>free</p>
          </div>
        </div>
      );
    };

    const AllClassesHead = () => {
      return (
        <div className="all-class-checkbox">
          <input type="checkbox" />
          <div className="all-classes-table-head">
            <p>name</p>
            <p>date</p>
            <p>status</p>
            <p>price</p>
          </div>
        </div>
      );
    };
    return (
      <div className="student-all-classes">
        <div className="all-class-head">
          <div className="head-part">
            <h2>classes</h2>
            <small>
              classes/{document.getElementById(typeOfClass)?.innerText}
            </small>
          </div>
          <button onClick={() => dispatchClassState({ type: "OPEN" })}>
            join a class
          </button>
        </div>
        <div className="student-second-head-flex">
          <div className="all-classes-second-head">
            <div
              className={`second-head ${
                typeOfClass === "all" && "all-class-active"
              }`}
              id="all"
              onClick={handleTypeOfClass}
            >
              <p>all</p>
            </div>
            <div
              className={`second-head ${
                typeOfClass === "draft" && "all-class-active"
              }`}
              id="draft"
              onClick={handleTypeOfClass}
            >
              <p>free </p>
            </div>
            <div
              className={`second-head ${
                typeOfClass === "archived" && "all-class-active"
              }`}
              id="archived"
              onClick={handleTypeOfClass}
            >
              <p>paid </p>
            </div>
          </div>

          <div className="classes-icons">
            <button>View Details</button>
            <FontAwesomeIcon
              icon={faSort}
              style={{
                // backgroundColor: "#ed7014",
                border: "1px solid #ed7014",
                color: "#ed7014",
                padding: "0.2em 0.6em",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            />
          </div>
        </div>
        <AllClassesHead />
        {typeOfClass === "all" && (
          <div className="all-class-sec">
            <AllClassesBody />
            <AllClassesBody />
            <AllClassesBody />
          </div>
        )}
        {typeOfClass === "draft" && (
          <div className="all-class-sec">
            <AllClassesBody />
            <AllClassesBody />
          </div>
        )}
        {typeOfClass === "archived" && (
          <div className="all-class-sec">
            <AllClassesBody />
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    const sessionStored = sessionStorage.getItem("activeNav");
    if (sessionStored) {
      setActiveNav(sessionStored);
      const alreadyClickedElem = document.getElementById(activeNav);
      if (alreadyClickedElem) {
        alreadyClickedElem.classList.add("active-create-navigation");
      }
    } else {
      sessionStorage.setItem("activeNav", "create-your-course");
      setActiveNav("create-your-course");
    }
    console.log("re-rendered");
  }, [activeNav]);

  const JoinClass = () => {
    return (
      <div className="join-class">
        <div className="join-class-head">
          <h2>join class</h2>
          <p>
            join a class by entering the class id. for paid classes, you would
            be required to pay before you gain access to the class
          </p>
        </div>

        <div className="input-for-class">
          <div className="input-for-class-head">
            <h2>enter class id</h2>
            <FontAwesomeIcon
              icon={faCircleXmark}
              style={{ color: "#ed7014", cursor: "pointer" }}
              onClick={() => dispatchClassState({ type: "CLOSE" })}
            />
          </div>
          <input type="text" placeholder="Enter Class Id" />
          <button>join class</button>
        </div>
      </div>
    );
  };

  return (
    <div className="create-class-teacher">
      <>{viewClassState.viewed ? <JoinClass /> : <AllClasses />}</>
    </div>
  );
};
