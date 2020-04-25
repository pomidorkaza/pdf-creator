import { INCREMENT, DECREASE,CHECK_REG,LOAD_FILTER_PDF_CARDS } from "../actionType";
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
export function getFilteredNews(filter_param){
  return dispatch=>{
    axios.get(`${process.env.REACT_APP_SERVER_PATH}/api/${filter_param}`)
    .then((res)=>{
      dispatch({
        type: LOAD_FILTER_PDF_CARDS,
        payload:res.data});  
      }).catch((err)=>{
      console.log(err);
    });
  }
}
export function getAllRightMenuItems(){
  return dispatch =>{
  axios.get(`${process.env.REACT_APP_SERVER_PATH}/all_pages`)
  .then((res)=>dispatch({
      type:"LOAD_ALL_RIGHT_MENU_ITEMS",
      payload: { data:res.data,err: false,loading: false }
    }))
    .catch((err)=>{
      dispatch({
        type:"LOAD_ALL_RIGHT_MENU_ERROR",
        payload:{ err: true,
                  loading: false
              }
      })
    })
  
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
