import { faHand } from "@fortawesome/free-regular-svg-icons";
import {
  faCommentsDollar,
  faEllipsis,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const ResponsivePayment = () => {
  const Transaction = () => {
    return (
      <div className="transactionBody">
        <div className="person-image-div">
          <img src={require("./images/beard-1845166_1280.jpg")} alt="" />
        </div>
        <div className="name-date">
          <h2>Lucas Williams</h2>
          <p>10 mar . received</p>
        </div>
        <div className="amount-paid">
          <h2>+$500.00</h2>
        </div>
      </div>
    );
  };
  const WithdrawCard = () => {
    return (
      <div className="withdraw-card">
        <div className="withdraw-head">
          <p>account balance</p>
          <div className="transparent">
            <FontAwesomeIcon
              icon={faEllipsis}
              style={{ fontSize: "18px", color: "white" }}
            />
          </div>
        </div>
        <div className="withdraw-amount">
          <h1>$30,000 USD</h1>
        </div>

        <div className="account-number">
          <div className="dots"></div>
          <div className="dots"></div>
          <div className="dots"></div>
          <div className="dots"></div>
          <p>6753</p>
        </div>
      </div>
    );
  };

  const optionLevel = [
    {
      value: "This Month",
      label: "This Month",
    },
    {
      value: "Last Month",
      label: "Last Month",
    },
    {
      value: "Last Year",
      label: "Last Year",
    },
  ];

  const style = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#fff" : "#fff",
      color: "#000000",
      fontFamily: "Karla, sans-serif",
      fontSize: "14px",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#000000",

      fontFamily: "Karla, sans-serif",
      fontSize: "14px",
    }),

    singleValue: (provided) => ({
      ...provided,
      color: "#000000",
      fontFamily: "Karla, sans-serif",
      fontSize: "14px",
    }),
  };

  return (
    <div className="responsive-payment">
      <div className="responsive-head">
        <h2>hi, fortune😊</h2>
        <div className="chat-icons">
          <FontAwesomeIcon
            icon={faEllipsis}
            style={{ fontSize: "18px", color: "#ed7014" }}
          />
        </div>
      </div>
      <WithdrawCard />
      <div className="withdraw-btns">
        <button>
          <FontAwesomeIcon icon={faCommentsDollar} />
          withdraw
        </button>
        <button>
          <FontAwesomeIcon icon={faHand} />
          request
        </button>
      </div>
      <div className="request-money">
        <div className="request-peeps">
          <FontAwesomeIcon icon={faPlus} />
        </div>
        <div className="request-peeps">
          <img src={require("./images/adult-1851571_1280.jpg")} alt="" />
        </div>
        <div className="request-peeps">
          <img src={require("./images/girl-2961959_1280.jpg")} alt="" />
        </div>
        <div className="request-peeps">
          <img src={require("./images/smile-2072907_1280.jpg")} alt="" />
        </div>
        <div className="request-peeps">
          <img src={require("./images/portrait-3204843_1280.jpg")} alt="" />
        </div>
        <div className="request-peeps">
          <img src={require("./images/fb.jpg")} alt="" />
        </div>
        <div className="request-peeps">
          <img src={require("./images/man-1690965_1280.jpg")} alt="" />
        </div>
      </div>

      <div className="transactions">
        <div className="transaction-head">
          <h2>transactions</h2>
          <p>see all</p>
        </div>
      </div>
      <Transaction />
      <Transaction />
    </div>
  );
};
