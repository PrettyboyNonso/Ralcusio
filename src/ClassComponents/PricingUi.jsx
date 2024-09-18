import { useContext } from "react";
import { Devices } from "../App";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
export const PricingUi = ({
  startdate,
  Enddate,
  setStartDate,
  setEndDate,
  handlePricePlanning,
}) => {
  const { dateState } = useContext(Devices);
  return (
    <div className="pricing-ui">
      <div className="pricing-ui-head">
        <h2>pricing</h2>
        <p>define a time range for your pricing plans</p>
      </div>

      <form action="">
        <div className="pricing-subheading">
          <p>normal price</p>
        </div>

        <div className="discount-1">
          <p>start date</p>
          <DatePicker
            showYearDropdown
            minDate={new Date()}
            placeholderText={dateState}
            selected={startdate}
            onChange={(startdate) => setStartDate(startdate)}
          />
        </div>
        <div className="discount-1">
          <p>end date</p>
          {startdate && (
            <DatePicker
              showYearDropdown
              minDate={startdate}
              placeholderText={dateState}
              selected={Enddate}
              onChange={(Enddate) => setEndDate(Enddate)}
            />
          )}
        </div>
      </form>

      <div className="price-btn">
        <button onClick={handlePricePlanning}>
          <FontAwesomeIcon icon={faPlus} />
          add new plan
        </button>
      </div>
    </div>
  );
};
