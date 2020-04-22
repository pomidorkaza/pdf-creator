import React, { useState, Fragment, useCallback ,useReducer ,useEffect } from 'react';
import cx from 'classnames';
import styles from './styles.module.css';
import {checkValidity,errorMessage} from '../../utils';


function ErrorMessageComponent({errorsarray}){
    if(errorsarray.length){
        return <div className={styles['error-container']}>
        {
            errorsarray.map( (item,index)=><span className={styles['message-error']} key={index}>{errorMessage(item)}</span>)
        }
    </div>
    }
    return  null;
}

function checkValiditySecond(value, validators){

    let finalValidity = true;
    let allFields = validators.filter(field=>{
        if( !checkValidity({
            validatorType:field,
            value:value})){
            finalValidity = false;
                return  true;
        }
        return false;  

    });

    return [finalValidity,allFields ];
}  

const inputReducer=(state, action)=>{
    switch(action.type){
        case 'TOUCH':
            return {
                ...state,
                isTouched: true
            }
        case 'CHANGE_ACTION':
            return {
                ...state,
                value: action.val,
                isValid: checkValiditySecond(action.val,action.validators)[0],
            }
        default:
            return state;
    }
}

export const Input =({
            className,
            id,
            el,
            validators,
            updateCurentField,
            field_name = "input",
            onInput,
            label,
            ...restProps
}) => {
    const [inputState, dispatch] = useReducer(inputReducer,{value: "", isValid: false,isTouched: false});
    const handleChange =(e)=>{
        dispatch({
            type:"CHANGE_ACTION",
            val: e.target.value,
            validators:validators
        })
    }   
    const onTouch = ()=>{
        dispatch({
        type:"TOUCH",
        });
    }
    const {value, isValid} = inputState;
    useEffect(()=>{
        onInput(id, inputState.value, inputState.isValid);
    },[onInput,value,isValid]);
            
    if(el==="textarea"){
        return <div  className={cx( className,
            styles["textarea-field-wrapper"],
            styles['input-wrapper'],
            styles['input-wrapper-second'],
        inputState.isTouched &&(!inputState.isValid?styles['input-error'] :""))}>
        {inputState.isTouched &&(!inputState.isValid ? <ErrorMessageComponent errorsarray={checkValiditySecond(value, validators)[1]} /> :null)}
                    <label htmlFor={id} className={styles['label-field']}>
                            {label}
                    </label>
        
    <textarea className={styles["textarea-field"]}
            id={id}  
    value={inputState.value}
    onChange={handleChange}    
    onBlur={onTouch}
        {...restProps}
    >
    </textarea>
</div>}

else {return  (<div className={cx(  className,
                                    styles['input-wrapper'],
                                    styles['input-wrapper-second'],
                                    inputState.isTouched &&(!inputState.isValid?styles['input-error'] :""))}>
                {inputState.isTouched &&(!inputState.isValid ? <ErrorMessageComponent errorsarray={checkValiditySecond(value, validators)[1]} /> :null)}
                    <label htmlFor={id} className={styles['label-field']}>
                            {label}
                    </label>
                <input id={id} className={styles['input-field']} 
                value={inputState.value}
                onChange={handleChange}    
                onBlur={onTouch}
                    {...restProps}/>
            </div>);
};
}