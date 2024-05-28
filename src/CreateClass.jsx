import { useEffect, useState } from "react";
import { Dates } from "./DateUI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCalendarDays,
  faCircleCheck,
  faCirclePlus,
  faCreditCard,
  faPeopleLine,
  faSearch,
  faSort,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";

export const CreateClass = () => {
  const [activeNav, setActiveNav] = useState("");
  const [toggleOnCourse, setToggleOnCourse] = useState(false);
  const [toggleOnSchedule, setToggleOnSchedule] = useState(false);
  const [discountClick, setDiscountClick] = useState(false);
  const [showOther, setShowOther] = useState(false);
  const [typeOfClass, setTypeOfClass] = useState("");

  const addDiscount = () => {
    setDiscountClick(!discountClick);
  };

  const handleToggleCourse = () => {
    setToggleOnCourse(!toggleOnCourse);
  };

  const handleToggleSchedule = () => {
    setToggleOnSchedule(!toggleOnSchedule);
  };

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

  const ToggleBtn = ({ toggleFunc, toggleState }) => {
    return (
      <div
        className={`toggle ${toggleState ? "toggle-on" : ""}`}
        onClick={toggleFunc}
      >
        <div className="toggle-circle"></div>
      </div>
    );
  };

  const CoursePlanning = () => {
    const handleChangeInSelect = (e) => {
      e.target.value === "other" ? setShowOther(true) : setShowOther(false);
      console.log(showOther);
    };
    return (
      <div className="class-create-details-sec">
        <div className="class-create-details-head">
          <h2>Course Planning</h2>
          <p>
            begin the creation of your course, fill out details like, course
            name, descriptions, etc
          </p>
        </div>
        <form action="">
          <div className="course-name">
            <p htmlFor="">course name</p>
            <input type="text" placeholder="Example - Financial Growth" />
          </div>

          <div className="class-date">
            {!showOther && (
              <>
                <p>Select Course Area</p>

                <select
                  id="course-area"
                  name="course-area"
                  className="course-select"
                  onChange={handleChangeInSelect}
                >
                  <optgroup label="Technology">
                    <option value="web-development">Web Development</option>
                    <option value="data-science">Data Science</option>
                    <option value="cyber-security">Cyber Security</option>
                    <option value="software-engineering">
                      Software Engineering
                    </option>
                  </optgroup>
                  <optgroup label="Personal Development">
                    <option value="personal-relationship">
                      Personal Relationship
                    </option>
                    <option value="mental-wellness">Mental Wellness</option>
                    <option value="time-management">Time Management</option>
                    <option value="leadership">Leadership</option>
                  </optgroup>
                  <optgroup label="Business">
                    <option value="entrepreneurship">Entrepreneurship</option>
                    <option value="marketing">Marketing</option>
                    <option value="finance">Finance</option>
                    <option value="management">Management</option>
                  </optgroup>
                  <optgroup label="Arts">
                    <option value="visual-arts">Visual Arts</option>
                    <option value="music">Music</option>
                    <option value="literature">Literature</option>
                    <option value="performing-arts">Performing Arts</option>
                  </optgroup>
                  <optgroup label="Science">
                    <option value="biology">Biology</option>
                    <option value="chemistry">Chemistry</option>
                    <option value="physics">Physics</option>
                    <option value="environmental-science">
                      Environmental Science
                    </option>
                  </optgroup>
                  <optgroup label="Health">
                    <option value="nutrition">Nutrition</option>
                    <option value="fitness">Fitness</option>
                    <option value="public-health">Public Health</option>
                    <option value="medicine">Medicine</option>
                  </optgroup>
                  <optgroup label="Language">
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                    <option value="german">German</option>
                  </optgroup>
                  <optgroup label="Education">
                    <option value="teaching-methods">Teaching Methods</option>
                    <option value="curriculum-design">Curriculum Design</option>
                    <option value="educational-technology">
                      Educational Technology
                    </option>
                    <option value="special-education">Special Education</option>
                  </optgroup>
                  <option value="other">Other</option>
                </select>
              </>
            )}

            {showOther && (
              <>
                <p>Please specify</p>
                <input
                  type="text"
                  id="other-course-area"
                  name="other-course-area"
                  placeholder="Specify your course area"
                />
              </>
            )}
          </div>

          <div className="course-level">
            <p>Select Course Level</p>
            <select
              id="course-level"
              name="course-level"
              className="level-select"
            >
              <option value="general">General</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>
          </div>

          <div className="class-desc">
            <p htmlFor="">course description</p>
            <textarea name="" id=""></textarea>
          </div>

          <div className="toggle-btn continue-btn">
            <div
              style={{ display: "flex", gap: "0.4em", alignItems: "center" }}
            >
              <p>free course</p>
              <ToggleBtn
                toggleFunc={handleToggleCourse}
                toggleState={toggleOnCourse}
              />
            </div>

            <button>continue</button>
          </div>
        </form>
      </div>
    );
  };

  const CoursePricing = () => {
    return (
      <div className="course-pricing">
        <div className="course-pricing-head">
          <h2>course pricing</h2>
          <p>
            create a detailed pricing plan for your course. here is a breakdown
            to help you structure your pricing
          </p>
        </div>
        <form action="">
          <div className="pricing-head">
            <h3>price</h3>
            <div className="free-toggle">
              <h3>free</h3>
              <ToggleBtn
                toggleFunc={handleToggleCourse}
                toggleState={toggleOnCourse}
              />
            </div>
          </div>
          <div className="add-price">
            <label htmlFor="price">normal price</label>
            <FontAwesomeIcon icon={faArrowRight} />
            <div className="price-input">
              <select name="" id="">
                <option value="usd">USD</option>
                <option value="ngn">NGN</option>
                <option value="gbp">GBP</option>
              </select>
              <input type="number" />
            </div>
            <div className="add-discount-btn">
              <button onClick={addDiscount}>
                <FontAwesomeIcon icon={faPlus} />
                add discount
              </button>
            </div>
          </div>

          {discountClick && (
            <div className="add-price">
              <label htmlFor="price">discount</label>
              <FontAwesomeIcon icon={faArrowRight} />
              <div className="price-input">
                <select name="" id="">
                  <option value="usd">USD</option>
                  <option value="ngn">NGN</option>
                  <option value="gbp">GBP</option>
                </select>
                <input type="number" disabled />
              </div>
              <div className="discount-input">
                <select name="" id="">
                  <option value="5%">5%</option>
                  <option value="10%">10%</option>
                  <option value="20%">20%</option>
                  <option value="30%">30%</option>
                  <option value="40%">40%</option>
                  <option value="50%">50%</option>
                  <option value="60%">60%</option>
                  <option value="70%">70%</option>
                  <option value="80%">80%</option>
                </select>
                <input type="text" disabled />
              </div>
            </div>
          )}
        </form>
      </div>
    );
  };

  const CourseSchedule = () => {
    const CourseCurriculum = () => {
      return (
        <div className="course-curriculum">
          <div className="course-curriculum-head">
            <h3>learning</h3>
            <div className="curri-btns">
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.3em",
                }}
              >
                <FontAwesomeIcon
                  icon={faCirclePlus}
                  style={{ color: "#ed7014" }}
                />
                add new
              </button>
              <button style={{ backgroundColor: "#ed7014", color: "white" }}>
                publish
              </button>
            </div>
          </div>
          <form action="">
            <div className="curri-input-1">
              <p>curriculum title</p>
              <input
                type="text"
                placeholder="Lesson one - Learning The Basics"
              />
            </div>
            <div className="curri-input-2">
              <p>start date</p>
              <input type="date" />
            </div>
            <div className="curri-input-3">
              <p>end date</p>
              <input type="date" />
            </div>

            <div className="class-desc">
              <p htmlFor="">add a description</p>
              <textarea name="" id=""></textarea>
            </div>
          </form>
        </div>
      );
    };

    return (
      <div className="classScheduleSec">
        <div className="class-schedule-head">
          <h2>course schedule</h2>
          <p>
            create a course schedule or curriculum if your course spans multiple
            days.
          </p>
        </div>

        <form action="">
          <div className="schedule-1">
            <p>when does your course start?</p>
            <input type="date" />
          </div>
          <div className="schedule-2">
            <p>when does your course end?</p>
            <input type="date" />
          </div>
          <div className="schedule-3">
            <p>create a curriculum</p>
            <ToggleBtn
              toggleFunc={handleToggleSchedule}
              toggleState={toggleOnSchedule}
            />
          </div>
          {toggleOnSchedule && <CourseCurriculum />}
          <div className="create-class-btn">
            <button>create class</button>
          </div>
        </form>
      </div>
    );
  };

  const PricingUi = () => {
    return (
      <div className="pricing-ui">
        <div className="pricing-ui-head">
          <h2>pricing</h2>
          <p>define a time range for your pricing plans</p>
        </div>

        <form action="">
          <div className="pricing-subheading">
            <p>discount price</p>
          </div>

          <div className="discount-1">
            <p>start date</p>
            <input type="date" style={{ marginRight: "0.6em" }} />
            <input type="time" />
          </div>
          <div className="discount-1">
            <p>end date</p>
            <input type="date" style={{ marginRight: "0.6em" }} />
            <input type="time" />
          </div>
        </form>

        <form action="">
          <div className="pricing-subheading">
            <p>normal price</p>
          </div>

          <div className="discount-1">
            <p>start date</p>
            <input type="date" style={{ marginRight: "0.6em" }} />
            <input type="time" />
          </div>
          <div className="discount-1">
            <p>end date</p>
            <input type="date" style={{ marginRight: "0.6em" }} />
            <input type="time" />
          </div>
        </form>

        <div className="price-btn">
          <button>
            <FontAwesomeIcon icon={faPlus} />
            add new plan
          </button>
        </div>
      </div>
    );
  };

  const ScheduleUi = () => {
    const ScheduleCurriculum = () => {
      return (
        <div className="schedule-curriculum">
          <div className="schedule-tag">
            <p>language</p>
          </div>
          <div className="course-title">
            <h3>the history of france and their language</h3>
            <FontAwesomeIcon icon={faTrashCan} style={{ color: "#ed7014" }} />
          </div>
          <div className="schedule-level">
            <p>level :</p>
            <p>intermediate</p>
          </div>
        </div>
      );
    };

    return (
      <div className="schedule-ui">
        <div className="schedule-ui-head">
          <h2>curriculums</h2>
        </div>
        <div className="schedule-curriculum-flex">
          <ScheduleCurriculum />
          <ScheduleCurriculum />
          <ScheduleCurriculum />
        </div>
      </div>
    );
  };

  const AllClasses = () => {
    const handleTypeOfClass = (e) => {
      const targetVal = e.target.closest(".second-head");
      const targetId = targetVal.id;

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
      <div className="all-classes">
        <div className="all-class-head">
          <h2>all classes</h2>
        </div>
        <div className="second-head-flex">
          <div className="all-classes-second-head">
            <div className="second-head" id="all" onClick={handleTypeOfClass}>
              <p>all</p>
            </div>
            <div className="second-head" id="draft" onClick={handleTypeOfClass}>
              <p>drafts</p>
            </div>
            <div
              className="second-head"
              id="archived"
              onClick={handleTypeOfClass}
            >
              <p>archived</p>
            </div>
          </div>

          <div className="classes-icons">
            <FontAwesomeIcon
              icon={faSearch}
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
  }, [activeNav]);

  return (
    <div className="create-class-teacher">
      <div className="create-class-head-teacher">
        <div className="teacher-create-class-h2">
          <h2>create class</h2>
          <small>draft</small>
        </div>
        <div className="teacher-create-btn">
          <button className="save-btn">save</button>
          <button className="publish-btn">publish</button>
        </div>
      </div>
      <div className="create-class-navigation">
        <p>
          <span>classes</span> / create class
        </p>
      </div>
      <div className="create-class-type-sec">
        <div className="create-type-sec-p">
          <div
            className="first-flex-create-type-sec"
            id="create-your-course"
            onClick={handleClassNavCursor}
          >
            <FontAwesomeIcon
              icon={faCircleCheck}
              style={{ color: "#ed7014" }}
            />
            <p>course planning</p>
          </div>
          <div
            className={`create-type-sec-lining ${
              activeNav === `create-your-course` && `lining-active`
            }`}
          ></div>
        </div>

        <div className="create-type-sec-p">
          <div
            className="first-flex-create-type-sec"
            id="pricing-planning"
            onClick={handleClassNavCursor}
          >
            <FontAwesomeIcon icon={faCreditCard} style={{ color: "#ed7014" }} />
            <p>pricing planning</p>
          </div>
          <div
            className={`create-type-sec-lining ${
              activeNav === `pricing-planning` && `lining-active`
            }`}
          ></div>
        </div>

        <div className="create-type-sec-p">
          <div
            className="first-flex-create-type-sec"
            id="schedule-planning"
            onClick={handleClassNavCursor}
          >
            <FontAwesomeIcon
              icon={faCalendarDays}
              style={{ color: "#ed7014" }}
            />
            <p>course schedule</p>
          </div>
          <div
            className={`create-type-sec-lining ${
              activeNav === `schedule-planning` && `lining-active`
            }`}
          ></div>
        </div>

        <div className="create-type-sec-p">
          <div
            className="first-flex-create-type-sec"
            id="all-classes"
            onClick={handleClassNavCursor}
          >
            <FontAwesomeIcon icon={faPeopleLine} style={{ color: "#ed7014" }} />
            <p>all classes</p>
          </div>
          <div
            className={`create-type-sec-lining ${
              activeNav === `all-classes` && `lining-active`
            }`}
          ></div>
        </div>
      </div>

      <>
        {activeNav === "create-your-course" && (
          <div className="create-class-sec">
            <CoursePlanning />
            <div className="create-class-calender-sec">
              {activeNav === "create-your-course" && (
                <Dates color={"rgb(227, 227, 227)"} />
              )}
            </div>
          </div>
        )}

        {activeNav === "schedule-planning" && (
          <div className="create-class-sec">
            <CourseSchedule />
            <div className="create-class-calender-sec">
              {activeNav === "schedule-planning" && <ScheduleUi />}
            </div>
          </div>
        )}
        {activeNav === "pricing-planning" && (
          <div className="create-class-sec">
            <CoursePricing />
            <div className="create-class-calender-sec">
              {activeNav === "pricing-planning" && <PricingUi />}
            </div>
          </div>
        )}
        {activeNav === "all-classes" && <AllClasses />}
      </>
    </div>
  );
};
