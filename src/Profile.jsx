import {
  faArrowLeft,
  faBriefcase,
  faCakeCandles,
  faCircleInfo,
  faGraduationCap,
  faImage,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Profile = () => {
  return (
    <div className="profile-page">
      <div className="first-profile-view-flex">
        <div className="first-profile-view">
          <div className="cover-photo"></div>
          <div className="profile-firstinfo">
            <div className="profile-image-div">
              <img src={require("./images/fb.jpg")} alt="" />
            </div>

            <div className="name-and-followers">
              <h2>Darlington Obi</h2>
              <div className="followers-following">
                <p>1.3k followers</p>
                <div className="dot"></div>
                <p>300 following</p>
              </div>
              {/* <button>edit profile</button> */}
              <div className="following-people">
                <div className="img">
                  <img
                    src={require("./images/beard-1845166_1280.jpg")}
                    alt=""
                  />
                </div>
                <div className="img">
                  <img
                    src={require("./images/woman-8643502_1280.png")}
                    alt=""
                  />
                </div>
                <div className="img">
                  <img
                    src={require("./images/portrait-3353699_1280.jpg")}
                    alt=""
                  />
                </div>
                <div className="img">
                  <img
                    src={require("./images/woman-8643502_1280.png")}
                    alt=""
                  />
                </div>
                <div className="img">
                  <img
                    src={require("./images/woman-8552807_1280.jpg")}
                    alt=""
                  />
                </div>

                <button>edit profile</button>
              </div>
            </div>
          </div>
          <div className="other-profile-info">
            <div className="category">
              <FontAwesomeIcon
                icon={faBriefcase}
                style={{ color: "#ed7014" }}
              />
              <p>programming/software development</p>
            </div>
            <div className="category">
              <FontAwesomeIcon
                icon={faCakeCandles}
                style={{ color: "#ed7014" }}
              />
              <p>birthday 21-May</p>
            </div>
            <div className="category">
              <FontAwesomeIcon
                icon={faLocationDot}
                style={{ color: "#ed7014" }}
              />
              <p>lives in ogun, Nigeria</p>
            </div>
          </div>
        </div>

        {/* flex profile view */}

        <div className="bio">
          <h2>intro</h2>
          <p className="paragraph">
            Creative professional with a passion for technology and design.
            Enjoys coding, learning, and collaborating.
          </p>
          <button>edit bio</button>
          <div className="education-work">
            <div className="education">
              <FontAwesomeIcon
                icon={faCircleInfo}
                style={{ color: "#ed7014" }}
              />
              <p>
                Profile - <b>tutor</b>
              </p>
            </div>

            <div className="education">
              <FontAwesomeIcon
                icon={faGraduationCap}
                style={{ color: "#ed7014" }}
              />
              <p>studied at D.s Adegbenro Ict Polytechnic, Itori, Ogun State</p>
            </div>
            <div className="education">
              <FontAwesomeIcon
                icon={faLocationDot}
                style={{ color: "#ed7014" }}
              />
              <p>from imo state</p>
            </div>
            <button>edit details</button>
          </div>
        </div>
      </div>

      <div className="second-profile-view">
        <div className="posts">
          <div className="add-post">
            <div className="first-add-post">
              <div className="first-add-post-img">
                <img src={require("./images/fb.jpg")} alt="" />
              </div>
              <input type="text" placeholder="What Is On Your Mind" />
            </div>
            <div className="second-add-post">
              <div className="post-option">
                <FontAwesomeIcon
                  icon={faImage}
                  style={{ fontSize: "20px", color: "#ed7014" }}
                />
                <p>photo/video</p>
              </div>
            </div>
          </div>
          <div className="added-posts">
            <p>no posts yet</p>
          </div>
        </div>
      </div>
    </div>
  );
};
