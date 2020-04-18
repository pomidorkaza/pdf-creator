import React, { useState } from 'react'
import cx from 'classnames';
import {Button} from '../../components/Button';
import styles from './styles.module.css';
import axios from 'axios';
export const Form = ({style, className, ...restProps}) => {
    

    const [dataForm,setDataForm] = useState({
        user_pid:"",
        date:"",
        question:"",
        is_director:false,


});
    const [isDisabled, setDisabled] = useState(false);

    const onChangeHandler =e=>{
        setDataForm({
            ...dataForm,
            [e.target.name]: e.target.value
        });

    };
    const SubmitHandler =(e)=>{
        e.preventDefault();
        setDisabled(true);
        axios({
            method: 'post',
            url: 'http://localhost:5000/test',
            data: {
                ...dataForm
                }
        })
        .then(res=>{
            setDisabled(false);
            // console.log(res);

            })
        .catch(err=>console.log(err));
        
        
}
const {user_pid,date,question,is_director } = dataForm;
    return (
        <form className={cx(styles['form'],className )}
        style={style} 
        {...restProps}>
         <input name="user_pid"  value={user_pid}   type="hidden"/>
        <input  name="date"  value={date} type="hidden"/>
        <input  name="is_director" value={is_director}  type="hidden"/>
         
        <div className={styles['wrapper-textarea']}>
            <textarea
             className={styles['textarea']}
            name="question"
            value={question}
            onChange={(e)=>onChangeHandler(e)}
            >
            </textarea>
        </div>
        <div className="submit-to-derector-errors">
        </div>
    <Button type="submit" 
            disabled={isDisabled}
            type={isDisabled?"disabled":"submit"}
        onClick={(e)=>SubmitHandler(e)}
        className={styles['form-btn']}>
        Отправить
    </Button>
        
    </form>
    )
}
