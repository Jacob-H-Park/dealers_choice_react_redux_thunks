import React from "react";
import { connect } from "react-redux";
import { fetchAllPhoneNumbers, removeNumber, toggleNumber } from "../store";

class PhoneNumbers extends React.Component {
  componentDidMount() {
    this.props.bootstrap();
  }
  render() {
    const { phoneNumbers, getRidOf, toggle } = this.props;
    return (
      <ul>
        {phoneNumbers.map((number) => {
          return (
            <li
              key={number.id}
              onClick={() => toggle(number)}
              className={!!number.taken ? "taken" : "available"}
            >
              {number.number}{" "}
              <button
                onClick={() => {
                  getRidOf(number);
                }}
              >
                X
              </button>
            </li>
          );
        })}
      </ul>
    );
  }
}

const mapState = (state) => state;
const mapDispatch = (dispatch) => {
  return {
    bootstrap: () => dispatch(fetchAllPhoneNumbers()),
    toggle: (number) => dispatch(toggleNumber(number)),
    getRidOf: (number) => dispatch(removeNumber(number)),
  };
};

export default connect(mapState, mapDispatch)(PhoneNumbers);
