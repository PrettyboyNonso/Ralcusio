import Select from "react-select";
export const CoursePlanning = ({
  courseName,
  courseNameState,
  retainInput,
  handleChangeInSelect,
  courseAreastate,
  handleChangeBatch,
  BatchState,
  courseDescription,
  retainDescInput,
  courseDescstate,
  ToggleBtn,
  reducerState,
  handleCoursePlanning,
}) => {
  const optionsLevel = [
    {
      value: "early bird",
      label: "Early Bird",
    },
    {
      value: "batch a",
      label: "Batch A",
    },
    {
      value: "batch b",
      label: "Batch B",
    },
    {
      value: "batch c",
      label: "Batch C",
    },
  ];

  const optionsCourseArea = [
    {
      label: "Technology",
      options: [
        { value: "web-development", label: "Web Development" },
        { value: "data-science", label: "Data Science" },
        { value: "cyber-security", label: "Cyber Security" },
        { value: "software-engineering", label: "Software Engineering" },
      ],
    },
    {
      label: "Personal Development",
      options: [
        { value: "personal-relationship", label: "Personal Relationship" },
        { value: "mental-wellness", label: "Mental Wellness" },
        { value: "time-management", label: "Time Management" },
        { value: "leadership", label: "Leadership" },
      ],
    },
    {
      label: "Business",
      options: [
        { value: "entrepreneurship", label: "Entrepreneurship" },
        { value: "marketing", label: "Marketing" },
        { value: "finance", label: "Finance" },
        { value: "management", label: "Management" },
      ],
    },
    {
      label: "Arts",
      options: [
        { value: "visual-arts", label: "Visual Arts" },
        { value: "music", label: "Music" },
        { value: "literature", label: "Literature" },
        { value: "performing-arts", label: "Performing Arts" },
      ],
    },
    {
      label: "Science",
      options: [
        { value: "biology", label: "Biology" },
        { value: "chemistry", label: "Chemistry" },
        { value: "physics", label: "Physics" },
        { value: "environmental-science", label: "Environmental Science" },
      ],
    },
    {
      label: "Health",
      options: [
        { value: "nutrition", label: "Nutrition" },
        { value: "fitness", label: "Fitness" },
        { value: "public-health", label: "Public Health" },
        { value: "medicine", label: "Medicine" },
      ],
    },
    {
      label: "Language",
      options: [
        { value: "english", label: "English" },
        { value: "spanish", label: "Spanish" },
        { value: "french", label: "French" },
        { value: "german", label: "German" },
      ],
    },
    {
      label: "Education",
      options: [
        { value: "teaching-methods", label: "Teaching Methods" },
        { value: "curriculum-design", label: "Curriculum Design" },
        { value: "educational-technology", label: "Educational Technology" },
        { value: "special-education", label: "Special Education" },
      ],
    },
  ];

  const customStyle = {
    container: (provided) => ({
      ...provided,
      width: "100%",
      marginTop: "0.3em",
    }),
    control: (provided, state) => ({
      ...provided,
      height: "2.3em",
      minHeight: "2.3em",
      color: "#000000",
      fontFamily: "Karla, sans-serif",
      fontSize: "13px",
      outline: "none",
      borderRadius: "0px",
      cursor: "pointer",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#fff" : "#fff",
      color: "#000000",
      fontFamily: "Karla, sans-serif",
      fontSize: "13px",
    }),

    singleValue: (provided) => ({
      ...provided,
      color: "#000000",
      paddingBottom: "0.5em",
    }),
    indicatorSeparator: () => ({ display: "none" }),
  };

  return (
    <div className="class-create-details-sec">
      <div className="class-create-details-head">
        <h2>Course Planning</h2>
        <p>
          begin the creation of your course, fill out details like, course name,
          descriptions, etc
        </p>
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="course-name">
          <p htmlFor="">course name</p>
          <input
            type="text"
            placeholder="Example - Financial Growth"
            ref={courseName}
            value={courseNameState}
            onChange={retainInput}
          />
        </div>

        <div className="class-date">
          <>
            <p>Select Course Area</p>

            <Select
              id="course-area"
              name="course-area"
              className="course-select"
              options={optionsCourseArea}
              placeholder="Select an area"
              styles={customStyle}
              isSearchable={false}
              onChange={handleChangeInSelect}
              value={courseAreastate}
            ></Select>
          </>
        </div>

        <div className="course-level">
          <p>Select Course Batch</p>
          <Select
            placeholder="Select a level"
            styles={customStyle}
            isSearchable={false}
            options={optionsLevel}
            onChange={handleChangeBatch}
            value={BatchState}
          ></Select>
        </div>

        <div className="class-desc">
          <p htmlFor="">course description (optional)</p>
          <textarea
            name="courseDescription"
            id=""
            ref={courseDescription}
            onChange={retainDescInput}
            value={courseDescstate}
          ></textarea>
        </div>

        <div className="toggle-btn continue-btn">
          <div style={{ display: "flex", gap: "0.4em", alignItems: "center" }}>
            <p>free course</p>
            <ToggleBtn
              // toggleFunc={() => dispatch()}
              toggleState={reducerState.toggleOn}
            />
          </div>

          <button onClick={(e) => handleCoursePlanning(e)}>continue</button>
        </div>
      </form>
    </div>
  );
};
