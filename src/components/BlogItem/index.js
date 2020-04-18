import React, { useState, useRef, Fragment } from 'react';
import {Button} from '../../components/Button';

import cx from 'classnames';

import styles from './styles.module.css';
export const BlogItem= ({style, className, id, question, answer,sender_name, ...restProps}) =>{

    const answerRef = useRef(null); 
    const watchAnswer=(e)=>{
    let paragraph = answerRef.current;
        paragraph.classList.toggle(styles['blog-item-answer-on']);
    }

    return (
        <Fragment> 
        <hr/>
        <div className={cx(styles['blog-item'],className)} 
        style={style}
        {...restProps}
        >
        <div className={ styles['blog-item-top']}>
            <div className={ styles['blog-item-top-item']}>
            <span className={ styles['blog-item-date']}>01.12.1996</span>
    <span className= {styles['blog-item-author']}>{sender_name}</span>
        </div>
            <div className={cx(styles['blog-item'] ,styles['blog-item-top-item--last'])}>
                <Button type={
                    answer? "available":"disabled"}
                        
    className={styles['blog-item-btn']} onClick={(e)=>watchAnswer(e)}>{
        answer? "Посмотреть ответ":"Ответа нет"
    }</Button>
        </div>
    </div>
    <div className={styles['blog-item-answer-wrapper']}> 
    <p className={styles['blog-item-answer']}
    ref={answerRef}
    > 
            {
                question
            }<br/>
            {
                answer? answer:null
            }
    </p>
    </div>
</div>
</Fragment>);
}
