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
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { database } from "./backend";
import { Devices } from "./App";
import myImage from "./images/fb.jpg";

export const Message = ({ handleWheel, handleTarget }) => {
  const [elementClickedId, setElementClickedId] = useState("");
  const [inputValue, setInputValue] = useState("");
  const { currentId, setCurrentId, responsiveChatClick, resetClick } =
    useContext(messageContext);
  const { userDataState } = useContext(Devices);
  const [queriedChats, setQueriedchat] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [messageArray, setMessageArray] = useState([]);
  const [responsiveMessageArray, setResponsiveMessageArray] = useState([]);
  const [messageLoading, setMessageLoading] = useState(false);
  const QueryChats = () => {
    const chatDb = collection(database, "chats");
    const chatQuery = query(chatDb);

    // Listen for real-time updates in the chats collection
    const unsubscribe = onSnapshot(chatQuery, (chatSnapshot) => {
      let chatArray = [];
      if (!chatSnapshot.empty) {
        chatSnapshot.forEach(async (chatDoc) => {
          const participantsList = chatDoc?.data()?.participants;

          if (participantsList?.includes(userDataState?.userId)) {
            const otherUserId = participantsList?.find(
              (value) => value !== userDataState?.userId
            );

            const userDbRef = collection(database, "users");
            const userQuery = query(
              userDbRef,
              where("userId", "==", otherUserId)
            );

            const userSnapshot = await getDocs(userQuery);

            if (!userSnapshot.empty) {
              const userData = userSnapshot.docs[0].data();
              const { fullName, profileUrl, userId } = userData;

              const chatObject = {
                fullName,
                profileUrl,
                lastMessage: chatDoc?.data()?.lastMessage,
                otherUserId: userId,
                Id: chatDoc?.data()?.chatId,
                chatCollection: chatDoc?.data()?.chatCollectionId,
                senderId: chatDoc?.data()?.senderId,
                sentTime: chatDoc?.data()?.sentTime,
              };

              chatArray.push(chatObject);

              // Update the state after processing each chat
              setQueriedchat([...chatArray]);
            }
          }
        });
      }
    });

    // Clean up the listener when component unmounts
    return () => unsubscribe();
  };

  const responsiveQueryMessage = () => {
    let messageArr = [];
    if (isMounted) {
      if (currentId) {
        const chatActive = queriedChats?.filter(
          (value) => value.Id === currentId
        );
        const chatCollectionId = chatActive[0]?.chatCollection;

        if (chatCollectionId) {
          const databseRef = doc(database, "chats", chatCollectionId);
          const dbCollection = collection(databseRef, "messages");
          const messageQuery = query(dbCollection);

          const unsubscribe = onSnapshot(messageQuery, (messageSnapshot) => {
            messageArr = [];

            messageSnapshot.forEach((doc) => {
              const messageObject = {
                senderId: doc?.data()?.senderId,
                timeSent: doc?.data()?.sentTime?.toMillis(),
                text: doc?.data()?.text,
              };
              messageArr.push(messageObject);
            });

            const sortedMessage = messageArr.sort(
              (a, b) => a.timeSent - b.timeSent
            );
            setResponsiveMessageArray(sortedMessage);
          });

          return () => unsubscribe();
        }
      }
    }
  };

  const QueryMessage = () => {
    let messageArr = [];
    if (isMounted) {
      if (elementClickedId) {
        const chatActive = queriedChats?.filter(
          (value) => value.Id === elementClickedId
        );
        const chatCollectionId = chatActive[0]?.chatCollection;

        if (chatCollectionId) {
          const databseRef = doc(database, "chats", chatCollectionId);
          const dbCollection = collection(databseRef, "messages");
          const messageQuery = query(dbCollection);

          const unsubscribe = onSnapshot(messageQuery, (messageSnapshot) => {
            messageArr = [];

            messageSnapshot.forEach((doc) => {
              const messageObject = {
                senderId: doc?.data()?.senderId,
                timeSent: doc?.data()?.sentTime?.toMillis(),
                text: doc?.data()?.text,
              };
              messageArr.push(messageObject);
            });

            const sortedMessage = messageArr.sort(
              (a, b) => a.timeSent - b.timeSent
            );
            setMessageArray(sortedMessage);
          });

          return () => unsubscribe();
        }
      }
    }
  };

  useEffect(() => {
    QueryMessage();
  }, [elementClickedId, queriedChats, isMounted]);

  useEffect(() => {
    responsiveQueryMessage();
  }, [currentId, queriedChats, isMounted]);

  useEffect(() => {
    QueryChats();
  }, [isMounted]);

  const chatClick = (e) => {
    const clickedElement = e.target.closest(".chatscomponents");

    if (clickedElement) {
      const clickedId = clickedElement.id;
      setElementClickedId(clickedId);

      sessionStorage.setItem("element-clicked-Id", clickedId);

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

  const handleTyping = (e) => {
    const textArea = e.target;
    if (inputValue !== "") {
      textArea.style.height = `${textArea.scrollHeight}px`;
    } else {
      setInputValue("");
      textArea.style.height = "2.5em";
    }

    setInputValue(textArea.value);
  };

  const responsiveSendMessage = async () => {
    if (inputValue.trim().length > 0) {
      setMessageLoading(true);

      const activeChat = queriedChats?.find((value) => value?.Id === currentId);
      const activeChatCollectionId = activeChat?.chatCollection;

      if (activeChatCollectionId) {
        const databaseRef = doc(database, "chats", activeChatCollectionId);
        const chatRef = collection(databaseRef, "messages");

        const messageObj = {
          senderId: userDataState?.userId,
          text: inputValue,
          sentTime: serverTimestamp(),
        };
        // setResponsiveMessageArray([...responsiveMessageArray, messageObj]);
        await updateDoc(databaseRef, {
          lastMessage: inputValue,
          senderId: userDataState?.userId,
          sentTime: serverTimestamp(),
        });

        await addDoc(chatRef, messageObj);
        setResponsiveMessageArray([...responsiveMessageArray, messageObj]);
        setInputValue("");
        setMessageLoading(false);
      }
    }
  };

  const sendMessage = async () => {
    if (inputValue.trim().length > 0) {
      setMessageLoading(true);

      const activeChat = queriedChats?.find(
        (value) => value?.Id === elementClickedId
      );
      const activeChatCollectionId = activeChat?.chatCollection;

      if (activeChatCollectionId) {
        const databaseRef = doc(database, "chats", activeChatCollectionId);
        const chatRef = collection(databaseRef, "messages");

        const messageObj = {
          senderId: userDataState?.userId,
          text: inputValue,
          sentTime: serverTimestamp(),
        };

        setMessageArray([...messageArray, messageObj]);

        await updateDoc(databaseRef, {
          lastMessage: inputValue,
          senderId: userDataState?.userId,
          sentTime: serverTimestamp(),
        });

        await addDoc(chatRef, messageObj);
        setMessageArray([...messageArray, messageObj]);
        setInputValue("");
        setMessageLoading(false);
      }
    }
  };

  const ChatComponents = ({ id, title, titleMessage, image, senderId }) => {
    useEffect(() => {
      setIsMounted(true);
    }, []);
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
          <img src={image} alt="" />
        </div>
        <div className="chat-title">
          <h3>{title}</h3>
          <p
            style={{
              fontStyle: senderId === userDataState?.userId && "italic",
              fontWeight: senderId !== userDataState?.userId && "bold",
            }}
          >
            {senderId === userDataState?.userId
              ? `You: ${
                  titleMessage.split("").length > 24
                    ? titleMessage.split("").splice(0, 23).join("") + "..."
                    : titleMessage
                }`
              : titleMessage.split("").length > 24
              ? titleMessage.split("").splice(0, 23).join("") + "..."
              : titleMessage}
          </p>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (isMounted) {
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
        const documentArray = document.querySelector(".chatscomponents");
        const firstElemId = documentArray?.id;
        setElementClickedId(firstElemId);
        sessionStorage.setItem("element-clicked-Id", firstElemId);
        sessionStorage.setItem("currentId", "exit");
      }
    }
  }, [isMounted]);

  const ResponsiveChatComponents = ({
    id,
    title,
    titleMessage,
    image,
    sentTime,
    senderId,
  }) => {
    return (
      <div id={id} className="chatscomponents" onClick={responsiveChatClick}>
        <div className="image">
          <img src={image} alt="" />
        </div>
        <div className="chat-title">
          <h3>{title}</h3>
          <p
            style={{
              fontStyle: senderId === userDataState?.userId && "italic",
              fontWeight: senderId !== userDataState?.userId && "bold",
            }}
          >
            {senderId === userDataState?.userId
              ? `You: ${
                  titleMessage.split("").length > 24
                    ? titleMessage.split("").splice(0, 23).join("") + "..."
                    : titleMessage
                }`
              : titleMessage.split("").length > 24
              ? titleMessage.split("").splice(0, 23).join("") + "..."
              : titleMessage}
          </p>
        </div>
        <div className="message-time-icon">
          <p>
            {new Date(sentTime?.toMillis())
              ?.toLocaleTimeString()
              ?.split(":")
              ?.splice(0, 2)
              ?.join(":")}
          </p>
        </div>
      </div>
    );
  };

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
                <input type="text" placeholder="Search For Messages" />
              </div>
            </div>
          </div>

          <div className="chatcomponent-div">
            {queriedChats.map((chats, index) => {
              return (
                <ChatComponents
                  title={chats?.fullName}
                  image={chats?.profileUrl}
                  titleMessage={chats?.lastMessage}
                  id={chats?.Id}
                  senderId={chats?.senderId}
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
                    queriedChats?.find(
                      (value) => value?.Id === elementClickedId
                    )?.profileUrl
                  }
                  alt=""
                />
              </div>
              <h2>
                {elementClickedId &&
                  queriedChats?.find((value) => value?.Id === elementClickedId)
                    ?.fullName}
              </h2>
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
                  queriedChats?.find((value) => value?.Id === elementClickedId)
                    ?.profileUrl
                }
                alt=""
              />
            </div>
            <div className="chatPersonDetails">
              <h2>
                {elementClickedId &&
                  queriedChats?.find((value) => value?.Id === elementClickedId)
                    ?.fullName}
              </h2>
              {/* <p>{elementClickedId && users[elementClickedId].bio}</p> */}
            </div>
            <div className="message-receive-body">
              {messageArray?.map((value, index) => (
                <div
                  className="message-box"
                  style={{
                    alignSelf:
                      value?.senderId === userDataState?.userId
                        ? "end"
                        : "start",
                    backgroundColor:
                      value?.senderId === userDataState?.userId
                        ? "rgba(237, 112, 20, 0.2)"
                        : "rgb(237, 112, 20)",
                    color:
                      value?.senderId === userDataState?.userId
                        ? "black"
                        : "white",
                  }}
                >
                  <p>{value?.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="chat-inputs">
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
                cursor: "pointer",
                color: "#ed7014",
              }}
              onClick={sendMessage}
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
                {/* <div className="active-peeps-child-div">
                  <FontAwesomeIcon
                    icon={faPlus}
                    style={{
                      fontSize: "22px",
                      color: "#4e4e4e",
                    }}
                  />
                </div> */}
                {queriedChats?.map((value, index) => (
                  <div className="active-peeps-child-div">
                    <div className="active-peep-image">
                      <img src={value?.profileUrl} alt="" />
                    </div>
                    <div className="active-status-color"></div>
                  </div>
                ))}
              </div>
              {queriedChats.map((chats, index) => {
                return (
                  <ResponsiveChatComponents
                    title={chats?.fullName}
                    image={chats?.profileUrl}
                    titleMessage={chats?.lastMessage}
                    id={chats?.Id}
                    senderId={chats?.senderId}
                    sentTime={chats?.sentTime}
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
                    src={
                      currentId &&
                      queriedChats?.find((value) => value?.Id === currentId)
                        ?.profileUrl
                    }
                    alt=""
                  />
                </div>
                <div className="title-online">
                  <h2>
                    {currentId &&
                      queriedChats?.find((value) => value?.Id === currentId)
                        ?.fullName}
                  </h2>
                  {/* <p>online</p> */}
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
                  src={
                    currentId &&
                    queriedChats?.find((value) => value?.Id === currentId)
                      ?.profileUrl
                  }
                  alt=""
                />
              </div>
              <div className="chatPersonDetails">
                <h2>
                  {currentId &&
                    queriedChats?.find((value) => value?.Id === currentId)
                      ?.fullName}
                </h2>
                {/* <p>{currentId && users[currentId].bio}</p> */}
              </div>
              <div className="message-receive-body">
                {responsiveMessageArray?.map((value, index) => (
                  <div
                    className="message-box"
                    style={{
                      alignSelf:
                        value?.senderId === userDataState?.userId
                          ? "end"
                          : "start",
                      backgroundColor:
                        value?.senderId === userDataState?.userId
                          ? "rgba(237, 112, 20, 0.2)"
                          : "rgb(237, 112, 20)",
                      color:
                        value?.senderId === userDataState?.userId
                          ? "black"
                          : "white",
                    }}
                  >
                    <p>{value?.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="chat-inputs">
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
                    cursor: "pointer",
                  }}
                  onClick={responsiveSendMessage}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
