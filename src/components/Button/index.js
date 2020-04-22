import React from 'react';
import cx from 'classnames';

import styles from './styles.module.css';


function themeInjection(type){
    if(type == 'primary'){
        return {
            color: '#282d2b',
            background: '#fff',
            boxShadow:'0 11px 20px rgba(0, 0, 0, 0.24)'
        }

    } 
    
    else if(type == "submit"){
        return {
            color: '#fff',
            background: '#31a8dc',
            boxShadow:'0 11px 20px rgba(0, 0, 0, 0.24)'
        }
    }
    else if(type == "available"){
            return {
                background:'#66ff00',
                color: '#fff',
                boxShadow:'0 11px 20px rgba(0, 0, 0, 0.24)'
            }
    }
    else if(type == 'warning'){
        return {
            color: '#fff',
            background: '#ffc107',
            boxShadow:'0 11px 20px rgba(0, 0, 0, 0.24)'
        }
    }
    return {

    };
}

export const Button = ({style, className, type, children,...restProps})=>{
    const typeTheme = themeInjection(type);
    const allStyle  = {...typeTheme,...style};

    return (
    <button className={cx(styles['btn'],className)} 
            style={allStyle}
            
        {...restProps}>{children}</button>)
}