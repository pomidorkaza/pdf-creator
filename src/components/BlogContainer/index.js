import React, {useRef,useEffect, useState} from 'react'
import {Button} from '../../components/Button';
import cx from 'classnames';
import {ScrollHandler} from '../../components/ScrollHandler';
import styles from './styles.module.css';





export const BlogContainer = ({style,children,  className, ...restProps}) => {
    

    const container = useRef(null);
    
    return (
 <>
 
        
        <div ref={container} className={cx(styles['container'],className)} 
        
        {...restProps}>
        
            {children}
        </div>
        <ScrollHandler
    container={container}/> 
   </>
      )
}
