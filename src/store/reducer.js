import {SET_PER_PAGE,FETCH_DATA,SET_PROPS_TO_STATE, SET_ORDER_COLUMN,INIT,SET_SEARCH_TERM} from './actions/types';
import {fetchEntities} from "./actions/index";

const init = (state,action)=>{
    console.log("setting props to state");
    state = {...state, props : action.payload}
    const items = fetchEntities(state);
    return  items ? {...state,   entities: items} : state
}


 const  reducer = (state,action)=>{
    switch (action.type) {
        case INIT:
            return action.payload
        case SET_SEARCH_TERM:
            return {...state, search_term: action.payload}
            
        case SET_PROPS_TO_STATE:
            console.log("setting props to state");
            return {...state, props : action.payload}
        case SET_PER_PAGE:
            return {...state, per_page : action.payload}
        case SET_ORDER_COLUMN:
            return action.payload ? action.payload : state;
        case FETCH_DATA:
           return   !Array.isArray(action.payload)  ?  { ...state, entities:action.payload} : state
        default:
            console.log("Default reducer");
            return state
    }
}

export default reducer;