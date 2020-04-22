import React, { useState, Fragment, useCallback ,useReducer ,useEffect } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';
import {Button} from '../../components/Button';
import styles from './styles.module.css';
import axios from 'axios';
import {asyncCheckRegistrationUser} from '../../actions';
import {checkValidity, allValidity,errorMessage} from '../../utils';

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

const Input =({
            className,
            id,
            validators,
            updateCurentField,
            field_name = "input",
            onInput,
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
                
    return  (<div className={cx( className, inputState.isTouched &&(!inputState.isValid?styles['input-error'] :""))}>
            {inputState.isTouched &&(!inputState.isValid ? <ErrorMessageComponent errorsarray={checkValiditySecond(value, validators)[1]} /> :null)}
            <input className={styles['input-field']} 
                value={inputState.value}
                onChange={handleChange}    
                onBlur={onTouch}
                    {...restProps}/>
        </div>);
};



export const LoginForm = ({style, className, type, children,
    ...restProps})=>{
    
    
    const [formData, setFormData] = useState({
    inputs:{
        PIN:{
            value:"",
            isValid: false,
        },
        PID:{
            value: "",
            isValid:false,
        },
     },
     isValid: false,

    });
        
    const onInputTrigger = useCallback((id,value,isValid)=>{

        setFormData((prevState)=>{
                
                return {
                    ...prevState,
                    inputs:{
                        ...prevState.inputs,
                    [id]:{
                        ...prevState.inputs[id],
                        value: value,
                        isValid: isValid
                    }  
                    }
            
                }
        });

    setFormData((prevState)=>{
        let totalValidity = true;
        for(let currentId in prevState.inputs){
            if( !prevState.inputs[currentId].isValid){
                totalValidity = false;
            }
        }
        return {
            ...prevState,
            isValid: totalValidity
        }
    })        
},[setFormData]);
    return <form 
    className={cx(styles['form-container'],className)} 
            style={style}     
        {...restProps}
>
                <Input 
                    id="PIN"
                    onInput={onInputTrigger}
                    validators={["REQUIRED","MAX_LENGTH"]} 
                    className={styles['form-container-item']} />
                    <Input 
                    id="PID"
                        onInput={onInputTrigger}
                    validators={["REQUIRED","MAX_LENGTH"]} 

                    className={styles['form-container-item']} />   
                <div className={styles['form-container-item__last']} >
                    <Button   type="primary" disabled={!formData.isValid}>Подтвердить</Button>
                </div>
            </form>
}