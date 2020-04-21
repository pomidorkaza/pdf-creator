


import React ,{useEffect, useState} from 'react'
import cx from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import {useParams} from 'react-router-dom';
import styles from './styles.module.css';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

import {getTopNewsAsync} from '../../actions';

export const TopNews=({style, className,  ...restProps})=> {
    const topNews = useSelector(state=>state.topNews);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getTopNewsAsync());
    },[]);


    return (
        <div  className={cx(styles['news-container'],className)} 
        style={style}
            {...restProps}> 
<div className={styles['top-news']}>Главные новости</div> 
        {
            topNews.map((item,index)=>{
                return    <NavLink key={item.id} to={`/docs/${item.id}`} className={styles['news-container-item']}><span 
                className={styles['news-container-item-icon']}>{index+1}</span><span className={styles['news-container-item-txt']}>
            {item.title}</span>
                </NavLink>
            })
        }
    </div>
    )
}


