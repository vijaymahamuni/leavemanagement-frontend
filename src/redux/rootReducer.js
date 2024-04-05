import React, { useState, useEffect, props } from "react";
import "./redux_list.css";
import axios from "axios";
import { CombinedState, combineReducers } from "redux";
import userReducer from "./userReducer";

const RootReducer=combineReducers({
    data:userReducer,
});
export default RootReducer;