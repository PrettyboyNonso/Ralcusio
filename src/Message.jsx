import {
  faAngleLeft,
  faCamera,
  faCheckDouble,
  faCircleInfo,
  faEllipsis,
  faPaperPlane,
  faPlus,
  faPlusCircle,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import { messageContext } from "./MessageClickContext";

export const Message = ({ handleWheel, handleTarget }) => {
  const [elementClickedId, setElementClickedId] = useState("");
  const [inputValue, setInputValue] = useState("");
  const { currentId, setCurrentId, responsiveChatClick, resetClick } =
    useContext(messageContext);

  const users = {
    user1: {
      id: "user1",
      title: "mosh hamedani",
      image: "./images/adult-1851571_1280.jpg",
      titleMessage: "start a conversation",
      bio: `Dedicated educator with a passion for nurturing young minds. 
      I create engaging and inclusive classrooms that inspire a love of learning. 
      My goal is to empower students to reach their full`,
    },
    user2: {
      id: "user2",
      title: "Fredrick lebron",
      image: "./images/man-1690965_1280.jpg",
      titleMessage: "start a conversation",
      bio: `
      Experienced teacher committed to fostering a positive learning environment. 
      I specialize in innovative teaching methods 
      that support diverse learning styles and help students excel academically.
      `,
    },
    user3: {
      id: "user3",
      title: "Rickie Thomas",
      image: "./images/man-3803551_1280.jpg",
      titleMessage: "start a conversation",
      bio: `Enthusiastic teacher with a focus on personalized instruction. 
      I strive to cultivate critical thinking and problem-solving 
      skills in my students while fostering a supportive classroom community.`,
    },
    user4: {
      id: "user4",
      title: "Jane Adolphus",
      image: "./images/smile-2072907_1280.jpg",
      titleMessage: "start a conversation",
      bio: `Passionate educator who believes in the transformative power of education. 
      I aim to inspire curiosity and creativity, 
      guiding students toward a lifelong love of learning.`,
    },
  };

  const chatClick = (e) => {
    const clickedElement = e.target.closest(".chatscomponents");

    if (clickedElement) {
      const clickedId = clickedElement.id;
      setElementClickedId(clickedId);
      // setCurrentId(clickedId);
      sessionStorage.setItem("element-clicked-Id", clickedId);
      // sessionStorage.setItem("currentId", clickedId);
      if (clickedElement.classList.contains("chat-active")) {
        // do nothing
      } else if (!clickedElement.classList.contains("chat-active")) {
        const allChatHead = Array.from(
          document.querySelectorAll(".chatscomponents")
        );
        allChatHead.map(
          (component) =>
            component.classList.contains("chat-active") &&
            component.classList.remove("chat-active")
        );
        clickedElement.classList.add("chat-active");
      }
    }
  };

  useEffect(() => {
    const sessionStored = sessionStorage.getItem("element-clicked-Id");
    const sessionStoredId = sessionStorage.getItem("currentId");
    if (sessionStored) {
      setCurrentId(sessionStoredId);
      setElementClickedId(sessionStored);
      const activeChat = document.getElementById(sessionStored);
      if (activeChat) {
        activeChat.classList.add("chat-active");
      }
    } else {
      // setElementClickedId("user1"); i think it is redundant
      sessionStorage.setItem("element-clicked-Id", "user1");
      sessionStorage.setItem("currentId", "exit");
    }
  }, []);

  const handleTyping = (e) => {
    const textArea = e.target;
    if (inputValue !== "") {
      textArea.style.height = `${textArea.scrollHeight}px`;
    } else {
      setInputValue("");
      textArea.style.height = "2.5em";
    }

    setInputValue(textArea.value);
    // console.log(inputValue);
  };

  const ChatComponents = ({ id, title, titleMessage, image }) => {
    return (
      <div
        id={id}
        className={`chatscomponents ${
          id && elementClickedId === id ? "chat-active" : ""
        }`}
        onClick={chatClick}
        onTouchStart={chatClick}
      >
        <div className="image">
          <img src={require(`${image}`)} alt="" />
        </div>
        <div className="chat-title">
          <h3>{title}</h3>
          <p>{titleMessage} </p>
        </div>
      </div>
    );
  };
  const ResponsiveChatComponents = ({ id, title, titleMessage, image }) => {
    return (
      <div id={id} className="chatscomponents" onClick={responsiveChatClick}>
        <div className="image">
          <img src={require(`${image}`)} alt="" />
        </div>
        <div className="chat-title">
          <h3>{title}</h3>
          <p>{titleMessage} </p>
        </div>
        <div className="message-time-icon">
          <p>19:23</p>
          <FontAwesomeIcon
            icon={faCheckDouble}
            style={{
              fontSize: "18px",
              color: "#ed7014",
            }}
          />
        </div>
      </div>
    );
  };

  //   const ChatBrief = ({ users }) => {
  //     const currentUser = users[elementClickedId];

  //     return (

  //     );
  //   };
  return (
    <>
      <div
        className="messageDiv"
        onMouseMove={handleTarget}
        onWheel={handleWheel}
      >
        <div className="chatflex">
          <div className="chatflex-head">
            <div className="first-chat-head">
              <h2>Messages</h2>
              <div className="chat-icons">
                <FontAwesomeIcon
                  icon={faEllipsis}
                  style={{ fontSize: "18px", color: "#ed7014" }}
                />
              </div>
            </div>
            <div className="second-chat-head">
              <div className="search">
                {/* <FontAwesomeIcon
                  icon={faSearch}
                  style={{
                    position: "absolute",
                    right: "-.18em",
                    paddingRight: "0.5em",
                    paddingLeft: "0.5em",
                    top: "-.7em",
                    color: "rgb(41, 41, 41)",
                    cursor: "pointer",
                    zIndex: "5",
                    backgroundColor: "white",
                  }}
                /> */}
                <input type="text" placeholder="Search For Messages" />
              </div>
            </div>
          </div>

          <div className="chatcomponent-div">
            {Object.keys(users).map((userID) => {
              const user = users[userID];
              return (
                <ChatComponents
                  title={user.title}
                  image={user.image}
                  titleMessage={user.titleMessage}
                  id={user.id}
                />
              );
            })}
          </div>
        </div>

        <div className="messageBody">
          <div className="messageBodyHead">
            <div className="first-messageBodyHead">
              <div className="back-icon">
                <FontAwesomeIcon
                  icon={faAngleLeft}
                  style={{ fontSize: "24px", color: "rgba(237, 112, 20, 0.8)" }}
                  onClick={() => setCurrentId("")}
                />
              </div>
              <div className="imageDiv">
                <img
                  src={
                    elementClickedId &&
                    require(`${users[elementClickedId].image}`)
                  }
                  alt=""
                />
              </div>
              <h2>{elementClickedId && users[elementClickedId].title}</h2>
            </div>
            <FontAwesomeIcon
              icon={faCircleInfo}
              style={{
                position: "fixed",
                fontSize: "24px",
                marginTop: "0.1em",
                right: "2em",
                paddingTop: ".1em",
                color: "rgba(237, 112, 20, 0.8)",
                cursor: "pointer",
              }}
            />
          </div>
          <div className="chatBrief">
            <div className="imageDiv">
              <img
                src={
                  elementClickedId &&
                  require(`${users[elementClickedId].image}`)
                }
                alt=""
              />
            </div>
            <div className="chatPersonDetails">
              <h2>{elementClickedId && users[elementClickedId].title}</h2>
              <p>{elementClickedId && users[elementClickedId].bio}</p>
            </div>
            <div className="message-receive-body">
              <div className="received"></div>
            </div>
          </div>
          <div className="chat-inputs">
            <div className="addfile">
              <FontAwesomeIcon
                icon={faPlusCircle}
                style={{
                  fontSize: "24px",
                  color: "#ed7014",
                  marginRight: "0.4em",
                }}
              />
              <FontAwesomeIcon
                icon={faFile}
                style={{ fontSize: "24px", color: "#ed7014" }}
              />
            </div>

            <textarea
              name="typing"
              value={inputValue}
              onChange={handleTyping}
              placeholder="Write a message"
            ></textarea>
            <FontAwesomeIcon
              icon={faPaperPlane}
              style={{
                position: "fixed",
                right: "2.8em",
                bottom: "1em",
                fontSize: "24px",
                color: "#ed7014",
              }}
            />
          </div>
        </div>
      </div>

      <div className="messageDiv">
        {currentId === "exit" && (
          <div className="responsive-chatflex">
            <div className="chatflex-head">
              <div className="first-chat-head">
                <h2>Chats</h2>
                <div className="chat-icons">
                  <FontAwesomeIcon
                    icon={faEllipsis}
                    style={{ fontSize: "18px", color: "#ed7014" }}
                  />
                </div>
              </div>
              <div className="second-chat-head">
                <div className="search">
                  <FontAwesomeIcon
                    icon={faSearch}
                    style={{
                      position: "absolute",
                      left: "1.8em",
                      top: ".8em",
                      color: "grey",
                      cursor: "pointer",
                      zIndex: "5",
                    }}
                  />
                  <input type="text" placeholder="Search For Messages" />
                </div>
              </div>
            </div>

            <div className="chatcomponent-div">
              <div className="active-peeps">
                <div className="active-peeps-child-div">
                  <FontAwesomeIcon
                    icon={faPlus}
                    style={{
                      fontSize: "22px",
                      color: "#4e4e4e",
                    }}
                  />
                </div>
                <div className="active-peeps-child-div">
                  <div className="active-peep-image">
                    <img
                      src={require("./images/beard-1845166_1280.jpg")}
                      alt=""
                    />
                  </div>
                  <div className="active-status-color"></div>
                </div>
                <div className="active-peeps-child-div">
                  <div className="active-peep-image">
                    <img
                      src={require("./images/man-1690965_1280.jpg")}
                      alt=""
                    />
                  </div>
                  <div className="active-status-color"></div>
                </div>
                <div className="active-peeps-child-div">
                  <div className="active-peep-image">
                    <img
                      src={require("./images/man-3803551_1280.jpg")}
                      alt=""
                    />
                  </div>
                  <div className="active-status-color"></div>
                </div>
                <div className="active-peeps-child-div">
                  <div className="active-peep-image">
                    <img
                      src={require("./images/girl-2961959_1280.jpg")}
                      alt=""
                    />
                  </div>
                  <div className="active-status-color"></div>
                </div>
                <div className="active-peeps-child-div">
                  <div className="active-peep-image">
                    <img
                      src={require("./images/adult-1851571_1280.jpg")}
                      alt=""
                    />
                  </div>
                  <div className="active-status-color"></div>
                </div>
                <div className="active-peeps-child-div">
                  <div className="active-peep-image">
                    <img src={require("./images/fb.jpg")} alt="" />
                  </div>
                  <div className="active-status-color"></div>
                </div>
                <div className="active-peeps-child-div">
                  <div className="active-peep-image">
                    <img
                      src={require("./images/portrait-3204843_1280.jpg")}
                      alt=""
                    />
                  </div>
                  <div className="active-status-color"></div>
                </div>
              </div>
              {Object.keys(users).map((userID) => {
                const user = users[userID];
                return (
                  <ResponsiveChatComponents
                    title={user.title}
                    image={user.image}
                    titleMessage={user.titleMessage}
                    id={user.id}
                  />
                );
              })}
            </div>
          </div>
        )}
        {currentId !== "exit" && (
          <div className="responsive-messageBody">
            <div className="messageBodyHead">
              <div className="first-messageBodyHead">
                <div className="back-icon">
                  <FontAwesomeIcon
                    icon={faAngleLeft}
                    style={{
                      fontSize: "28px",
                      color: "rgba(237, 112, 20, 0.8)",
                    }}
                    onClick={resetClick}
                  />
                </div>
                <div className="imageDiv">
                  <img
                    src={currentId && require(`${users[currentId].image}`)}
                    alt=""
                  />
                </div>
                <div className="title-online">
                  <h2>{currentId && users[currentId].title}</h2>
                  <p>online</p>
                </div>
              </div>
              <FontAwesomeIcon
                icon={faCircleInfo}
                style={{
                  position: "fixed",
                  fontSize: "24px",
                  marginTop: "0.1em",
                  right: ".8em",
                  paddingTop: ".1em",
                  color: "rgba(237, 112, 20, 0.8)",
                  cursor: "pointer",
                }}
              />
            </div>
            <div className="chatBrief">
              <div className="imageDiv">
                <img
                  src={currentId && require(`${users[currentId].image}`)}
                  alt=""
                />
              </div>
              <div className="chatPersonDetails">
                <h2>{currentId && users[currentId].title}</h2>
                <p>{currentId && users[currentId].bio}</p>
              </div>
              <div className="message-receive-body">
                <div className="received"></div>
              </div>
            </div>
            <div className="chat-inputs">
              <div className="addfile">
                <FontAwesomeIcon
                  icon={faPlusCircle}
                  style={{
                    fontSize: "24px",
                    color: "#ed7014",
                    marginRight: "0.4em",
                  }}
                />
                <FontAwesomeIcon
                  icon={faFile}
                  style={{ fontSize: "24px", color: "#ed7014" }}
                />
              </div>

              <textarea
                name="typing"
                value={inputValue}
                onChange={handleTyping}
                placeholder="Write a message"
              ></textarea>

              <div className="responsive-send">
                <FontAwesomeIcon
                  icon={faPaperPlane}
                  style={{
                    position: "static",
                    fontSize: "22px",
                    color: "#ed7014",
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
