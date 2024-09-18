import { ScheduleCurriculum } from "./ScheduleCurriculum";

export const ScheduleUi = ({ classObjectState, deleteCurriculum }) => {
  return (
    <div className="schedule-ui">
      <div className="schedule-ui-head">
        <h2>curriculums</h2>
      </div>
      {classObjectState?.curriculum?.map((value, index) => (
        <div className="schedule-curriculum-flex">
          <ScheduleCurriculum
            curriculum={value}
            classObjectState={classObjectState}
            deleteCurriculum={deleteCurriculum}
          />
        </div>
      ))}
    </div>
  );
};
