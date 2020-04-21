import React, { useState } from 'react';
import {useDispatch } from 'react-redux';
import cx from 'classnames';
import {Button} from '../../components/Button';
import styles from './styles.module.css';
import axios from 'axios';
import {checkValidity, allValidity} from '../../utils';


const Input =({
    className,
    field_name = "input",
    onHandleChange,
    FormFieldObj,
    validators,
    isValid,
    isBlured,
    labelField,
        ...restProps})=>{
            console.log(isBlured);
    return   <div className={cx(className,
                    isBlured && (isValid? "":styles['input-error'])) }
    
    >
    <label className={styles['form-container-item-label']}>
           {labelField}
    </label> <input className={styles['input-field']}
                
                value={FormFieldObj.value}
                name={FormFieldObj.name}
                
                onChange={(e)=>{
                    onHandleChange({
                        name: e.target.name,
                        value: e.target.value,

                        validators: validators,
        })
                }}
                    {...restProps}
        />
        </div>
        ;
};

export const LoginForm = ()=>{

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
    const transferFields= (field_param)=>{
            return {
                isValid:formData[field_param].isValid,
                isBlured:formData[field_param].isBlured,
                FormFieldObj:{
                            name: field_param,
                            value: formData[field_param].value
                }
            }
    }

    return <form className={styles['form-container']} onSubmit={(e)=>HandleSubmit(e)}>
                    <Input  
                        onBlur={(e)=>{blurHandler("PID")}}
                        className={styles['form-container-item']}  
                        validators={["LENGTH", "MIN_LENGTH"]}
                        labelField="Введите PID"
                        onHandleChange = {onHandleChange}
                            {...transferFields("PID")}
                        />
                        <Input 
                    
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