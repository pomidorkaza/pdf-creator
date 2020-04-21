import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

import {Button} from '../../components/Button';
import {PdfContainer} from '../../components/PdfContainer';
import {BlogItem} from '../../components/BlogItem';
import {BlogContainerWithButtons} from '../../components/BlogContainerWithButtons';
import {useHistory } from 'react-router-dom';
import {TopNews} from '../../components/TopNews';

import axios from 'axios';

import styles from './styles.module.css';

export const NewsDetailPage=({isLoading,blogs})=>{
    const history = useHistory()
    let { id } = useParams();
    const [isLoadingPdf,setLoading] = useState(true);
    const [currentNews,setCurrentNews] = useState(null);

    useEffect(()=>{
        axios.get(`http://localhost:5000/news/${id||0}`)
        .then((res)=>{
            console.log(res.data[0]);
            setCurrentNews(res.data[0]);
            setLoading(false);
        })
        .catch(err=>{
            console.log(err);
        })

    },[]);

    return <div className={styles['detailnews-page']}>
        <div className={styles['back-container']} > 
            <Button className={styles['back-container-btn']} 
            onClick={(e)=>history.goBack()}
            type="primary"
            >Назад</Button>
            <h2 className={styles['back-container-text']}>{currentNews?currentNews.title:""}</h2>
            </div>
            <PdfContainer  id={id} 
            currentNews={currentNews}
            isLoadingPdf={isLoadingPdf}

            >

            </PdfContainer> 
            </div>;
};