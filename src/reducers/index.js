const initialState ={
    topNews: [],
};

function mainReducer(state = initialState, action ){
    switch (action.type){
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