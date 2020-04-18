
import React, {useRef,useEffect, useState} from 'react'
import cx from 'classnames';
import styles from './styles.module.css';
import { BlogContainer } from '../BlogContainer';

export const BlogContainerWithButtons=({style,children,  className, ...restProps})=>{
    return (
        <div className={cx(styles['container-with-buttons'],className)} 
        style={style}
        {...restProps}>
            <BlogContainer> 
                {children}
            </BlogContainer>
        </div>);
}