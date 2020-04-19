import { INCREMENT, DECREASE } from "../actionType";
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
