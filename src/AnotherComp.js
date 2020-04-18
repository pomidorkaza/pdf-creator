import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function AnotherComp() {
    const people = useSelector(state=>state.people);
    const dispatch = useDispatch();
    return (
        <div>
            <button onClick={()=>dispatch({type:"GET_DATA_ASYNC"})}>Async Loading...</button>
            <button onClick={()=>dispatch({type:"INCREMENT_ASYNC"})}>Async Cick</button>
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
