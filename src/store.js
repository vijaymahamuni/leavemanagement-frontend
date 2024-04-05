

import {createStore,applyMiddleware} from "redux";
import logger from "redux-logger";
import reduxThunk from "redux-thunk";
import rootReducer from "./rootReducer";
import counterReducer from "./Counter";


const middlewares=[reduxThunk];

// if(process.env.NODE_ENV==="development"){
// middlewares.push(logger);
// }

const store=createStore(rootReducer,applyMiddleware(...middlewares))
// const store = createStore(counterReducer);
export default store;
