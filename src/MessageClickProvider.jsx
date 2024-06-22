import { messageContext } from "./MessageClickContext";
import { useState } from "react";
const MessageClickProvider = ({ children }) => {
  const [currentId, setCurrentId] = useState("exit");

  const responsiveChatClick = (e) => {
    const clickedElement = e.target.closest(".chatscomponents");

    if (clickedElement) {
      const clickedId = clickedElement.id;
      setCurrentId(clickedId);

      sessionStorage.setItem("currentId", clickedId);
    }
  };

  const resetClick = () => {
    sessionStorage.setItem("currentId", "exit");
    setCurrentId("exit");
  };

  return (
    <messageContext.Provider
      value={{
        currentId,
        setCurrentId,
        responsiveChatClick,
        resetClick,
      }}
    >
      {children}
    </messageContext.Provider>
  );
};

export default MessageClickProvider;
