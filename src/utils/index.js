

//проверяем  массив валидных полей 
const MAX_LENGTH = "MAX_LENGTH";
const REQUIRED ="REQUIRED";

export function errorMessage(word){
        switch (word){
            case MAX_LENGTH:{
                return "Поле не должно быть меньше 6 символов";
            }
            case REQUIRED:{
                return "Поле не должно быть пустым";
            }
            default:
                return "";
        }
}
export function allValidity(array_of_fields){
    
    let validchekcer = array_of_fields[0] && true;
    for (let i = 1; i < array_of_fields.length; i++) {
        if (!validchekcer) return false;
            validchekcer = validchekcer && array_of_fields[i];
    }
    return validchekcer;
}
//Проверяем поле на валидность  
export function checkValidity(field){

            switch (field.validatorType){
                case MAX_LENGTH:
                    return field.value.length>=6 &&field.value.length<=30;
                case REQUIRED:
                    return field.value.trim()!=="";
                    default:
                        return true;
            }
}