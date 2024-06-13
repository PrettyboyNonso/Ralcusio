import {
  faAngleLeft,
  faCircleInfo,
  faEllipsis,
  faPaperPlane,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { faFile } from "@fortawesome/free-regular-svg-icons";

export const Message = ({ handleWheel, handleTarget }) => {
  const [elementClickedId, setElementClickedId] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [currentId, setCurrentId] = useState("");

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
    // user5: {
    //   id: "user4",
    //   title: "Jane Adolphus",
    //   image: "./images/smile-2072907_1280.jpg",
    //   titleMessage: "start a conversation",
    //   bio: `Passionate educator who believes in the transformative power of education.
    //   I aim to inspire curiosity and creativity,
    //   guiding students toward a lifelong love of learning.`,
    // },
    // user6: {
    //   id: "user4",
    //   title: "Jane Adolphus",
    //   image: "./images/smile-2072907_1280.jpg",
    //   titleMessage: "start a conversation",
    //   bio: `Passionate educator who believes in the transformative power of education.
    //   I aim to inspire curiosity and creativity,
    //   guiding students toward a lifelong love of learning.`,
    // },
    // user7: {
    //   id: "user4",
    //   title: "Jane Adolphus",
    //   image: "./images/smile-2072907_1280.jpg",
    //   titleMessage: "start a conversation",
    //   bio: `Passionate educator who believes in the transformative power of education.
    //   I aim to inspire curiosity and creativity,
    //   guiding students toward a lifelong love of learning.`,
    // },
    // user8: {
    //   id: "user4",
    //   title: "Jane Adolphus",
    //   image: "./images/smile-2072907_1280.jpg",
    //   titleMessage: "start a conversation",
    //   bio: `Passionate educator who believes in the transformative power of education.
    //   I aim to inspire curiosity and creativity,
    //   guiding students toward a lifelong love of learning.`,
    // },
    // user9: {
    //   id: "user4",
    //   title: "Jane Adolphus",
    //   image: "./images/smile-2072907_1280.jpg",
    //   titleMessage: "start a conversation",
    //   bio: `Passionate educator who believes in the transformative power of education.
    //   I aim to inspire curiosity and creativity,
    //   guiding students toward a lifelong love of learning.`,
    // },
    // user10: {
    //   id: "user4",
    //   title: "Jane Adolphus",
    //   image: "./images/smile-2072907_1280.jpg",
    //   titleMessage: "start a conversation",
    //   bio: `Passionate educator who believes in the transformative power of education.
    //   I aim to inspire curiosity and creativity,
    //   guiding students toward a lifelong love of learning.`,
    // },
    // user11: {
    //   id: "user4",
    //   title: "Jane Adolphus",
    //   image: "./images/smile-2072907_1280.jpg",
    //   titleMessage: "start a conversation",
    //   bio: `Passionate educator who believes in the transformative power of education.
    //   I aim to inspire curiosity and creativity,
    //   guiding students toward a lifelong love of learning.`,
    // },
    // user12: {
    //   id: "user4",
    //   title: "Jane Adolphus",
    //   image: "./images/smile-2072907_1280.jpg",
    //   titleMessage: "start a conversation",
    //   bio: `Passionate educator who believes in the transformative power of education.
    //   I aim to inspire curiosity and creativity,
    //   guiding students toward a lifelong love of learning.`,
    // },
    // user41: {
    //   id: "user4",
    //   title: "Jane Adolphus",
    //   image: "./images/smile-2072907_1280.jpg",
    //   titleMessage: "start a conversation",
    //   bio: `Passionate educator who believes in the transformative power of education.
    //   I aim to inspire curiosity and creativity,
    //   guiding students toward a lifelong love of learning.`,
    // },
    // user42: {
    //   id: "user4",
    //   title: "Jane Adolphus",
    //   image: "./images/smile-2072907_1280.jpg",
    //   titleMessage: "start a conversation",
    //   bio: `Passionate educator who believes in the transformative power of education.
    //   I aim to inspire curiosity and creativity,
    //   guiding students toward a lifelong love of learning.`,
    // },
    // user13: {
    //   id: "user4",
    //   title: "Jane Adolphus",
    //   image: "./images/smile-2072907_1280.jpg",
    //   titleMessage: "start a conversation",
    //   bio: `Passionate educator who believes in the transformative power of education.
    //   I aim to inspire curiosity and creativity,
    //   guiding students toward a lifelong love of learning.`,
    // },
    // user15: {
    //   id: "user4",
    //   title: "Jane Adolphus",
    //   image: "./images/smile-2072907_1280.jpg",
    //   titleMessage: "start a conversation",
    //   bio: `Passionate educator who believes in the transformative power of education.
    //   I aim to inspire curiosity and creativity,
    //   guiding students toward a lifelong love of learning.`,
    // },
    // user16: {
    //   id: "user4",
    //   title: "Jane Adolphus",
    //   image: "./images/smile-2072907_1280.jpg",
    //   titleMessage: "start a conversation",
    //   bio: `Passionate educator who believes in the transformative power of education.
    //   I aim to inspire curiosity and creativity,
    //   guiding students toward a lifelong love of learning.`,
    // },
  };

  const chatClick = (e) => {
    const clickedElement = e.target.closest(".chatscomponents");

    if (clickedElement) {
      const clickedId = clickedElement.id;
      setElementClickedId(clickedId);
      setCurrentId(clickedId);
      sessionStorage.setItem("element-clicked-Id", clickedId);
      sessionStorage.setItem("currentId", clickedId);
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

  const resetClick = () => {
    sessionStorage.setItem("currentId", "");
    setCurrentId("");
  };

  useEffect(() => {
    const sessionStored = sessionStorage.getItem("element-clicked-Id");
    const sessionStoredId = sessionStorage.getItem("currentId");
    if (sessionStored || sessionStoredId) {
      setCurrentId(sessionStoredId);
      setElementClickedId(sessionStored);
      const activeChat = document.getElementById(sessionStored);
      if (activeChat) {
        activeChat.classList.add("chat-active");
      }
    } else {
      setElementClickedId("user1");
      sessionStorage.setItem("element-clicked-Id", "user1");
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

  //   const ChatBrief = ({ users }) => {
  //     const currentUser = users[elementClickedId];

  //     return (

  //     );
  //   };
  return (
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
                  position: "fixed",
                  right: "0.5em",
                  top: "0.7em",
                  color: "rgb(41, 41, 41)",
                  cursor: "pointer",
                  zIndex: "5",
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
                elementClickedId && require(`${users[elementClickedId].image}`)
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

      {currentId === "" && (
        <div className="responsive-chatflex">
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
                  position: "fixed",
                  right: "0.5em",
                  top: "0.7em",
                  color: "rgb(41, 41, 41)",
                  cursor: "pointer",
                  zIndex: "5",
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
      )}
      {currentId !== "" && (
        <div className="responsive-messageBody">
          <div className="messageBodyHead">
            <div className="first-messageBodyHead">
              <div className="back-icon">
                <FontAwesomeIcon
                  icon={faAngleLeft}
                  style={{ fontSize: "24px", color: "rgba(237, 112, 20, 0.8)" }}
                  onClick={resetClick}
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
              className="responsive-send"
              icon={faPaperPlane}
              style={{
                position: "absolute",
                right: ".8em",
                bottom: "0.2em",
                fontSize: "22px",
                color: "#ed7014",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
