 import React, {useState} from 'react';
 import { useSelector, useDispatch } from 'react-redux';

 export default function Button() {
     const counter = useSelector(state=>state.value);
     const people = useSelector(state=>state.people);
     const [currentPersonName, setCurName] = useState("");
     const dispatch = useDispatch();
     return (
         <div>
             <h3>{counter}</h3>
             <button onClick={()=>dispatch({type:"ADD_PERSON" ,
             payload:{
                 value:currentPersonName,
             }})}>Add Person</button>
             <input onChange={
                (e)=>{
                    setCurName(e.target.value);
                 } 
             }  value={currentPersonName}/>
             <button onClick={()=>dispatch({type:"ADD_PERSON"})}>Add Person</button>
             <button onClick={()=>dispatch({type:"INCREMENT"})}>Click</button>
            <ul>
                {
                    people.map((item)=>{
                        return <li key={item.id}>
                            {
                                item.name
                            }
                        </li>
                    })
                }
            </ul>
         </div>
     )
 }
 