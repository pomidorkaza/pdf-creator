import React from 'react';
import {Button} from '../../components/Button';

import {BlogItem} from '../../components/BlogItem';
import {BlogContainerWithButtons} from '../../components/BlogContainerWithButtons';
import {useHistory } from 'react-router-dom';
import styles from './styles.module.css';

export const AnswersPage=({isLoading,blogs})=>{
    const history = useHistory();

    return <div className={styles['answer-page']}>
        <div className={styles['back-container']} > 
            <Button className={styles['back-container-btn']} 
            onClick={(e)=>history.goBack()}
            type="primary"
            >Назад</Button>
            <h2 className={styles['back-container-text']}>Ответы Директору</h2>
            </div>
                <BlogContainerWithButtons className={
                        styles['answer-page-item']
                }> 
            {!isLoading && blogs.map((item,id)=>{
                return <BlogItem {...item} key={id}/>;
            })}
    </BlogContainerWithButtons>
            </div>;
};