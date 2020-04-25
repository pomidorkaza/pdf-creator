import {useCallback, useState} from 'react';
export const useForm =(initialInputs, initialFormValidatity)=>{

    const [formData, setFormData] = useState({
        inputs: initialInputs,
    isValid: initialFormValidatity,
    
        });
            
        const onInputTrigger = useCallback((id,value,isValid)=>{
    
            setFormData((prevState)=>{
                        
                    return {
                        ...prevState,
                        inputs:{
                            ...prevState.inputs,
                        [id]:{
                            ...prevState.inputs[id],
                            value: value,
                            isValid: isValid
                        }  
                        }
                
                    }
            });
    
        setFormData((prevState)=>{
            let totalValidity = true;
            for(let currentId in prevState.inputs){
                if( !prevState.inputs[currentId].isValid){
                    totalValidity = false;
                }
            }
            return {
                ...prevState,
                isValid: totalValidity
            }
        })        
    },[setFormData]);
    return [formData, onInputTrigger];
}
