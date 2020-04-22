import { INCREMENT, DECREASE,CHECK_REG } from "../actionType";
import axios from 'axios';
export function incrementAction() {
    return {
      type: INCREMENT,
    };
  }
export function decreaseAction() {
  return{
    type: DECREASE,
  };
}

export function asyncCheckRegistrationUser({user_pid,user_pin}){

  return dispatch=>{
    axios.post('http://localhost:5000/users',{
      user_pid,
      user_pin
    })
    .then(res=>{
      
      dispatch({
        type:CHECK_REG,
        payload:{
          allData: res,
          user_pid: user_pid,
          user_pin: user_pin
        }
      });
    })
    ;

  }
}
export function getTopNewsAsync() {
  return dispatch=>{
    axios.get('http://localhost:5000/news/')
    .then(res=>{
        dispatch({type:'LOAD_NEWS',
                  payload:res.data.results
      })
    })
    .catch(err=>console.log(err));
  }
}
