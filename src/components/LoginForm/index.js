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
    
    return   <div className={cx(styles['form-container-item'],
                    isBlured && (isValid? "":styles['input-error'])) }
    
    >
    <label className={styles['form-container-item-label']}>
           {labelField}
    </label> <input className={className}
                
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
    const onHandleChange=({name, value, validators,isBlured })=>{
        
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
    return <form className={styles['form-container']} onSubmit={(e)=>HandleSubmit(e)}>
            
               
                    <Input  
                        onBlur={(e)=>{
                                setFormData({...formData,
                                    PID:{
                                        ...formData.PID,
                                        isBlured:true,

                                    }
                                })    
                        }}

                        className={styles['form-container-item-input']}
                        validators={["LENGTH", "MIN_LENGTH"]}
                        labelField="Введите PID"
                        onHandleChange={onHandleChange}
                        isValid ={formData.PID.isValid}
                        isBlured={formData.PID.isBlured}
                        FormFieldObj={{
                            name: "PID",
                            value: formData["PID"].value}}
                    />
                    {/* <input type="text"
                            value={PIN}
                            onChange={(e)=>HandleChange(e)}
                            className={styles['form-container-item-input']} 
                            name="PIN"
                            /> */}
   
                <div className={styles['form-container-item__last']} >
                    <Button type="primary">Подтвердить</Button>
                </div>
            </form>
}