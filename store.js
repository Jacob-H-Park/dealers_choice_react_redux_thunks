import { createStore, applyMiddleware, combineReducers } from "redux";
import loggerMiddleware from "redux-logger";
import thunks from "redux-thunk";
import axios from "axios";

const LOAD = "LOAD";
const CREATE = "CREATE";
const DELETE = "DELETE";
const UPDATE = "UPDATE";
const CREATE_BY_INPUT = "CREATE_BY_INPUT";

//thunks
export const fetchAllPhoneNumbers = () => {
  return async (dispatch) => {
    const phoneNumbers = (await axios.get("/api/phonenumbers")).data;
    dispatch({
      type: "LOAD",
      phoneNumbers,
    });
  };
};

export const createNumberByinput = (input) => {
  return async (dispatch) => {
    const inputNumber = (
      await axios.post("/api/phonenumbers", { number: input })
    ).data;
    dispatch({ type: "CREATE_BY_INPUT", inputNumber });
  };
};

export const createRandomNumber = () => {
  return async (dispatch) => {
    const randomPhoneNumber = (await axios.post("/api/phonenumbers/random"))
      .data;
    dispatch({
      type: "CREATE",
      randomPhoneNumber,
    });
  };
};
export const toggleNumber = (numberToUpdate) => {
  return async (dispatch) => {
    const updated = (
      await axios.put(`/api/phonenumbers/${numberToUpdate.id}`, {
        taken: !numberToUpdate.taken,
      })
    ).data;
    dispatch({
      type: "UPDATE",
      numberToUpdate: updated,
    });
  };
};

export const removeNumber = (numberToRemove) => {
  return async (dispatch) => {
    await axios.delete(`/api/phonenumbers/${numberToRemove.id}`);
    dispatch({
      type: "DELETE",
      numberToRemove,
    });
  };
};

//reducer 1
const phoneNumbersReducer = (state = [], action) => {
  if (action.type === "LOAD") {
    state = action.phoneNumbers;
  }
  if (action.type === "CREATE") {
    state = [...state, action.randomPhoneNumber];
  }
  if (action.type === "CREATE_BY_INPUT") {
    state = [...state, action.inputNumber];
  }
  if (action.type === "DELETE") {
    state = state.filter((number) => number.id !== action.numberToRemove.id);
  }
  if (action.type === "UPDATE") {
    state = state.map((number) =>
      number.id === action.numberToUpdate.id ? action.numberToUpdate : number
    );
  }

  return state;
  // switch (action.type) {
  //   case LOAD:
  //     return (state = action.phoneNumbers);
  //   case CREATE:
  //     return (state = action.randomPhoneNumber);
  //   default:
  //     return state;
  // }
};

const rootReducer = combineReducers({
  phoneNumbers: phoneNumbersReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(loggerMiddleware, thunks)
);

export default store;
