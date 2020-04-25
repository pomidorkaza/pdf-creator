import React, { useState, Fragment, useCallback ,useReducer ,useEffect } from 'react';
import {useDispatch, useSelector } from 'react-redux';

import {useForm} from '../../hooks/FormHook';

import {Input} from '../Input';
import cx from 'classnames';
import {Button} from '../../components/Button';
import styles from './styles.module.css';
import axios from 'axios';
import {asyncCheckRegistrationUser} from '../../actions';


 

export const LoginForm = ({style, className, type, children,
    ...restProps})=>{
    
    
    const [formData, onInputTrigger] = useForm({
        PID:{
            value:"",
            isValid:false
        },
        PIN:{
            value:"",
            isValid: false
        }
    },true);

    return <form 
    className={cx(styles['form-container'],className)} 
            style={style}     
        {...restProps}
>
                <Input 
                    id="PIN"
                    label="Введите PIN"
                    onInput={onInputTrigger}
                    validators={["REQUIRED","MAX_LENGTH"]} 
                    className={styles['form-container-item']} />
                <Input 
                    el="textarea"
                    label="Введите PID"
                    id="PID"
                    onInput={onInputTrigger}
                    validators={["REQUIRED","MIN_LENGTH_PID"]} 
                    type="password"
                    className={styles['form-container-item']} 
                    
                    /> 

                <div className={styles['form-container-item__last']} >
                    <Button   type="primary" disabled={!formData.isValid}>Подтвердить</Button>
                </div>
            </form>
}