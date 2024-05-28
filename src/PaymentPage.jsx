import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const PaymentPage = () => {
  return (
    <div className="payment-page">
      <div className="payment-page-head">
        <h2>payment methods</h2>
        <button>
          <FontAwesomeIcon icon={faPlus} />
          add new
        </button>
      </div>
    </div>
  );
};
