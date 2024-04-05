import axios from "axios";
import { BsTypeStrikethrough } from "react-icons/bs";
import * as types from "./action_types";

const getUsers=(users)=>({
    type:types.GET_USERS,
    payload:users,
})
export const loadUsers=(id)=>{
    return function(dispatch){
        const data =axios.get(`http://localhost:5000/employee_list/${id}/${1}`).then(res => {
   
        dispatch(getUsers(res.data.data))
    })
}
}
