import React, {useRef,useEffect, useState} from 'react'
import {Button} from '../../components/Button';
import cx from 'classnames';
 
import styles from './styles.module.css';


export const ScrollHandler =({container,style, className, ...restProps})=>{
    const upClickHandler=e=>{
        container.current.scrollTop-=100;
    }
    const downClickHandler=e=>{
        container.current.scrollTop+=100;
    }
    return <div  className={cx(styles['button-container'],className )}
    style={style} 
    {...restProps}>
            <Button  className={styles['button-container-item']} type="controlled" onClick={(e)=>upClickHandler(e)} >Up</Button>
            <Button className={styles['button-container-item']} type="controlled" onClick={(e)=>downClickHandler(e)}>Down</Button>
        </div>
};

