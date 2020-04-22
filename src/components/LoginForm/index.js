import React, { useState, Fragment } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';
import {Button} from '../../components/Button';
import styles from './styles.module.css';
import axios from 'axios';
import {asyncCheckRegistrationUser} from '../../actions';
import {checkValidity, allValidity,errorMessage} from '../../utils';


function ErrorComponent({value,validators}){

    console.log(errorMessage(validators[0]));
    let res = validators.filter((item)=>{
        return !checkValidity({
            validatorType:item,
            value:value
        });
    });
    if(res.length){
        return res.map((item,index)=>{
            return <Fragment key={index}> <span key={index} 
                    className={styles['message-error']}>{errorMessage(item)}</span><br/></Fragment>
        })
    }
    
    return null;

}

const Input =({
            className,
            field_name = "input",
            onHandleChange,
            FormFieldObj,
            validators,
            isValid,
            isBlured,
            labelField,
            ...restProps
            }) => {
                
    if(field_name==="textarea"){
        return <div className={cx(className, isBlured && (isValid? "":styles['input-error'])) }>
    {  isBlured && ( !isValid && <ErrorComponent validators={validators} value={FormFieldObj.value} />)}

                <textarea className={styles['textarea-field']}
                    value={FormFieldObj.value}
                    name={FormFieldObj.name}
                    onChange={(e)=>{
                    onHandleChange({name: e.target.name,value: e.target.value,validators: validators})}}{...restProps}></textarea>
            </div>
        
    }
    

    return   <div className={cx( className, isBlured && (isValid? "":styles['input-error'])) }>
    { isBlured && ( !isValid && 
        <ErrorComponent
            validators={validators}
            value={FormFieldObj.value}
        />)}
    <label className={styles['form-container-item-label']}>
            {labelField}
    </label>
    <input className={styles['input-field']}
                
                value={FormFieldObj.value}
                name={FormFieldObj.name}
                
                onChange={(e)=>{
                    onHandleChange({
                        name: e.target.name,
                        value: e.target.value,

                        validators: validators,
        })
                }}
                    {...restProps}/>
        </div>
        ;
};

export const LoginForm = ({style, className, type, children,
    ...restProps})=>{
    
    const dispatch = useDispatch();
    
    const [formData, setFormData] = useState({

        PIN:{
            value:"",
            isValid: false,
            isBlured: false,

        },
        PID:{
            value: "",
            isValid:false,
            isBlured: false,

        },
    });
    
 
    const HandleSubmit=(e)=>{
        e.preventDefault();
        const user_pid = formData.PID.value;
        const user_pin = formData.PIN.value;
        dispatch(asyncCheckRegistrationUser({user_pid,user_pin}));
    }
    const onHandleChange=({name, value, validators})=>{
            let  totalValidity = allValidity( validators.map((item)=> checkValidity({
                validatorType:item,
                value:value
            })));        

        setFormData((prevState)=>{
            return {
                ...prevState,
                [name]:{
                    ...prevState[name],
                    value: value,
                    isValid:  totalValidity,
            }
            }
        });
        console.log(formData);
    }

    const blurHandler=(field_param)=>{
        setFormData({...formData,
            [field_param]:{...formData[field_param],
                                isBlured:true,}})   
    }
    const transferFields = (field_param)=>{
            return {
                isValid:formData[field_param].isValid,
                isBlured:formData[field_param].isBlured,
                FormFieldObj:{
                            name: field_param,
                            value: formData[field_param].value
                }
            }
    }

    return <form 
    className={cx(styles['form-container'],className)} 
            style={style}
            
        {...restProps}
    onSubmit={(e)=>HandleSubmit(e)}>
                    <Input  
                        onBlur={(e)=>{blurHandler("PID")}}
                        className={styles['form-container-item']}  
                        validators={["REQUIRED", "MIN_LENGTH"]}
                        labelField="Введите PID"
                        onHandleChange = {onHandleChange}
                            {...transferFields("PID")}
                        />
                        <Input 
                        field_name="textarea"
                        placeholder="Введите данные"
                        onBlur={(e)=>{blurHandler("PIN")}}
                        className={styles['form-container-item']}  
                        validators={["LENGTH", "MIN_LENGTH"]}
                        labelField="Введите PIN"
                        onHandleChange = {onHandleChange}
                            {...transferFields("PIN")}
                        />

                <div className={styles['form-container-item__last']} >
                    <Button type="primary">Подтвердить</Button>
                </div>
            </form>
}