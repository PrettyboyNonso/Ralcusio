import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faBolt,
  faCreditCard,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { Devices } from "./App";
export const Curriculum = ({ handleWheel, handleTarget }) => {
  const [clickedCourse, setClickedCourse] = useState("");
  const [inputPlaceholder, setInputPlaceholder] = useState(null);
  const { classList } = useContext(Devices);

  const formIconStyle = {
    fontSize: "14px",
    padding: "0.4em",
    width: "1.5em",
    height: "1.5em",
    borderRadius: "50%",
    color: "#ed7014",
    backgroundColor: "rgba(237, 112, 20, 0.2)",
    marginLeft: "0.2em",
    marginTop: "0.3em",
  };
  const chatClicked = (e) => {
    const clickedElement = e.target.closest(".chatscomponents");

    if (clickedElement) {
      const clickedId = clickedElement.id;
      setClickedCourse(clickedId);
      sessionStorage.setItem("element-clicked-Id-curri", clickedId);
      if (clickedElement.classList.contains("course-active")) {
        // do nothing
      } else if (!clickedElement.classList.contains("course-active")) {
        const allChatHead = Array.from(
          document.querySelectorAll(".chatscomponents")
        );
        allChatHead.forEach(
          (component) =>
            component.classList.contains("course-active") &&
            component.classList.remove("course-active")
        );
        clickedElement.classList.add("course-active");
        const foundClass = classList.find(
          (returnedClass) => returnedClass.id === clickedId
        );
        if (foundClass) {
          setInputPlaceholder(foundClass.className);
          sessionStorage.setItem("currentForm", foundClass.className);
        }
      }
    }
  };

  useEffect(() => {
    const sessionStored = sessionStorage.getItem("element-clicked-Id-curri");
    const currentForm = sessionStorage.getItem("currentForm");
    if (sessionStored) {
      setClickedCourse(sessionStored);
      const activeChat = document.getElementById(sessionStored);
      if (activeChat) {
        activeChat.classList.add("course-active");
      }
    }
    if (currentForm) {
      setInputPlaceholder(currentForm);
    } else {
      // const firstElemId = sessionStorage.getItem("element-clicked-Id-curri");
      // setClickedCourse(firstElemId);
      const firstClassForm = document.querySelector(".chatscomponents");
      const setCurrentForm = classList.find(
        (classes) => (classes.id = firstClassForm.id)
      );
      sessionStorage.setItem("currentForm", setCurrentForm.className);
      setInputPlaceholder(setCurrentForm.className);
    }
  }, []);

  const CourseComponent = ({ courseTitle, courseTeacher, courseId }) => {
    function cutString(str) {
      const newArry = [];
      for (const char of str) {
        newArry.push(char);
        if (newArry.length === 26) {
          for (let i = 0; i < 3; i++) {
            newArry.push(".");
          }
        } else {
          continue;
        }
        return newArry;
      }
    }
    return (
      <div
        id={courseId && courseId}
        className={`chatscomponents course-list-body ${
          courseId && clickedCourse === courseId ? "course-active" : ""
        }`}
        onClick={chatClicked}
      >
        <div className="chat-title">
          <h3>
            {courseTitle.length <= 26 ? courseTitle : cutString(courseTitle)}
          </h3>
          <p>{courseTeacher}</p>
        </div>
      </div>
    );
  };
  return (
    <div
      className="messageDiv"
      onWheel={handleWheel}
      onMouseMove={handleTarget}
    >
      <div className="chatflex">
        <div className="chatflex-head ">
          <div className="first-chat-head" style={{ paddingRight: "2em" }}>
            <h2>Courses</h2>
            <div className="chat-icons">
              <FontAwesomeIcon
                icon={faEllipsis}
                style={{ fontSize: "18px", color: "#ed7014" }}
              />
            </div>
          </div>
          <div className="second-chat-head">
            <div className="search">
              <input type="text" placeholder="Search For Courses" />
            </div>
          </div>
        </div>

        <div className="chatcomponent-div">
          {classList.map((classReturned, index) => (
            <CourseComponent
              courseTitle={classReturned.className}
              courseTeacher={`${classReturned.firstname} ${classReturned.lastname}`}
              courseId={classReturned.id}
            />
          ))}
          {/* {Object.keys(courses).map((course) => {
            const currentUser = courses[course];
            return (
              <CourseComponent
                courseTitle={currentUser.courseTitle}
                courseTeacher={currentUser.courseTeacher}
                courseId={currentUser.courseid}
              />
            );
          })} */}
        </div>
      </div>
      <div className="messageBody" style={{ width: "75%" }}>
        <div
          className="messageBodyHead"
          style={{ flexDirection: "column", width: "85%" }}
        >
          <h2 style={{ marginTop: "0.5em" }}>course planning</h2>
          <div
            className="first-messageBodyHead"
            style={{
              justifyContent: "space-between",
              marginTop: "2.5em",
              paddingBottom: "2em",
            }}
          >
            <button>26 apr 2024</button>
            <p>26 apr 2024 - 02 may 2024 </p>
            <div className="changeWeekArrow">
              <div className="arrow-formt">
                <FontAwesomeIcon icon={faAngleLeft} />
              </div>

              <div className="arrow-formt">
                <FontAwesomeIcon icon={faAngleRight} />
              </div>
            </div>
          </div>
        </div>

        <div className="chatBrief" style={{ marginTop: "8em" }}>
          <div className="planning-head-body">
            <div className="plan-head">
              <p>mon apr 26</p>
            </div>

            <div className="courses-planing">
              <div className="courses-plan">
                <p>python development</p>
              </div>
            </div>
          </div>
          <div className="planning-head-body">
            <div className="plan-head">
              <p>mon apr 26</p>
            </div>

            <div className="courses-planing">
              <div className="courses-plan">
                <p>python development</p>
                <p>python development</p>
                <p>python development</p>
                <p>python development</p>
              </div>
            </div>
          </div>
          <div className="planning-head-body">
            <div className="plan-head">
              <p>mon apr 26</p>
            </div>

            <div className="courses-planing">
              <div className="courses-plan">
                <p>python development</p>
              </div>
            </div>
          </div>
          <div className="planning-head-body">
            <div className="plan-head">
              <p>mon apr 26</p>
            </div>

            <div className="courses-planing">
              <div className="courses-plan">
                <p>python development</p>
              </div>
            </div>
          </div>
          <div className="planning-head-body">
            <div className="plan-head">
              <p>mon apr 26</p>
            </div>

            <div className="courses-planing">
              <div className="courses-plan">
                <p>python development</p>
                <p>python development</p>
                <p>python development</p>
              </div>
            </div>
          </div>
          <div className="planning-head-body">
            <div className="plan-head">
              <p>mon apr 26</p>
            </div>

            <div className="courses-planing">
              <div className="courses-plan">
                <p>python development</p>
              </div>
            </div>
          </div>
          <div className="planning-head-body">
            <div className="plan-head">
              <p>mon apr 26</p>
            </div>

            <div className="courses-planing">
              <div className="courses-plan">
                <p>python development</p>
                <p>python development</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="class-planning-tutor">
        <div className="teacher-planning-head">
          <h2>class planning</h2>
          <p>your class will go live after you complete this form</p>
        </div>
        <div className="class-form">
          <div className="class-form-head">
            <p>class informations</p>
          </div>
          <div className="first-input">
            <div className="input-1">
              <p>class name</p>
              <input type="text" value={inputPlaceholder} disabled />
            </div>

            <div className="input-2">
              <p>class view</p>
              <select name="" id="">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="second-class-input">
            <h2>select plans</h2>
            <div className="course-plans">
              <div className="free-class">
                <FontAwesomeIcon icon={faBolt} style={formIconStyle} />
                <div className="course-plan-info">
                  <h4>free plan</h4>
                  <p>
                    students will not be charged to access any content of this
                    course
                  </p>
                </div>
              </div>
              <div className="paid-class">
                <FontAwesomeIcon icon={faCreditCard} style={formIconStyle} />
                <div className="course-plan-info">
                  <h4>one-time-payment</h4>
                  <p>
                    charge students a one-time-payment fee to access this class
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="third-input-course">
            <h4>amount</h4>
            <div className="third-input-flex">
              <div className="amount-input">
                <p>class fee</p>
                <input type="number" placeholder="$0.00" />
              </div>

              <div className="deadline">
                <p>payment deadline (optional)</p>
                <input type="date" />
              </div>
            </div>
          </div>
          <div className="fourth-input-course">
            <h4>description</h4>
            <textarea
              name="description"
              placeholder="Write A Description"
            ></textarea>
          </div>
          <div className="fifth-input-course">
            <h2>choose start date</h2>
            <div className="fifth-input-flex">
              <div className="start-date">
                <p>start date</p>
                <input type="date" />
              </div>
              <div className="end-date">
                <p>end date (optional)</p>
                <input type="date" />
              </div>
            </div>
          </div>
          <div className="last-input-course">
            <button>save changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};
