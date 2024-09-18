import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import React from "react";
export class ScheduleCurriculum extends React.Component {
  render() {
    return (
      <div className="schedule-curriculum">
        <div className="schedule-tag">
          <p>{this.props?.classObjectState?.batchState}</p>
        </div>
        <div className="course-title">
          <h3>{this.props?.curriculum?.title}</h3>
          <FontAwesomeIcon
            icon={faTrashCan}
            style={{ color: "#ed7014" }}
            onClick={() =>
              this.props?.deleteCurriculum(this?.props?.curriculum.id)
            }
          />
        </div>
        <div className="schedule-level">
          <p>{`${new Date(this.props?.curriculum?.startDate)
            .toString()
            .split(" ")
            .splice(1, 3)
            .join(" ")} - `}</p>
          <p>
            {new Date(this.props?.curriculum?.endDate)
              .toString()
              .split(" ")
              .splice(1, 3)
              .join(" ")}
          </p>
        </div>
      </div>
    );
  }
}
