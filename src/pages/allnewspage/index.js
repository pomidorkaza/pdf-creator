import React, {useEffect} from 'react';
import {Button} from '../../components/Button';
import {NavLink} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {BlogItem} from '../../components/BlogItem';
import img from '../../images/pdf-book.svg';
import {BlogContainerWithButtons} from '../../components/BlogContainerWithButtons';
import {useHistory } from 'react-router-dom';
import cx from 'classnames';
import styles from './styles.module.css';

export const AllNewsPage=()=>{
    const history = useHistory();
    const allNews = useSelector(state=>state.topNews);
    console.log(allNews);
    useEffect(()=>{
        if(allNews){
            console.log(allNews)
        }
    },[allNews]);
    return <div className={styles['allnews-page']}>
        <div className={styles['back-container']} > 
            <Button className={styles['back-container-btn']} 
            onClick={(e)=>history.goBack()}
            type="primary"
            >Назад</Button>
            <h2 className={styles['back-container-text']}>Новости СБН</h2>
            </div>
            <div className={styles['grid-container']}>
                    {
                    allNews&& allNews.map((item,index)=>{
                        return (<NavLink to={`docs/${item.id}`} key={item.id} className={cx(styles['grid-container-item'], styles[`item-${index+1}`])}>
                                            <img 
                                            className={styles['grid-container-item-icon']}
                                            src={img}
                                            />
                                            <span 
                                            className={styles['grid-container-item-txt']}>{item.title}</span> 
                                </NavLink>)
                            })
                    }
                </div>
            </div>;
};