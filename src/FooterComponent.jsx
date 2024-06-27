import { useContext } from "react";
import { Devices } from "./App";
import { FiHome } from "react-icons/fi";
import { TiMessages } from "react-icons/ti";
import { FaChalkboardTeacher } from "react-icons/fa";
import { IoCardOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { messageContext } from "./MessageClickContext";
export const FooterComponent = () => {
  const { userData, activeLinkId, handleClick } = useContext(Devices);
  const { currentId } = useContext(messageContext);

  return (
    currentId === "exit" && (
      <footer>
        <div
          className={`links my-icons ${
            activeLinkId === "house" ? "active" : ""
          }`}
          id="house"
          onClick={handleClick}
        >
          <FiHome />
          <p>home</p>
        </div>
        <div
          className={`links my-icons ${
            activeLinkId === "message" ? "active" : ""
          }`}
          id="message"
          onClick={handleClick}
        >
          <TiMessages />
          <p>messages</p>
        </div>
        {userData.accountType === "Student Account" && (
          <div className="my-icons links" id="payment" onClick={handleClick}>
            <IoCardOutline />
            <p>payments</p>
          </div>
        )}
        <div className="my-icons links" id="book" onClick={handleClick}>
          <FaChalkboardTeacher />
          <p>classes</p>
        </div>
        <div className="my-icons links" id="profile" onClick={handleClick}>
          <FiUsers />
          <p>profile</p>
        </div>
      </footer>
    )
  );
};
