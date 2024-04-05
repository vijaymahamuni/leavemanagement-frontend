import { createStore } from 'redux';

const initialState = { count: 0 };

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 2 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    case 'RESET':
        return {...state,count:0};
    default:
      return state;
  }
}

export default counterReducer;
