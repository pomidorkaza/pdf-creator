import React,{useState , useEffect ,useRef} from 'react';
import axios from 'axios';
import {BlogContainerWithButtons} from '../../components/BlogContainerWithButtons';
import pdfjs from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export const PdfContainer =()=>{
    const [pdfData, setPdfData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const divContainer = useRef(null);
    useEffect(() => {
        
        axios.post('http://localhost:5000/pdf/3')
        .then(res=>{
            if(res.status==200)
            {  
                pdfjs.getDocument({data:atob(res.data.data)})
                .promise
                .then((pdf)=>{
                    
                        pdf.getPage(1).then(function(page) {
                            console.log('Page loaded');
                            
                            let scale = 1.5;
                            let viewport = page.getViewport({scale: scale});

                            
                            let newCanvas = document.createElement('canvas');

                            let canvas = newCanvas;

                            var context = canvas.getContext('2d');
                            canvas.height = viewport.height;
                            canvas.width = viewport.width;
                            let renderContext = {
                            canvasContext: context,
                            viewport: viewport
                            };
                            divContainer.current.appendChild(canvas);

                            let renderTask = page.render(renderContext);
                            renderTask.promise.then(function () {
                            console.log('Page rendered');
                            });
    });
                })

            }

            
        })
        .catch(err=>console.log(err));        
    }, []);

    return(<BlogContainerWithButtons > 
        <div ref={divContainer} >
            </div></BlogContainerWithButtons>);
}