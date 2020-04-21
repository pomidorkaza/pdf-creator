const initialState ={
    user:{
        name:"Bob",
        password:"1234"
    },
    isAuthorised: false,
    topNews: [],
};

function mainReducer(state = initialState, action ){

    switch (action.type){
        
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