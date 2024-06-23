import {
  faAngleDown,
  faAngleUp,
  faArrowDown,
  faArrowUp,
  faEllipsis,
  faPen,
  faPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PaymentHeadComp } from "./PaymentHeadComp";
import { PaymentDetailsBody } from "./PaymentDetailsBody";
import { ResponsivePayment } from "./ResponsivePayment";
export const PaymentPage = () => {
  const [toggleUp, setToggleUp] = useState(false);

  const handleToggleUp = () => setToggleUp(!toggleUp);

  return (
    <>
      <ResponsivePayment />
      <div className="payment-page">
        <div className="payment-page-head">
          <h2>overview</h2>
          <button>
            <FontAwesomeIcon icon={faPlus} />
            setup payment
          </button>
        </div>

        <div className="payment-body-flex-account">
          <div className="first-payment-flex-account">
            <div className="account-summary-details">
              <div className="account-summary">
                <p className="first-child">approved transactions</p>
                <div className="detail-flex-account">
                  <h3>1,243</h3>
                  <small style={{ color: "green" }}>
                    <FontAwesomeIcon icon={faArrowUp} />
                    <p>1.34%</p>
                  </small>
                </div>
              </div>

              <div className="account-summary">
                <p className="first-child">declined transactions</p>
                <div className="detail-flex-account">
                  <h3>243</h3>
                  <small style={{ color: "red" }}>
                    <FontAwesomeIcon icon={faArrowDown} />
                    <p>1.34%</p>
                  </small>
                </div>
              </div>

              <div className="account-summary">
                <p className="first-child">total income</p>
                <div className="detail-flex-account">
                  <h3>$3,252</h3>
                  <small style={{ color: "green" }}>
                    <FontAwesomeIcon icon={faArrowUp} />
                    <p>2.04%</p>
                  </small>
                </div>
              </div>

              <div className="responsive-second-payment-flex-account">
                <p>current account</p>
                <h3>
                  <span>5432 </span>
                  <sup>****</sup> <sup>****</sup> <span>4089</span>
                </h3>
              </div>
            </div>
          </div>
          <div className="second-payment-flex-account">
            <p>current account</p>
            <h3>
              <span>5432 </span>
              <sup>****</sup> <sup>****</sup> <span>4089</span>
            </h3>
          </div>
        </div>

        <div className="account-informations-div">
          <div className="account-info-div-1">
            <div className="first-part-account-info">
              <div className="bank-icon-img">
                <img
                  src={require("./images/image-removebg-preview.png")}
                  alt=""
                />
              </div>
              <p>bank account</p>
            </div>
            <div
              className="other-bank-info"
              style={{ display: !toggleUp && "none" }}
            >
              <p>bank name :</p>
              <p>email address :</p>
              <p>account holder :</p>
            </div>
          </div>
          <div className="account-info-div-2">
            <div className="first-part-account-info">
              <p>Jasminedelarus@gmail.com</p>
            </div>

            <div
              className="other-bank-info"
              style={{ display: !toggleUp && "none" }}
            >
              <p>paypal</p>
              <p>Jasminedelarus@gmail.com</p>
              <p>jasmine delarus</p>
            </div>
          </div>
          <div className="account-info-div-3">
            <div className="first-part-account-info">
              <p>
                available balance: <b>$1,200</b>
              </p>
            </div>

            <div
              className="other-bank-info"
              style={{ display: !toggleUp && "none" }}
            >
              <button>withdraw</button>
            </div>
          </div>
          <div className="account-info-div-4">
            <div className="first-part-account-info">
              <FontAwesomeIcon
                icon={faEllipsis}
                style={{ fontSize: "13px", cursor: "pointer" }}
              />
              <FontAwesomeIcon
                icon={toggleUp ? faAngleUp : faAngleDown}
                style={{ fontSize: "13px", cursor: "pointer" }}
                onClick={handleToggleUp}
              />
            </div>

            <div
              className="other-bank-info"
              style={{ display: !toggleUp && "none" }}
            >
              <div className="icon-flex-other-info">
                <FontAwesomeIcon
                  icon={faPen}
                  style={{ fontSize: "14px", color: "#ed7014" }}
                />
                <FontAwesomeIcon
                  icon={faTrashCan}
                  style={{ fontSize: "14px", color: "#ed7014" }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="account-info-payment-history">
          <div className="payment-history-head">
            <h2>payment history</h2>
          </div>

          <PaymentHeadComp />
          <PaymentDetailsBody />
          <PaymentDetailsBody />
          <PaymentDetailsBody />
          <PaymentDetailsBody />
        </div>
      </div>
    </>
  );
};
