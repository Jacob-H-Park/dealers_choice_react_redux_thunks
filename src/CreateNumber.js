import React from "react";
import { connect } from "react-redux";
import { createRandomNumber } from "../store";

const CreateNumber = ({ create }) => {
  return (
    <div>
      <button onClick={create}>Create</button>
    </div>
  );
};

const mapState = (state) => state;
const mapDispatch = (dispatch) => {
  return {
    create: () => dispatch(createRandomNumber()),
  };
};

export default connect(mapState, mapDispatch)(CreateNumber);
