import React,{useState , useEffect ,useRef} from 'react';
import axios from 'axios';
import cx from 'classnames';
import styles from './styles.module.css';
import {BlogContainerWithButtons} from '../../components/BlogContainerWithButtons';
import pdfjs from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;


export const PdfContainer =({style,isLoadingPdf,currentNews, className, type,...restProps})=>{
    
    const divContainer = useRef(null);
    const [pdf, setPdf] = useState(null);
    function renderPage(page){
        let scale = 1;
        let viewport = page.getViewport({scale: scale});
        
        let newCanvas = document.createElement('canvas');

        let canvas = newCanvas;
        
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        const renderContext = {
        canvasContext: context,
        viewport: viewport
        };
        divContainer.current.appendChild(canvas);

        const renderTask = page.render(renderContext);
        renderTask.promise.then( ()=>{
        console.log('Page rendered');
        });
    }
    
        useEffect(() => {  
                if(currentNews && currentNews.pdf_path_name){   
                    pdfjs.getDocument(process.env.PUBLIC_URL+'/upload/tmp/'+currentNews.pdf_path_name)
                    .promise
                    .then((_pdf)=>{
                            setPdf(_pdf);
                });

            }

        
    }, [currentNews]);

    useEffect(()=>{
        if(pdf){
            pdf.getPage(1).then(function(page){
                renderPage(page);
            } ) 
        }
            
    },[pdf]);

    return(<BlogContainerWithButtons 
        className={cx(styles['pdf-container'],className)} 
        style={style}
        
    {...restProps}
    > 
       <div ref={divContainer} >
            </div></BlogContainerWithButtons>);
}