import React from 'react';
import {Button} from '../../components/Button';

import {PdfContainer} from '../../components/PdfContainer';
import {useHistory } from 'react-router-dom';
import styles from './styles.module.css';

export const UserInfoPage=()=>{
    const history = useHistory();

    return <div className={styles['user-info-page']}>
        <div className={styles['back-container']} > 
            <Button className={styles['back-container-btn']} 
            onClick={(e)=>history.goBack()}
            >Назад</Button>
            <h2 className={styles['back-container-text']}>Pdf листок</h2>
    </div>

</div>;
};