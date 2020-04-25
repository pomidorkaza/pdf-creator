import React ,{useEffect, useState, Fragment} from 'react'
import cx from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import {useParams} from 'react-router-dom';

import styles from './styles.module.css';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import {getAllRightMenuItems} from '../../actions';
import axios from 'axios';




export const MainRigthMenu = (style, className, ...restProps)=>{
     
    const allNews = useSelector(state=>state.allRightNews);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getAllRightMenuItems());
        
    },[]);
    return   (<div className={cx(styles['main-right-menu-container'],className)} 
                style={style}
            {...restProps}>
            { allNews.length ? (<Fragment>   
                        {allNews.map((item,index)=>{
                            return <NavLink
                            to={`/${item.path_name}`}
                            className={styles['main-right-menu-container-item']}
                            key={index}
                            >
                                        <span className={styles['main-right-menu-container-item-icon']}></span>
                                        <span className={styles['main-right-menu-container-item-text']}>{item.title}</span>
                            </NavLink>
                        })}
                </Fragment>):"Loading..."
                }
            </div>);
}