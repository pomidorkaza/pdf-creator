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
    
    const {id, pathName} = useParams();

    const [isLoadingPdf,setLoading] = useState(true);
    const [currentNews,setCurrentNews] = useState(null);
    const [isError, setError] = useState(false);
    useEffect(()=>{

        setLoading(true);
        axios.get(`${process.env.REACT_APP_SERVER_PATH}/api/${pathName}/${id}`)
        .then((res)=>{
            setCurrentNews(res.data);
            setError(false);
            setLoading(false);
        })
        .catch((err)=>{
                
            setError(true);
        });
        
        

    },[]);

    return <div className={styles['detailnews-page']}>
        <div className={styles['back-container']} > 
            <Button className={styles['back-container-btn']} 
            onClick={(e)=>history.goBack()}
            type="primary"
            >Назад</Button>
            <h2 className={styles['back-container-text']}>{currentNews?currentNews.title:""}</h2>
            </div>
            {!isError &&!isLoading &&<PdfContainer  id={id} 
                currentNews={currentNews}
                isLoadingPdf={isLoadingPdf}
            >
            </PdfContainer> 
            }
            </div>;
};