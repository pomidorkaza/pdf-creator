import React, {useState,useEffect} from 'react';
import {Button} from '../../components/Button';
import {NavLink,useHistory, useParams} from 'react-router-dom';

import {useSelector, useDispatch} from 'react-redux';
import axious from 'axios';

import {BlogItem} from '../../components/BlogItem';

import img from '../../images/pdf-book.svg';
import {BlogContainerWithButtons} from '../../components/BlogContainerWithButtons';

import {getFilteredNews,getAllRightMenuItems} from '../../actions';

import cx from 'classnames';
import styles from './styles.module.css';

export const AllNewsPage=()=>{
    const history = useHistory();

    const allNews = useSelector(state=>state.filteredPdfsCards);
    const filteredPage = useSelector((state)=>state.allRightNews);
    
    const [title,setTitle] =useState("");
    const dispatch = useDispatch();
    const { pathName } = useParams();
    
    useEffect(()=>{
        dispatch(getFilteredNews(pathName));
    },[]);
    useEffect(()=>{
    if(filteredPage){
                let test = filteredPage.find((item)=>item.path_name== pathName);
                if(test) {
                    setTitle(test.title);
                }
                else {
                    dispatch(getAllRightMenuItems());
                }
        }
    },[filteredPage]);
    return <div className={styles['allnews-page']}>
        <div className={styles['back-container']} > 
            <Button className={styles['back-container-btn']} 
            onClick={(e)=>history.goBack()}
            type="primary"
            >Назад</Button>
            <h2 className={styles['back-container-text']}>{title}</h2>
            </div>
            <div className={styles['grid-container']}>
                    {
                    allNews.length? (allNews.map((item,index)=>{
                        return (<NavLink to={`docs/${item.id}`} key={item.id} className={cx(styles['grid-container-item'], styles[`item-${index+1}`])}>
                                            <img 
                                            className={styles['grid-container-item-icon']}
                                            src={img}/>
                                            <span 
                                            className={styles['grid-container-item-txt']}>{item.title}</span> 
                                </NavLink>)
                            })):null
                        }
                </div>
            </div>;
};