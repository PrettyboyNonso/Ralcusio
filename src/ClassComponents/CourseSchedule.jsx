import { useContext } from "react";
import { Devices } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
export const CourseSchedule = ({
  createClassAction,
  publishCurriculum,
  curriculumTitleRef,
  curriculumStartDate,
  setCurriculumStartDate,
  curriculumEndDate,
  setCurriculumEndDate,
  curriculumDescriptionRef,
}) => {
  const { dateState } = useContext(Devices);

  const CourseCurriculum = ({
    publishCurriculum,
    curriculumTitleRef,
    curriculumStartDate,
    setCurriculumStartDate,
    curriculumEndDate,
    setCurriculumEndDate,
    curriculumDescriptionRef,
  }) => {
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
            <button
              style={{ backgroundColor: "#ed7014", color: "white" }}
              onClick={(e) => publishCurriculum(e)}
            >
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
              ref={curriculumTitleRef}
            />
          </div>
          <div className="curri-input-2">
            <p>start date</p>
            <DatePicker
              popperPlacement="bottom-start"
              showTimeSelect={true}
              dateFormat={"yy-MM-dd h:mm aa"}
              showYearDropdown
              minDate={new Date()}
              placeholderText={dateState}
              selected={curriculumStartDate}
              onChange={(curriculumStartDate) =>
                setCurriculumStartDate(curriculumStartDate)
              }
            />
          </div>
          <div className="curri-input-3">
            <p>end date</p>
            {curriculumStartDate ? (
              <DatePicker
                showTimeSelect={true}
                popperPlacement="bottom-start"
                dateFormat={"yy-MM-dd h:mm aa"}
                showYearDropdown
                minDate={curriculumStartDate}
                placeholderText={dateState}
                selected={curriculumEndDate}
                onChange={(curriculumEndDate) =>
                  setCurriculumEndDate(curriculumEndDate)
                }
              />
            ) : (
              <p>-- ---- --- ---- </p>
            )}
          </div>

          <div className="class-desc">
            <p htmlFor="">add a description</p>
            <textarea name="" id="" ref={curriculumDescriptionRef}></textarea>
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
        <CourseCurriculum
          publishCurriculum={publishCurriculum}
          curriculumTitleRef={curriculumTitleRef}
          curriculumStartDate={curriculumStartDate}
          setCurriculumStartDate={setCurriculumStartDate}
          curriculumEndDate={curriculumEndDate}
          setCurriculumEndDate={setCurriculumEndDate}
          curriculumDescriptionRef={curriculumDescriptionRef}
        />
        <div className="create-class-btn">
          <button onClick={(e) => createClassAction(e)}>create class</button>
        </div>
      </form>
    </div>
  );
};
