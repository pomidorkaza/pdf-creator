const initialState = {
    value: 220,
    people: [
        {
            id:1,
            name:"Karl",
        },
        {
            id:2,
            name:"Dora"
        },
        {
            id:3,
            name:"Suizyy"
        }
    ]
};

function addReducer(state = initialState, action){
    switch (action.type){
        case 'INCREMENT':
            return {
                ...state,
                value: state.value+1 
            };
            case 'DECREASE':
                return {
                    ...state,
                    value: state.value-1
                };
            case 'ADD_PERSON':
                
            if(action.payload){
                return {
                    ...state,
                    people: state.people.concat({id:state.people.length+1, name:action.payload.value})
                }
            }
            else {
                return {
                    ...state,
                    people: state.people.concat({id:state.people.length+1, name:Math.random()})
                
                }
            }
           
            
            default:
                return state;    
    }

}

export default addReducer;