import { act } from "react-dom/test-utils";

const initialState ={
    user:{
        name:"Bob",
        password:"1234"
    },
    allRightNews: [],
    isAuthorised: false,
    topNews: [],
    filteredPdfsCards:[]
};

function mainReducer(state = initialState, action ){

    switch (action.type){
        case 'LOAD_FILTER_PDF_CARDS':
         return {
                ...state,
                filteredPdfsCards:[...action.payload]  
            }
        case 'LOAD_ALL_RIGHT_MENU_ITEMS':

        return {
                ...state,
                allRightNews:[...action.payload.data]

            };
        case 'CHECK_REG':
            return {
                ...state,
            }
        case 'CHECK_AUTH':
            const {name, password} = action.payload;
            let isAuthorised = false;
            if(name==state.user.name && password== state.user.password){
                isAuthorised = true;
            }
            return {
                ...state,
                isAuthorised : true

            }
        case 'LOAD_NEWS':
        
        let newTopNews = state.topNews;
        newTopNews =[...action.payload];
        
            return {
                ...state,
                topNews:newTopNews
            } ;
        default:
            return {
                ...state,
            }
    }



}
export default mainReducer;